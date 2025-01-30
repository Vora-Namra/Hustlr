import { Button, Modal, PasswordInput, PinInput, rem, TextInput } from "@mantine/core"
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react"
import { changePass, sendOtp, verifyOtp } from "../Services/UserServices";
import { signupValidation } from "../Services/FormValidation";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { useInterval } from "@mantine/hooks";

export const ResetPassword=(props:any)=>{

    const [email,setEmail] = useState("");
    const [otpSent,setOtpSent] = useState(false);
    const [optSending,setOtpSending] = useState(false);
    const [ verified,setVerified] = useState(false);
    const [password,setPassword] = useState("");
    const [passErr,setPassErr] = useState("");
    const [resendLoader,setResendLoader] = useState(false);
    const [seconds,setSeconds] = useState(0);
    const interval = useInterval(() =>{
        if(seconds===0){
            setResendLoader(false);
            setSeconds(60);
            interval.stop();
        }else setSeconds((s) => s - 1)}, 1000);

    const handleSendOtp=()=>{
        setOtpSending(true);
        sendOtp(email).then((res)=>{
            setOtpSent(true);
            successNotification("OTP sent Successfully","Enter OTP to Reset.");
            console.log(res);
            setOtpSending(false);
            setResendLoader(true);
            interval.start();
        }).catch((err)=>{
            console.log(err);
            errorNotification("OTP Sending failed.",err.response.data.errorMessage);
        })
    }

    const handleverifyOtp = (otp: string) => {
        verifyOtp(email, otp)
            .then((res) => {
                console.log(res);
                successNotification("OTP Verified", "Enter New Password here.");
                setVerified(true);
            })
            .catch((err) => {
                console.log(err);
                const errorMessage = err.response?.data?.errorMessage || "Something went wrong!";
                errorNotification("OTP Verification Failed", errorMessage);
            });
    };
    

    const resendOtp=()=>{
            if(resendLoader)return;
            handleSendOtp();
    }

    const changeEmail=()=>{
        setOtpSent(false);
        setResendLoader(false);
        setSeconds(60);
        setVerified(false);
        interval.stop();

    }

    const handleResetPassword=()=>{
        changePass(email,password).then((res)=>{
            console.log(res);
            successNotification("Password Changed","Login With New Password");
            props.close();
        }).catch((err)=>{
            errorNotification("Password Reset Failed",err.message.data.errorMessage);
        })

    }

    return <Modal opened={props.opened} onClose={props.close} title="Reset Password">
        <div>
        <TextInput
        size="md"
        onChange={(e)=>setEmail(e.target.value)}
        name="email"
        value={email}
        withAsterisk
        leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
        label="Email"
        placeholder="Your email"
        rightSection={
              <Button autoContrast loading={optSending && !otpSent} size="xs" className="mr-1" disabled={email==="" || otpSent} onClick={handleSendOtp} variant="filled">
                Reset
              </Button>}
        rightSectionWidth="xl"
        />
        {otpSent && <PinInput onComplete={handleverifyOtp} length={6} className="mx-auto" size="md" gap="lg"  type="number"/>}
        {otpSent && !verified && <div className="flex gap-2">
            <Button fullWidth loading={optSending} color="brightSun.4" autoContrast  className="mr-1"  onClick={resendOtp} variant="light">
                {resendLoader?seconds:"Resend"}
            </Button>
            <Button fullWidth  className="mr-1" autoContrast onClick={changeEmail} variant="filled">
                Change Email
            </Button>
        </div>
            }
            {
                verified && <PasswordInput
                value={password}
                error={passErr}
                name="password"
                onChange={(e)=>{setPassword(e.target.value); setPassErr(signupValidation("password",e.target.value))}}
                withAsterisk
                leftSection={<IconLock size={18} stroke={1.5} />}
                label="Password"
                placeholder="Password"
              />
            }
            {/* Change this button text */}
            {
            verified && <Button fullWidth className="mr-1" autoContrast onClick={handleResetPassword} variant="filled">
                Reset Password  // Was "Change Email"
            </Button>
            }
        </div>

    </Modal>
}