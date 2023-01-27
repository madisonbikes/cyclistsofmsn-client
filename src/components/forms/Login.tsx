import { Button, Grid } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "../../api/contract";
import { login } from "../../api/session";
import { useAuth } from "../../common";
import { FormTextField } from "../input/FormTextField";

type LoginFormData = LoginRequest;

const defaultValues: LoginFormData = { username: "", password: "" };

export const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
    reset,
  } = useForm({
    defaultValues,
  });

  const {
    isSuccess: loginSuccess,
    isLoading,
    data: loginData,
    mutate: loginMutate,
  } = useMutation((credentials: LoginFormData) => {
    reset(credentials);
    return login(credentials);
  });

  useEffect(() => {
    if (loginSuccess && loginData.authenticated) {
      console.log("set auth");
      auth.setState(loginData);
      navigate("/");
    }
  }, [loginSuccess, loginData, auth, navigate]);

  if (isLoading) {
    return <div>Logging in...</div>;
  }

  return (
    <main>
      <h2>Login</h2>
      {loginData?.failureString ? (
        <div className="loginError">{loginData?.failureString}</div>
      ) : null}
      <form
        onKeyDown={async (e) => {
          if (e.code === "Enter") {
            await handleSubmit((data) => loginMutate(data))();
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
              onClick={handleSubmit((data) => loginMutate(data))}
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
