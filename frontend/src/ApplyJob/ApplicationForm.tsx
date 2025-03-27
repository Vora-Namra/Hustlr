import { Button, FileInput, LoadingOverlay, NumberInput, Textarea, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBase64 } from "../Services/Utilities";
import { applyJob } from "../Services/JobService";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { useSelector } from "react-redux";
import { scanResumeGemini } from "../Services/ScanResumeGemini";

const ApplicationForm = () => {
  const { id } = useParams();
  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [atsResult, setAtsResult] = useState<any>(null);
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
      resume: null,
      coverLetter: "",
    },
    validate: {
      name: isNotEmpty("Name is Required"),
      email: isNotEmpty("Email is Required"),
      phone: isNotEmpty("Phone is Required"),
      website: isNotEmpty("Website is Required"),
      resume: isNotEmpty("Resume is Required"),
    },
  });

  const handlePreview = () => {
    form.validate();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!form.isValid()) return;
    setPreview(!preview);
  };

  const handleSubmit = async () => {
    try {
      setSubmit(true);
      const resumeData: any = await getBase64(form.getValues().resume);
      const applicant = {
        ...form.getValues(),
        applicantId: user.id,
        resume: resumeData.split(",")[1],
      };
      await applyJob(id, applicant);
      successNotification("Success", "Application Submitted Successfully");
      navigate("/job-history");
    } catch (err: any) {
      errorNotification("Failed", err.response?.data?.errorMessage || "Application submission failed");
    } finally {
      setSubmit(false);
    }
  };

  // This function calls the Gemini API from the frontend
  const handleScanATS = async () => {
    try {
      setScanning(true);
      // Convert resume to base64 text; you might want a better text extraction in a real scenario
      const resumeData: any = await getBase64(form.getValues().resume);
      // For demonstration, extract a portion of the resume base64 string as a proxy for text
      const resumeText = "Extracted resume content: " + resumeData.split(",")[1].substring(0, 200);
      
      // For this demo, we use static job details.
      // In a real app, you could retrieve the job's description, title, and about info from your state or a service.
      const jobTitle = "Software Developer";
      const jobDescription = "Develop and maintain web applications.";
      const aboutCompany = "Innovative Tech Company";

      const atsData = await scanResumeGemini(resumeText, jobTitle, jobDescription, aboutCompany);
      setAtsResult(atsData);
    } catch (error) {
      errorNotification("Error", "Failed to scan resume for ATS analysis.");
      console.error(error);
    } finally {
      setScanning(false);
    }
  };

  return (
    <>
      <LoadingOverlay
        className="!fixed"
        visible={submit || scanning}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <div className="text-xl font-semibold mb-5">Submit Your Application</div>
      <div className="flex flex-col gap-5">
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
            placeholder="Enter Url"
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
          label="Attach your CV"
          placeholder="Your CV"
          leftSectionPointerEvents="none"
        />
        <Textarea
          {...form.getInputProps("coverLetter")}
          readOnly={preview}
          variant={preview ? "unstyled" : "default"}
          className={preview ? "text-mine-shaft-300 font-semibold" : ""}
          withAsterisk
          placeholder="Type something about yourself..."
          label="Cover Letter"
          autosize
          minRows={4}
        />
        {/* Existing Preview and Submit Buttons */}
        {!preview && (
          <Button onClick={handlePreview} color="brightSun.4" variant="light">
            Preview
          </Button>
        )}
        {preview && (
          <div className="flex gap-10 [&>*]:w-1/2">
            <Button fullWidth onClick={handlePreview} color="brightSun.4" variant="outline">
              Edit
            </Button>
            <Button fullWidth onClick={handleSubmit} color="brightSun.4" variant="light">
              Submit
            </Button>
          </div>
        )}
        {/* New Scan ATS Button */}
        <Button onClick={handleScanATS} color="brightSun.4" variant="light">
          {scanning ? "Scanning ATS..." : "Scan ATS"}
        </Button>
        {/* Display ATS result if available */}
        {atsResult && (
          <div className="mt-4 p-4 border rounded bg-gray-50">
            <p>
              <strong>ATS Score:</strong> {atsResult.score}
            </p>
            <p>
              <strong>Keyword Match:</strong> {atsResult.keywordMatch}
            </p>
            <p>
              <strong>Format Score:</strong> {atsResult.formatScore}
            </p>
            <p>
              <strong>Missing Keywords:</strong>{" "}
              {Array.isArray(atsResult.missingKeywords) ? atsResult.missingKeywords.join(", ") : atsResult.missingKeywords}
            </p>
            <p>
              <strong>Improvement Suggestions:</strong>{" "}
              {Array.isArray(atsResult.improvementSuggestions)
                ? atsResult.improvementSuggestions.join(", ")
                : atsResult.improvementSuggestions}
            </p>
            <p>
              <strong>Strong Points:</strong>{" "}
              {Array.isArray(atsResult.strongPoints) ? atsResult.strongPoints.join(", ") : atsResult.strongPoints}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ApplicationForm;