import {
  Button,
  FileInput,
  LoadingOverlay,
  NumberInput,
  Textarea,
  TextInput,
  Alert,
  Progress
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip, IconAlertCircle } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBase64 } from "../Services/Utilities";
import { applyJob } from "../Services/JobService";
import {
  errorNotification,
  successNotification
} from "../Services/NotificationService";
import { useSelector } from "react-redux";
import { scanResumeGemini } from "../Services/ScanResumeGemini";
import * as pdfjsLib from 'pdfjs-dist';

// Set PDF.js worker path
pdfjsLib.GlobalWorkerOptions.workerSrc = 
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.worker.min.js';

const ApplicationForm = () => {
  const { id } = useParams();
  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [parsingProgress, setParsingProgress] = useState(0);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [improvementTips, setImprovementTips] = useState<string[]>([]);
  const [missingKeywords, setMissingKeywords] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      resume: null as File | null,
      coverLetter: ""
    },
    validate: {
      name: isNotEmpty("Name is Required"),
      email: (value) => (
        !value ? "Email is Required" : 
        !/^\S+@\S+$/.test(value) ? "Invalid email" : null
      ),
      phone: (value) => (
        !value ? "Phone is Required" :
        !/^\d{10}$/.test(value) ? "Invalid phone number (10 digits required)" : null
      ),
      website: (value) => (
        !value ? "Website is Required" :
        !/^https?:\/\/.+\..+/.test(value) ? "Invalid website URL" : null
      ),
      resume: (value) => {
        if (!value) return "Resume is Required";
        if (value.size > 5 * 1024 * 1024) return "File size must be less than 5MB";
        if (value.type !== "application/pdf") return "Only PDF files are allowed";
        return null;
      }
    }
  });

  const extractTextFromPDF = async (pdfBytes: Uint8Array) => {
    try {
      setParsingProgress(20);
      
      const pdf = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        setParsingProgress(20 + (i / pdf.numPages) * 60);
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map(item => item.str).join(' ');
      }
      
      setParsingProgress(90);
      return fullText;
    } catch (err) {
      console.error("PDF Parsing Error:", err);
      throw new Error("Failed to extract text from PDF. The file may be image-based or corrupted.");
    }
  };

  const handlePreview = () => {
    form.validate();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!form.isValid()) return;
    setPreview(true);
  };

  const handleSubmit = async () => {
    try {
      setSubmit(true);
      const resumeData: any = await getBase64(form.values.resume);
      const applicant = {
        ...form.values,
        applicantId: user.id,
        resume: resumeData.split(",")[1]
      };
      await applyJob(id!, applicant);
      successNotification("Success", "Application Submitted Successfully");
      navigate("/job-history");
    } catch (err: any) {
      console.error("Submission Error:", err);
      errorNotification(
        "Failed",
        err.response?.data?.errorMessage || "Application submission failed. Please try again."
      );
    } finally {
      setSubmit(false);
    }
  };

  const handleScanATS = async () => {
    try {
      setError(null);
      setScanning(true);
      setParsingProgress(0);
      setAtsScore(null);
      setImprovementTips([]);
      setMissingKeywords([]);
      
      const file = form.values.resume;
      if (!file) throw new Error("No resume uploaded");
      
      const arrayBuffer = await file.arrayBuffer();
      const pdfBytes = new Uint8Array(arrayBuffer);
      
      const resumeText = await extractTextFromPDF(pdfBytes);
      
      if (!resumeText || resumeText.trim().length < 50) {
        throw new Error("The resume appears to be empty or too short after parsing. Try a different PDF file.");
      }

      const jobTitle = form.values.coverLetter || "N/A";
      const jobDescription = "This is a placeholder job description.";
      const aboutCompany = "This is a placeholder company description.";

      const atsData = await scanResumeGemini(
        resumeText,
        jobTitle,
        jobDescription,
        aboutCompany
      );

      setAtsScore(atsData.score || 0);
      setImprovementTips(atsData.improvementSuggestions || []);
      setMissingKeywords(atsData.missingKeywords || []);
    } catch (e: any) {
      console.error("ATS Scan Error:", e);
      setError(e.message || "ATS scan failed. Please try again.");
      errorNotification("ATS Scan Error", e.message || "Failed to analyze resume.");
    } finally {
      setScanning(false);
      setParsingProgress(0);
    }
  };

  // Block navigation when form has unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (form.isDirty()) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [form]);

  return (
    <>
      <LoadingOverlay
        className="!fixed"
        visible={submit}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      />
      <div className="text-xl font-semibold mb-5">Submit Your Application</div>
      <div className="flex flex-col gap-5">
        {error && (
          <Alert 
            variant="light" 
            color="red" 
            title="Error" 
            icon={<IconAlertCircle />}
            withCloseButton
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        <div className="flex gap-10 [&>*]:w-1/2">
          <TextInput
            {...form.getInputProps("name")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={preview ? "text-mine-shaft-300 font-semibold" : ""}
            label="Full Name"
            placeholder="Enter Name"
            withAsterisk
          />
          <TextInput
            {...form.getInputProps("email")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={preview ? "text-mine-shaft-300 font-semibold" : ""}
            label="Email"
            placeholder="Enter Email"
            withAsterisk
          />
        </div>

        <div className="flex gap-10 [&>*]:w-1/2">
          <NumberInput
            {...form.getInputProps("phone")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={preview ? "text-mine-shaft-300 font-semibold" : ""}
            label="Phone Number"
            placeholder="Enter Phone Number"
            withAsterisk
            hideControls
            min={0}
            max={9999999999}
            clampBehavior="strict"
          />
          <TextInput
            {...form.getInputProps("website")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={preview ? "text-mine-shaft-300 font-semibold" : ""}
            label="Personal Website"
            placeholder="Enter URL (e.g., https://yourwebsite.com)"
            withAsterisk
          />
        </div>

        <FileInput
          accept="application/pdf"
          {...form.getInputProps("resume")}
          readOnly={preview}
          variant={preview ? "unstyled" : "default"}
          className={preview ? "text-mine-shaft-300 font-semibold" : ""}
          withAsterisk
          leftSection={<IconPaperclip stroke={1.5} />}
          label="Attach your CV (PDF, max 5MB)"
          placeholder="Your CV"
          leftSectionPointerEvents="none"
        />

        <Textarea
          {...form.getInputProps("coverLetter")}
          readOnly={preview}
          variant={preview ? "unstyled" : "default"}
          className={preview ? "text-mine-shaft-300 font-semibold" : ""}
          withAsterisk
          placeholder="Write a brief cover letter explaining why you're a good fit..."
          label="Cover Letter"
          autosize
          minRows={4}
        />

        {scanning && (
          <Progress 
            value={parsingProgress} 
            striped 
            animated 
            size="lg" 
            label={`${Math.round(parsingProgress)}%`}
          />
        )}

        {!preview ? (
          <Button 
            onClick={handlePreview} 
            color="brightSun.4" 
            variant="light"
            disabled={!form.isValid()}
          >
            Preview
          </Button>
        ) : (
          <div className="flex gap-4 flex-wrap">
            <Button
              onClick={() => setPreview(false)}
              color="brightSun.4"
              variant="outline"
              className="flex-1 min-w-[200px]"
            >
              Edit Application
            </Button>
            <Button
              onClick={handleSubmit}
              color="brightSun.4"
              variant="light"
              className="flex-1 min-w-[200px]"
              loading={submit}
            >
              Submit Application
            </Button>
            <Button
              onClick={handleScanATS}
              color="cyan"
              variant="light"
              loading={scanning}
              disabled={!form.values.resume}
              className="flex-1 min-w-[200px]"
            >
              {atsScore !== null ? 'Rescan ATS Score' : 'Get ATS Score'}
            </Button>
          </div>
        )}

        {atsScore !== null && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">
                ATS Score: <span className={atsScore > 70 ? "text-green-600" : atsScore > 50 ? "text-yellow-600" : "text-red-600"}>
                  {atsScore}/100
                </span>
              </h4>
              {atsScore > 70 ? (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Strong Match
                </span>
              ) : atsScore > 50 ? (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  Moderate Match
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                  Needs Improvement
                </span>
              )}
            </div>

            {missingKeywords.length > 0 && (
              <div className="mb-4">
                <h5 className="font-medium mb-2">Missing Keywords:</h5>
                <div className="flex flex-wrap gap-2">
                  {missingKeywords.map((keyword, idx) => (
                    <span key={idx} className="bg-gray-200 px-2 py-1 rounded text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {improvementTips.length > 0 && (
              <div>
                <h5 className="font-medium mb-2">Improvement Suggestions:</h5>
                <ul className="list-disc ml-5 space-y-2">
                  {improvementTips.map((tip, idx) => (
                    <li key={idx} className="text-sm">{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ApplicationForm;