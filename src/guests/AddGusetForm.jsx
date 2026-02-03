import { useForm } from "react-hook-form";
// import styled from "styled-components";
// import { useState, useRef, useEffect } from "react";


import { useAddGuest } from "./useAddGuest";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Form from "../ui/Form";
import { useUpdateGuest } from "./useUpdateGuest";

const nationalities = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "United States",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "United Kingdom",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Myanmar",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominican Republic",
  "Netherlands",
  "East Timor",
  "Ecuador",
  "Egypt",
  "United Arab Emirates",
  "England",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Philippines",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Liberia",
  "Libya",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Mongolia",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saudi Arabia",
  "Scotland",
  "Senegal",
  "Serbia",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Somalia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Uganda",
  "Ukraine",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Wales",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

function AddGuestForm({ onCloseButton, guestToEdit = {} }) {

  const { addGuest, isLoading } = useAddGuest()
  const { editGuest, isLoading: isLoading2 } = useUpdateGuest()
  const { id: guestId, ...editValues } = guestToEdit
  const isEditSesstion = Boolean(guestId)
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isEditSesstion ? editValues : {},
  });
  const { errors } = formState;
  const isWorking = isLoading || isLoading2
 

  function onSubmit(data) {
    console.log("guestId:", guestId);
    console.log("guestToEdit:", guestToEdit);
    console.log(data)
    if (isEditSesstion) {
      const updateData = { id: guestId, ...data }; // ✅ هنا بتضيف الـ id
      console.log("Sending to editGuest:", updateData);

      editGuest(updateData, {
        onSuccess: () => {
          reset();
          onCloseButton?.();
        },
      });
    } else {
      addGuest(data, {
        onSuccess: () => {
          onCloseButton?.();
          reset();
        },
      });
    }
  }
  return (
    <>
      <datalist id="nationalityList">
        {nationalities.map((e, index) => (
          <option key={index} value={e} />
        ))}
      </datalist>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Full name" error={errors?.fullName?.message}>
          <Input
            disabled={isWorking}
            type="text"
            id="fullName"
            {...register("fullName", { required: "this feild is required" })}
          />
        </FormRow>

        <FormRow label="Email address" error={errors?.email?.message}>
          <Input
            disabled={isWorking}
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

        <FormRow label="nationalID" error={errors?.nationalID?.message}>
          <Input
            disabled={isWorking}
            type="text"
            id="nationalID"
            {...register("nationalID", {
              required: "this feild is required",
              minLength: {
                value: 8,
                message: "the nationalID should be at least 8 character",
              },
            })}
          />
        </FormRow>

        <FormRow label="Nationality" error={errors?.nationality?.message}>
          <Input
            disabled={isWorking}
            type="text"
            id="nationality"
            list="nationalityList"
            {...register("nationality", {
              required: "this feild is required",
              validate: (value) => {
                if (!nationalities.includes(value)) {
                  return "Please select a nationality from the list";
                }
                return true;
              },
            })}
          />
        </FormRow>

        <datalist id="nationalityList">
          {nationalities.map((e, index) => (
            <option key={index} value={e} />
          ))}
        </datalist>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button
            disabled={isWorking}
            variation="secondary"
            type="reset"
            onClick={onCloseButton}
          >
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isEditSesstion ? "edit the Guest" : "Create new user"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default AddGuestForm;
