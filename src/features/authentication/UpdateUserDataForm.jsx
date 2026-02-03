import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import Spinner from "../../ui/Spinner";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user, isLoading } = useUser();
  const email = user.email;
  const currentFullName = user.user_metadata?.fullName ?? "";
  const { isUpdating, updateUser } = useUpdateUser();
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  if (isLoading) return <Spinner />;

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return
    updateUser({ fullName, avatar }, { onSuccess: () => { setAvatar(null); e.target.reset()}})
  }
  function handleClick() {
    setFullName(currentFullName)
    setAvatar(null)
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={true}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary" onClick={handleClick}>
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
