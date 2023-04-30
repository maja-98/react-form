import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { parse } from "date-fns";
import * as yup from "yup";

const schema = yup.object().shape(
  {
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
          if (!isNaN(value)) {
            return (parseInt(value) >= 0) & (parseInt(value) <= 200);
          } else {
            const convertedDate = parse(value, "dd/MM/yyyy", new Date());
            const year = convertedDate.getFullYear();
            const currentYear = new Date();
            return (
              convertedDate.toLocaleString() !== "Invalid Date" &&
              year > 1900 &&
              convertedDate <= currentYear
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
    govtIdType: yup.string().when("govtIdNumber", (govtIdNumber) => {
      if (govtIdNumber[0]?.toLocaleString().trim().length) {
        return yup.string().required("Clear Govt ID or select any ID Type");
      }
      return yup.string();
    }),
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
  },
  ["govtIdType", "govtIdNumber"]
);

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
            <div>
              <label>
                Name<span style={{ color: "red" }}>*</span>
              </label>
              <input placeholder="Enter Name" {...register("name")} />
            </div>
            <small>{errors.name?.message}</small>
          </div>
          <div className="section-sub-container">
            <div className="input-container">
              <div>
                <label>
                  Date of Birth or Age<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  placeholder="DD/MM/YYYY or Age in Years"
                  {...register("dateOfBirthorAge")}
                />
              </div>

              <small>{errors.dateOfBirthorAge?.message}</small>
            </div>
            <div className="input-container">
              <div>
                <label>
                  Sex<span style={{ color: "red" }}>*</span>
                </label>
                <select {...register("sex", { required: true })}>
                  <option value={""}>Enter Sex</option>
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                  <option value={"Other"}>Other</option>
                </select>
              </div>

              <small>{errors.sex?.message}</small>
            </div>
          </div>
        </div>
        <div>
          <div className="input-container">
            <div>
              <label>Mobile</label>
              <input placeholder="Enter Mobile" {...register("mobile")} />
            </div>

            <small>{errors.mobile?.message}</small>
          </div>
          <div className="section-sub-container">
            <div className="input-container">
              <div>
                <label>Govt Issued ID</label>
                <select placeholder="ID Type" {...register("govtIdType")}>
                  <option value={""}>ID Type</option>
                  <option value={"Aadhar"}>Aadhar</option>
                  <option value={"PAN"}>PAN</option>
                </select>
              </div>
              <small>{errors.govtIdType?.message}</small>
            </div>
            <div className="input-container">
              <input
                placeholder="Enter Govt ID"
                {...register("govtIdNumber")}
              />
              <small>{errors.govtIdNumber?.message}</small>
            </div>
          </div>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
