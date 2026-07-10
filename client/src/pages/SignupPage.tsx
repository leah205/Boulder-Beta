import { useState } from "react";
import Form from "../components/form/Form";
import Button from "@/components/Button";
import InputField from "../components/form/InputField";
import { useSignup } from "../features/authentication/useSignup";
import { Link } from "react-router-dom";
import Spinner from "@/components/spinner/Spinner";
import FormField from "@/components/form/FormField";
import ErrorWrapper from "@/components/error/ErrorWrapper";
export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const { signup, isPending, errors } = useSignup();

  function handleSubmit() {
    signup({ username, password, confirm_password });
  }
  return (
    <>
      {isPending && <Spinner></Spinner>}
      <Form>
        <ul>
          {errors &&
            errors.map((error) => {
              return <ErrorWrapper key={error}>{error}</ErrorWrapper>;
            })}
        </ul>
        <FormField name="username" label="Username">
          <InputField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            type="text"
          ></InputField>
        </FormField>
        <FormField name="password" label="Password">
          <InputField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="text"
          ></InputField>
        </FormField>
        <FormField name="password_confirm" label="Confirm Password">
          <InputField
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="password_confirm"
            type="text"
          ></InputField>
        </FormField>
        <Button type="submit" className="auth_btn" onClick={handleSubmit}>
          Sign up
        </Button>
        <Link className="block" to="/signin">
          Already have an account? <b>Sign in</b>
        </Link>
      </Form>
    </>
  );
}
