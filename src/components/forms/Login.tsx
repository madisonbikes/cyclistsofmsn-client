import { Button, Grid } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { login, LoginRequest, LoginResponse } from "../../api/login";
import { useAuth } from "../../common";
import { FormTextField } from "../input/FormTextField";

type LoginFormData = LoginRequest;

const defaultValues: LoginFormData = { username: "", password: "" };

export const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const loginMutation = useMutation<LoginResponse, Error, LoginFormData>(login);
  const { isSuccess: loginSuccess, data } = loginMutation;

  const form = useForm<LoginFormData>({
    defaultValues,
  });
  const { formState, handleSubmit, control } = form;
  const { isSubmitting } = formState;

  useEffect(() => {
    if (loginSuccess && data.authenticated) {
      console.log("set auth");
      auth.setState(data);
      navigate("/");
    }
  }, [loginSuccess, data, auth, navigate]);

  const onSubmit = (formData: LoginFormData) => {
    loginMutation.mutate(formData);
    form.reset(formData);
  };

  if (loginMutation.isLoading) {
    return <div>Logging in...</div>;
  }

  if (loginMutation.isError) {
    return <div>Error: {loginMutation.error.message}</div>;
  }

  return (
    <main>
      <h2>Login</h2>
      {data?.failureString ? (
        <div className="loginError">{data?.failureString}</div>
      ) : null}
      <form
        onKeyDown={async (e) => {
          if (e.code === "Enter") {
            await handleSubmit(onSubmit)();
          }
        }}
      >
        <Grid
          direction="column"
          container
          rowSpacing={2}
          alignItems="flex-start"
        >
          <Grid item>
            <FormTextField
              name="username"
              label="Username"
              required
              control={control}
            />
          </Grid>
          <Grid item>
            <FormTextField
              control={control}
              name="password"
              label="Password"
              required
              type="password"
            />
          </Grid>
          <Grid item>
            <Button
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              variant="contained"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </main>
  );
};
