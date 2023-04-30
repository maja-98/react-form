import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { parse } from "date-fns";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .transform((value) => value.trim())
    .required("Enter a Valid Name"),
  dateOfBirthorAge: yup
    .string()
    .test(
      "age_date_validation",
      "Enter Correct Age or Date of Birth",
      (value) => {
        if (isNaN(value)) {
          return (parseInt(value) >= 0) & (parseInt(value) <= 200);
        } else {
          const convertedDate = parse(value, "dd/MM/yyyy", new Date());
          const year = convertedDate.getFullYear();
          return (
            convertedDate.toLocaleString() !== "Invalid Date" && year > 1900
          );
        }
      }
    ),
  sex: yup.string().required("Select any Value"),
  mobile: yup
    .string()
    .test("mobile_validation", "Enter Valid Mobile number", (value) => {
      return (
        (value.toString().length >= 10 && value.toString().length <= 14) ||
        !value.trim()
      );
    }),
  // emergencyContactNumber: yup
  //   .string()
  //   .test("mobile_validation", "Enter Valid Mobile number", (value) => {
  //     return (
  //       (value.toString().length >= 10 && value.toString().length <= 14) ||
  //       !value.trim()
  //     );
  //   }),
  govtIdType: yup.string().required(),
  govtIdNumber: yup.string().when("govtIdType", (idType) => {
    if (idType[0] === "Aadhar") {
      return yup
        .number()
        .typeError("Enter a valid Aadhar number")
        .required("Enter Aadhar number or change ID Type to Blank")
        .moreThan(100000000000, "Enter valid Aadhar number")
        .lessThan(999999999999, "Enter valid Aadhar number");
    } else if (idType[0] === "PAN") {
      return yup
        .string()
        .required("Enter PAN number or change ID Type to Blank")
        .length(8, "Enter correct PAN number")
        .test(
          "pan_validation",
          "Enter Valid Alphanumerical PAN number",
          (value) => {
            const array = Array.from(value).map((val) => isNaN(val));
            console.log(array);
            const allNaN = array.every(Boolean);
            const someNaN = array.some(Boolean);
            return !allNaN && someNaN;
          }
        );
    }
  }),
});

const UserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div className="section">
        <div>
          <div className="input-container">
            <label>
              Name<span style={{ color: "red" }}>*</span>
            </label>
            <input placeholder="Enter Name" {...register("name")} />
            <p>{errors.name?.message}</p>
          </div>
          <div>
            <div className="input-container">
              <label>
                Date of Birth or Age<span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder="DD/MM/YYYY or Age in Years"
                {...register("dateOfBirthorAge")}
              />
              <p>{errors.dateOfBirthorAge?.message}</p>
            </div>
            <div className="input-container">
              <label>
                Sex<span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder="Enter Sex"
                {...register("sex", { required: true })}
              />
              <p>{errors.sex?.message}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="input-container">
            <label>Mobile</label>
            <input placeholder="Enter Mobile" {...register("mobile")} />
            <p>{errors.mobile?.message}</p>
          </div>
          <div>
            <div className="input-container">
              <label>Govt Issued ID</label>
              <select placeholder="ID Type" {...register("govtIdType")}>
                <option value={""}>ID Type</option>
                <option value={"Aadhar"}>Aadhar</option>
                <option value={"PAN"}>PAN</option>
              </select>
            </div>
            <div className="input-container">
              <input
                placeholder="Enter Govt ID"
                {...register("govtIdNumber")}
              />
              <p>{errors.govtIdNumber?.message}</p>
            </div>
          </div>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
