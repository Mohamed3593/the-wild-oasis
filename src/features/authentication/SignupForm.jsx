import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignin } from "./useSignin";

// Email regex: /\S+@\S+\.\S+/
function SignupForm() {
  const { signin, isLoading } = useSignin();
  const { register, handleSubmit, getValues, formState,reset } = useForm();
  const { errors } = formState;
  function onSubmit({ fullName, email, password }) {
    signin({ fullName, email, password } ,{onSettled:()=>reset()});
    console.log({ fullName, email, password });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          disabled={isLoading}
          type="text"
          id="fullName"
          {...register("fullName", { required: "this feild is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          disabled={isLoading}
          type="email"
          id="email"
          {...register("email", {
            required: "this feild is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "provide a vialde email",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          disabled={isLoading}
          type="password"
          id="password"
          {...register("password", {
            required: "this feild is required",
            minLength: {
              value: 8,
              message: "the password should be at least 8 character",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          disabled={isLoading}
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "this feild is required",
            validate: (value) =>
              value === getValues().password || "password not match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isLoading} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
