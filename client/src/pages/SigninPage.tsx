import Button from "../components/Button";
import Form from "../components/Form";
import InputField from "../components/InputField";
import { useState } from "react";
import ValidationError from "../components/ValidationError";
import useAuth from "../features/authentication/useAuth";
import { useSignin } from "../features/authentication/useSignin";
import { Link } from "react-router-dom";
import Spinner from "@/components/Spinner";

export default function SigninPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signin } = useAuth();

  const { login, isPending, errors } = useSignin(signin);

  function handleSubmit() {
    login({ username, password });
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
        <Button type="submit" className="auth_btn" onClick={handleSubmit}>
          Sign In
        </Button>
        <Link className="block" to="/signup">
          Don't have an account? <b>Sign up</b>
        </Link>
      </Form>
    </>
  );
}
