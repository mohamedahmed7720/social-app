import {
  Alert,
  Button,
  CloseButton,
  FieldError,
  InputGroup,
  Spinner,
  TextField,
} from "@heroui/react";
import { FaAt, FaKey } from "react-icons/fa";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginSchemaType,
} from "../../lib/schema/auth.schema";
import { loginUser } from "../../services/auth.Services";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

export default function Login() {
  const { setToken } = useContext(AuthContext)!;
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: LoginSchemaType) {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const response = await loginUser(formData);
      setSuccessMsg(response.data.message);
      toast.success("Account created successfully");
      localStorage.setItem("Usertoken", response.data.data.token);
      setToken(response.data.data.token);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error: any) {
      setErrorMsg(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }

  localStorage.getItem("Usertoken");

  return (
    <>
      <main>
        <div className="p-4 sm:p-6 bg-white rounded-2xl">
          <div className="mb-5 grid grid-cols-2 gap-2 text-center rounded-xl bg-slate-100 p-1">
            <NavLink
              to={"/auth/login"}
              className="rounded-lg py-2 text-sm font-extrabold transition active text-slate-600 hover:text-slate-800"
            >
              Login
            </NavLink>
            <NavLink
              to={"/auth/register"}
              className="rounded-lg py-2 text-sm font-extrabold transition text-slate-600 hover:text-slate-800"
            >
              Register
            </NavLink>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            Log in to Route Posts
          </h2>
          <p className="text-slate-500 mt-1 text-sm">
            Log in and continue your social journey.
          </p>
          <form className="space-y-3 mt-5" onSubmit={handleSubmit(onSubmit)}>
            <TextField fullWidth name="email" isInvalid={Boolean(errors.email)}>
              <InputGroup
                fullWidth
                className="border border-slate-200 bg-slate-50 p-1 shadow-none"
              >
                <InputGroup.Prefix>
                  <FaAt className="size-4 text-slate-400" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  {...register("email")}
                  placeholder="Email or username"
                />
              </InputGroup>
              <FieldError>{errors.email?.message}</FieldError>
            </TextField>

            <TextField
              fullWidth
              name="password"
              isInvalid={Boolean(errors.password)}
            >
              <InputGroup
                fullWidth
                className="border border-slate-200 bg-slate-50 p-1 shadow-none"
              >
                <InputGroup.Prefix>
                  <FaKey className="size-4 text-slate-400" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  type="password"
                  {...register("password")}
                  placeholder="password"
                />
              </InputGroup>
              <FieldError>{errors.password?.message}</FieldError>
            </TextField>

            <div className="w=full mb-3">
              <Button
                type="submit"
                className="w-full rounded-lg py-6 font-bold transition disabled:opacity-60 bg-main hover:bg-[#001f6b]"
              >
                {isSubmitting ? (
                  <span className="flex gap-1.5 justify-center items-center">
                    <Spinner className="text-white" />
                    Please wait...
                  </span>
                ) : (
                  "Log In"
                )}
              </Button>
            </div>

            {successMsg && (
              <Alert
                className="text-green-500 bg-green-100 shadow-none"
                status="success"
              >
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>{successMsg}</Alert.Title>
                </Alert.Content>
                <CloseButton className="bg-transparent text-black" />
              </Alert>
            )}

            {errorMsg && (
              <Alert
                className="text-red-500 bg-red-100 shadow-none"
                status="danger"
              >
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>{errorMsg}</Alert.Title>
                </Alert.Content>
                <CloseButton className="bg-transparent text-black" />
              </Alert>
            )}
          </form>
        </div>
      </main>
    </>
  );
}
