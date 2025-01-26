import { Anchor, Button, Checkbox, Group, PasswordInput, Radio, rem, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../Services/UserServices";
import { signupValidation } from "../Services/FormValidation"; // Import validation function

const form = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  accountType: "APPLICANT",
};

export const SignUp = () => {
  const [formError, setFormError] = useState<{ [key: string]: string }>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [data, setData] = useState(form);

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setData({ ...data, [name]: value });

    // Validate input fields
    if (name === "confirmPassword") {
      setFormError({
        ...formError,
        confirmPassword: value !== data.password ? "Passwords do not match." : "",
      });
    } else {
      setFormError({ ...formError, [name]: signupValidation(name, value) });
    }
  };
  const handleSubmit = () => {
    let isValid = true;
  
    // Define newFormError with explicit key types
    const newFormError: { [key in keyof typeof data]: string } = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      accountType: "",
    };
  
    // Validate all fields
    (Object.keys(data) as Array<keyof typeof data>).forEach((key) => {
      if (key === "accountType") return;
  
      if (key === "confirmPassword") {
        newFormError[key] = data[key] !== data.password ? "Passwords do not match." : "";
      } else {
        newFormError[key] = signupValidation(key, data[key]);
      }
  
      if (newFormError[key]) isValid = false;
    });
  
    setFormError(newFormError);
  
    // If the form is valid, proceed to register user
    if (isValid) {
      registerUser(data)
        .then((res) => {
          console.log("User registered successfully:", res);
        })
        .catch((err) => {
          console.error("Error registering user:", err);
        });
    }
  };
  
  return (
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className="text-2xl font-semibold">Create Account</div>
      <TextInput
        name="name"
        value={data.name}
        error={formError.name}
        onChange={handleChange}
        withAsterisk
        label="Full Name"
        placeholder="Your name"
      />
      <TextInput
        name="email"
        value={data.email}
        error={formError.email}
        onChange={handleChange}
        withAsterisk
        leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
        label="Email"
        placeholder="Your email"
      />
      <PasswordInput
        name="password"
        value={data.password}
        error={formError.password}
        onChange={handleChange}
        withAsterisk
        leftSection={<IconLock size={18} stroke={1.5} />}
        label="Password"
        placeholder="Password"
      />
      <PasswordInput
        name="confirmPassword"
        value={data.confirmPassword}
        error={formError.confirmPassword}
        onChange={handleChange}
        withAsterisk
        leftSection={<IconLock size={18} stroke={1.5} />}
        label="Confirm Password"
        placeholder="Confirm Password"
      />
      <Radio.Group
        value={data.accountType}
        onChange={(value) => setData({ ...data, accountType: value })}
        label="You Are?"
        description="This is anonymous"
        withAsterisk
      >
        <Group mt="xs">
          <Radio
            className="py-4 px-6 border has-[:checked]:border-bright-sun-400 hover:bg-mine-shaft-900 border-mine-shaft-800 rounded-lg"
            value="APPLICANT"
            label="APPLICANT"
          />
          <Radio
            className="py-4 px-6 border has-[:checked]:border-bright-sun-400 hover:bg-mine-shaft-900 border-mine-shaft-800 rounded-lg"
            value="EMPLOYER"
            label="EMPLOYER"
          />
        </Group>
      </Radio.Group>
      <Checkbox
        autoContrast
        label={
          <>
            I agree <Anchor>terms & conditions</Anchor>
          </>
        }
      />
      <Button onClick={handleSubmit} variant="filled">
        Sign Up
      </Button>
      <div className="mx-auto">
        Have an account already?{" "}
        <Link to="/login" className="text-bright-sun-400 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
};
