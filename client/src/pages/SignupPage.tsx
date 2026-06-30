import { useState } from "react";
import Form from "../components/Form";
import Button from "../components/Button";
import InputField from "../components/InputField";
import ValidationError from "../components/ValidationError";
import { useSignup } from "../features/authentication/useSignup";
import { Link } from "react-router-dom";
import Spinner from "@/components/Spinner";

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
              return <ValidationError key={error}>{error}</ValidationError>;
            })}
        </ul>
        <InputField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          type="text"
          label="Username"
        ></InputField>
        <InputField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="text"
          label="Password"
        ></InputField>
        <InputField
          value={confirm_password}
          onChange={(e) => setConfirmPassword(e.target.value)}
          name="password_confirm"
          type="text"
          label="Confirm Password"
        ></InputField>
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
