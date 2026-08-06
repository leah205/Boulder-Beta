import Button from "../components/Button";
import Form from "../components/form/Form";
import InputField from "../components/form/InputField";
import { useState } from "react";
import useAuth from "../features/authentication/useAuth";
import { useSignin } from "../features/authentication/useSignin";
import { Link } from "react-router-dom";
import Spinner from "@/components/spinner/Spinner";
import FormField from "@/components/form/FormField";
import ErrorWrapper from "@/components/error/ErrorWrapper";

export default function SigninPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signin } = useAuth();

  const { login, isPending, errors } = useSignin(signin);

  function handleSubmit() {
    login({ username, password });
  }

  function handleSubmitGuest() {
    login({ username: "guest", password: "password" });
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
        <div className="flex gap-3 mb-3">
          <Button type="submit" className="auth_btn" onClick={handleSubmit}>
            Sign In
          </Button>
          <Button
            type="submit"
            className="auth_btn"
            onClick={handleSubmitGuest}
          >
            Sign In as Guest
          </Button>
        </div>
        <Link className="block" to="/signup">
          Don't have an account?{" "}
          <button className="hover:bg-mist-100 p-3 rounded-xs">Sign up</button>
        </Link>
      </Form>
    </>
  );
}
