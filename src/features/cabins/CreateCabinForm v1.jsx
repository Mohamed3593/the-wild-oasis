import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { addNewCabin } from "../../services/aspi Cabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`

function CreateCabinForm() {
  // the register is to add onBlur and onChange to the input feild
  const { register, handleSubmit, reset,getValues,formState } = useForm();
  // to make the invlidate of the clint (data) علشان الداتا تحدث نفسها من غير ما ترستر الصفحة 
  const queryClient = useQueryClient();
  const { mutate, isLoading:isCreating } = useMutation({
    mutationFn: addNewCabin,
    onSuccess: () => {
      toast.success("you add new cabin");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      reset()
    }, onError:()=>toast.error("there is an error with adding cabin")
  });

  // the data is come from the register that we add in the input fields
  function onSubmit(data) {
    mutate({...data,image:data.image[0]} );
    console.log(data)
  }
  function onError(errors) {
    console.log(errors);
  }
  // طلعنا الايروير علشان نعرض ال compenent الى اسمه Error والخطا يبنان للمستخدم
  const { errors } = formState
  console.log(errors)
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow lable="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow lable="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "this field is required",
            min: { value: 1, message: "Capcity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow lable="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow lable="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "this field is required",
            // that the value of the discount input must be greater or than the value of regular price input
            // or we pass error with this message
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              "discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow lable="description" error={errors?.description?.message}>
        <Textarea
          type="text"
          id="description"
          disabled={isCreating}
          defaultValue=""
          {...register("description", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow lable="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          disabled={isCreating}
          accept="image/*"
          {...register("image", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
