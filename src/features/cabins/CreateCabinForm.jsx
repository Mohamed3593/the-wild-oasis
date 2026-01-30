import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
function CreateCabinForm({ cabinToEdit = {}, onCloseButton }) {
  const { id: cabinId, ...editValues } = cabinToEdit;
  // we will use that to make sure that we use the edit or create
  const isEditSesstion = Boolean(cabinId);
  // the register is to add onBlur and onChange to the input feild
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSesstion ? editValues : {},
  });

  // for creation
  const { createCabin, isCreating } = useCreateCabin();

  // for editing
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  // the data is come from the register that we add in the input fields
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSesstion)
      editCabin(
        { newCabinData: { ...data, image }, id: cabinId },
        { onSuccess: () => { reset(); onCloseButton?.()  } }
      );
    else createCabin(
      { ...data, image: image },
      {
        onSuccess: () => {
          reset();
          onCloseButton?.();
        },
      }
    );
  }
  function onError(errors) {
    console.log(errors);
  }
  // طلعنا الايروير علشان نعرض ال compenent الى اسمه Error والخطا يبنان للمستخدم
  const { errors } = formState;
  console.log(errors);
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseButton?"modal":"regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "this field is required",
            min: { value: 1, message: "Capcity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
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

      <FormRow label="description" error={errors?.description?.message}>
        <Textarea
          type="text"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          disabled={isWorking}
          accept="image/*"
          {...register("image", {
            required: isEditSesstion ? false : "this field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseButton?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSesstion ? "edit cabin" : "create cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
