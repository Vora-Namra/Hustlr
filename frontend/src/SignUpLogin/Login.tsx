import { TextInput, rem, PasswordInput, Button, LoadingOverlay } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../Services/UserServices";
import { loginValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { ResetPassword } from "./ResetPassword";
import { useDispatch } from "react-redux";
import { setUser } from "../Slices/UserSlice";

const form = {
  email: "",
  password: "",
};

export const Login = () => {

  const [loading,setLoading]  =useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const navigate = useNavigate();
  const [opened,{open,close}] = useDisclosure(false);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormError({ ...formError, [name]: "" });
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);
    let isValid = true;

    // Define newFormError with explicit key types
    const newFormError: { [key in keyof typeof data]: string } = {
      email: "",
      password: "",
    };

    // Validate all fields
    (Object.keys(data) as Array<keyof typeof data>).forEach((key) => {
      newFormError[key] = loginValidation(key, data[key]);
      if (newFormError[key]) isValid = false;
    });

    setFormError(newFormError);

    if (isValid) {
      setLoading(true)
      loginUser(data)
        .then((res) => {
          console.log(res);
          notifications.show({
            title: "Login Successful!",
            message: "Redirecting to Home Page....🌟",
            withCloseButton: true,
            icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
            color: "teal",
            withBorder: true,
            className: "!border-green-500",
          });

          setTimeout(() => {
            setLoading(false);
            dispatch(setUser(res))
            navigate("/");
          }, 4000);
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
          notifications.show({
            title: "Login Failed",
            message: err.response?.data?.errorMessage || "Something went wrong!",
            withCloseButton: true,
            icon: <IconX style={{ width: "90%", height: "90%" }} />,
            color: "red",
            withBorder: true,
            className: "!border-red-500",
          });
        });
    }
  };

  return (
    <>
     <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'brightSun.4', type: 'bars' }}
        />
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className="text-2xl font-semibold">Login to Your Account</div>
      <TextInput
        onChange={handleChange}
        error={formError.email}
        name="email"
        value={data.email}
        withAsterisk
        leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
        label="Email"
        placeholder="Your email"
      />
      <PasswordInput
        value={data.password}
        error={formError.password}
        name="password"
        onChange={handleChange}
        withAsterisk
        leftSection={<IconLock size={18} stroke={1.5} />}
        label="Password"
        placeholder="Password"
      />
      <Button loading={loading} onClick={handleSubmit} variant="filled">
        Login
      </Button>
      <div className="mx-auto">
        Don&apos;t have an account?
        <span
          onClick={() => {
            navigate("/signup");
            setFormError(form);
            setData(form);
          }}
          className="text-bright-sun-400 cursor-pointer hover:underline"
        >
          Sign Up
        </span>
      </div>
      <div onClick={open} className="text-bright-sun-400 hover:underline cursor-pointer text-center">Forgot Password?</div>
    </div>
    <ResetPassword opened={opened} close={close}/>
    </>
  );
};
