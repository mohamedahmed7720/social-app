import {
  Alert,
  Button,
  CloseButton,
  FieldError,
  Input,
  InputGroup,
  ListBox,
  Spinner,
  TextField,
} from "@heroui/react";
import { FaAt, FaKey, FaRegUser } from "react-icons/fa";
import { Select } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterSchemaType,
} from "../../lib/schema/auth.schema";
import { registerUser } from "../../services/auth.Services";
import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router";

export default function Register() {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: "all",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
    },
  });

  async function submitData(formData: RegisterSchemaType) {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const response = await registerUser(formData);
      setSuccessMsg(response.data.message);
      toast.success("Account created successfully");
      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);
    } catch (error: any) {
      setErrorMsg(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <main>
        <div className="p-4 sm:p-6 bg-white rounded-2xl">
          <div className="mb-5 grid grid-cols-2 gap-2 text-center rounded-xl bg-slate-100 p-1">
            <NavLink
              to={"/auth/login"}
              className="rounded-lg py-2 text-sm font-extrabold transition text-slate-600 hover:text-slate-800"
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
            Create new account
          </h2>
          <p className="text-slate-500 mt-1 text-sm">It is quick and easy.</p>
          <form className="space-y-3 mt-5" onSubmit={handleSubmit(submitData)}>
            <TextField fullWidth name="name" isInvalid={Boolean(errors.name)}>
              <InputGroup
                fullWidth
                className="border border-slate-200 bg-slate-50 p-1 shadow-none"
              >
                <InputGroup.Prefix>
                  <FaRegUser className="size-4 text-slate-400" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  {...register("name")}
                  placeholder="Full name"
                />
              </InputGroup>
              <FieldError>{errors.name?.message}</FieldError>
            </TextField>

            <TextField
              fullWidth
              name="userName"
              isInvalid={Boolean(errors.username)}
            >
              <InputGroup
                fullWidth
                className="border border-slate-200 bg-slate-50 p-1 shadow-none"
              >
                <InputGroup.Prefix>
                  <FaAt className="size-4 text-slate-400" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  {...register("username")}
                  placeholder="username"
                />
              </InputGroup>
              <FieldError>{errors.username?.message}</FieldError>
            </TextField>

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
                  placeholder="Email Address"
                />
              </InputGroup>
              <FieldError>{errors.email?.message}</FieldError>
            </TextField>

            <TextField isInvalid={Boolean(errors.gender)}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <Select
                        value={field.value}
                        onChange={field.onChange}
                        fullWidth
                        placeholder="Select Gender"
                      >
                        <Select.Trigger className="border border-slate-200 bg-slate-50 p-3 shadow-none">
                          <FaRegUser className="size-4 text-slate-400 mr-3 ml-1" />
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="male" textValue="male">
                              Male
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="female" textValue="female">
                              Female
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </>
                  );
                }}
              />
              <FieldError>{errors.gender?.message}</FieldError>
            </TextField>

            <TextField isInvalid={Boolean(errors.dateOfBirth)}>
              <Input
                {...register("dateOfBirth")}
                aria-label="Name"
                className="w-full border border-slate-200 bg-slate-50 p-3 shadow-none"
                type="date"
              />
              <FieldError>{errors.dateOfBirth?.message}</FieldError>
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

            <TextField
              fullWidth
              name="confirmpassword"
              isInvalid={Boolean(errors.rePassword)}
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
                  {...register("rePassword")}
                  placeholder="confirm password"
                />
              </InputGroup>
              <FieldError>{errors.rePassword?.message}</FieldError>
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
                  "Create New Account"
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
