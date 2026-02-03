import { Controller, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import {Input,Select} from "../../ui/Input";
import { useAllBookings } from "./useAllBookings";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import useGuests from "../../guests/useGuests";
import { useCabins } from "../cabins/useCabins";
import { useSettings } from "../settings/useSettings";
import Textarea from "../../ui/Textarea";
import { add, format } from "date-fns";
import { useAddBooking } from "./useAddBooking";

function BookingForm({onCloseButton}) {
  const { register, handleSubmit, formState, reset, watch ,control} =
    useForm();
    const { addNewBooking, isLoading } = useAddBooking();
  const { Allbookings, isLoading: isLoading1 } = useAllBookings();
  const { guests, isLoading: isLoading2 } = useGuests();
  const { cabins, isLoading: isLoading3 } = useCabins();
  const { settings, isLoading: isLoading4 } = useSettings();
  if (isLoading1 || isLoading2 || isLoading3 || isLoading4) return <Spinner />;
  const guestNames = guests?.map((guest) => guest.fullName) || [];
  const cabinNames = cabins?.map((cabin) => cabin.name) || [];

  const selectedCabinName = watch("cabin"); // ← بيتعمل track تلقائي
  const selectedCabin =
    cabins.find((cabin) => cabin.name === selectedCabinName) || {};

  const { errors } = formState;

  function onSubmit(data) {
    const startDate = new Date(data.startDate);
    const endDate = add(startDate, { days: Number(data.numNights) });
    const guestId = guests.find((guest) => guest.fullName == data.guestName).id;
    const cabinId = selectedCabin.id;
    const cabinPrice = selectedCabin?.regularPrice * (data.numNights || 0);
    const extrasPrice =
      settings?.breakFastPrice * (data.numGuests || 0) * (data.numNights || 0);
    const totalPrice = extrasPrice + cabinPrice;
    // ✅ استخدم destructuring عشان تشيل الحاجات اللي مش عايزها
    const { cabin, guestName, ...restData } = data;
    const finalData = {
      ...restData,
      cabinPrice,
      extrasPrice,
      totalPrice,
      cabinId,
      guestId,
      endDate: format(endDate, "yyyy-MM-dd'T'HH:mm:ss"), // ✅ "2026-02-22T00:00:00"
      startDate: format(startDate, "yyyy-MM-dd'T'HH:mm:ss"),
    };
    console.log(finalData);
    addNewBooking(finalData, { onSuccess: () => { reset(); onCloseButton?.()} })

  }
  return (
    <>
      <datalist id="guestsList">
        {guestNames.map((e, index) => (
          <option key={index} value={e} />
        ))}
      </datalist>
      <datalist id="cabinsList">
        {cabinNames.map((e, index) => (
          <option key={index} value={e} />
        ))}
      </datalist>
      <Form onSubmit={handleSubmit(onSubmit)} type={onCloseButton ? "modal" : "regular"} >
        <FormRow label="guest name" error={errors?.guestName?.message}>
          <Input
            disabled={isLoading}
            type="search"
            id="guestName"
            list="guestsList"
            {...register("guestName", { required: "this feild is required" })}
          />
        </FormRow>
        <FormRow label="cabin" error={errors?.cabin?.message}>
          <Input
            disabled={isLoading}
            type="search"
            id="cabin"
            list="cabinsList"
            {...register("cabin", { required: "this feild is required" })}
          />
        </FormRow>

        <FormRow label="number of guests" error={errors?.numGuests?.message}>
          <Input
            disabled={isLoading}
            type="number"
            id="numGuests"
            {...register("numGuests", {
              required: "this feild is required",
              validate: (value) => {
                const selectedCabin = cabins.find(
                  (cabin) => cabin.name === selectedCabinName,
                );
                if (!selectedCabin) return "Please select a valid cabin";
                const numGuests = parseInt(value, 10);
                if (isNaN(numGuests)) return "Please enter a valid number";
                const maxCapacity =
                  Number(selectedCabin.maxCapacity) <
                  Number(settings.maxCapacity)
                    ? selectedCabin.maxCapacity
                    : settings.maxCapacity;
                console.log(Number(selectedCabin.maxCapacity));
                if (numGuests > maxCapacity) {
                  return `Max capacity is ${maxCapacity} guests`;
                }

                return true;
              },
              min: {
                value: 1,
                message: "you must chose at least 1 guests",
              },
            })}
          />
        </FormRow>

        <FormRow label="start date" error={errors?.startDate?.message}>
          <Input
            disabled={isLoading}
            type="date"
            id="startDate"
            {...register("startDate", { required: "this feild is required" })}
          />
        </FormRow>

        <FormRow label="number of days" error={errors?.numNights?.message}>
          <Input
            disabled={isLoading}
            type="number"
            id="numNights"
            {...register("numNights", {
              required: "this feild is required",
              validate: (value) => {
                if (
                  settings.minBookingLength > value ||
                  settings.maxBookingLength < value
                )
                  return `
                  number of days must me > ${settings.minBookingLength} and < ${settings.maxBookingLength}
                `;
              },
            })}
          />
        </FormRow>
        <FormRow label="has breakfast" error={errors?.hasBreakfast?.message}>
          <Controller
            name="hasBreakfast"
            control={control}
            defaultValue={isLoading}
            render={({ field }) => (
              <Checkbox
                id="hasBreakfast"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              >
                do you want break fast
              </Checkbox>
            )}
          />
        </FormRow>

        <FormRow label="Guest paied?" error={errors?.isPaid?.message}>
          <Controller
            name="isPaid"
            defaultValue={isLoading}
            control={control}
            render={({ field }) => (
              <Checkbox
                id="isPaid"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              >
                is Paided?
              </Checkbox>
            )}
          />
        </FormRow>
        <FormRow label="status" error={errors?.status?.message}>
          <Select
            id="status"
            {...register("status", { required: "this field is required" })}
          >
            <option value="">Select status</option>
            <option value="unconfirmed">Unconfirmed</option>
            <option value="checked-in">Checked in</option>
            {/* <option value="checked-out">Checked out</option> */}
          </Select>
        </FormRow>
        <FormRow label="observations" error={errors?.observations?.message}>
          <Textarea
            id="observations"
            disabled={isLoading}
            type="text"
            {...register("observations")}
          />
        </FormRow>
        <FormRow>
          {/* type is an HTML attribute! */}
          <Button disabled={isLoading} variation="secondary" type="reset" onClick={onCloseButton}>
            Cancel
          </Button>
          <Button disabled={isLoading}>Create new user</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default BookingForm;
