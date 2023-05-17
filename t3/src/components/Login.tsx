import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { useAuthedUser } from "~/utils/user-context";

interface Inputs {
  email: string;
}

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const { mutateAsync, isLoading } = api.user.login.useMutation();
  const { setUser } = useAuthedUser();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const user = await mutateAsync({ email: data.email });

      setUser(user);
    } catch (error) {
      console.log("Error while logging in", error);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">Enter your email</FormLabel>
        <Input
          id="email"
          placeholder="Email"
          {...register("email", {
            required: "The email is required",
          })}
        />
        <FormErrorMessage>
          {!!errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} isLoading={isLoading} type="submit">
        Login
      </Button>
    </Box>
  );
};

export default Login;
