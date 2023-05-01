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
    emergencyContactNumber: yup
      .string()
      .test("mobile_validation", "Enter Valid Mobile number", (value) => {
        return (
          (value.toString().length >= 10 && value.toString().length <= 14) ||
          !value.trim()
        );
      }),
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
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div className="section">
        <h4>Personal Details</h4>
        <div className="grid-2">
          <div className="d-flex-center  flex-column w-100">
            <div className="d-flex-center g-5 input-container">
              <label>
                Name<span style={{ color: "red" }}>*</span>
              </label>
              <input placeholder="Enter Name" {...register("name")} />
              <small>{errors.name?.message}</small>
            </div>
            <div className="d-flex-center g-5 input-container">
              <label>Mobile</label>
              <input placeholder="Enter Mobile" {...register("mobile")} />
              <small>{errors.mobile?.message}</small>
            </div>
          </div>
          <div className="d-flex-center  flex-column w-100">
            <div className="d-flex-center g-10">
              <div className="d-flex-center g-5 input-container">
                <label>
                  Date of Birth or Age<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  placeholder="DD/MM/YYYY or Age in Years"
                  {...register("dateOfBirthorAge")}
                />
                <small>{errors.dateOfBirthorAge?.message}</small>
              </div>
              <div className="d-flex-center g-5 input-container">
                <label>
                  Sex<span style={{ color: "red" }}>*</span>
                </label>
                <select {...register("sex", { required: true })}>
                  <option value={""}>Enter Sex</option>
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                  <option value={"Other"}>Other</option>
                </select>
                <small>{errors.sex?.message}</small>
              </div>
            </div>
            <div className="d-flex-center g-10">
              <div className="d-flex-center g-5 input-container">
                <label>Govt Issued ID</label>
                <select placeholder="ID Type" {...register("govtIdType")}>
                  <option value={""}>ID Type</option>
                  <option value={"Aadhar"}>Aadhar</option>
                  <option value={"PAN"}>PAN</option>
                </select>
                <small>{errors.govtIdType?.message}</small>
              </div>
              <div className="d-flex-center g-5 input-container">
                <input
                  placeholder="Enter Govt ID"
                  {...register("govtIdNumber")}
                />
                <small>{errors.govtIdNumber?.message}</small>
              </div>
            </div>
          </div>
        </div>

        <h4>Contact Details</h4>
        <div className="grid-2">
          <div className="d-flex-center g-10">
            <div className="d-flex-center g-5 input-container">
              <label>Guardian Details</label>
              <select {...register("guardianLabel")}>
                <option value={""}>Enter Label</option>
                <option value={"Mr"}>Mr</option>
                <option value={"Ms"}>Ms</option>
              </select>
              <small>{errors.guardianLabel?.message}</small>
            </div>
            <div className="d-flex-center g-5 input-container">
              <input
                placeholder="Enter Guardian Name"
                {...register("guardianName")}
              />
              <small>{errors.guardianName?.message}</small>
            </div>
          </div>
          <div className="d-flex-center g-10">
            <div className="d-flex-center g-5 input-container">
              <label>Email</label>
              <input placeholder="Enter Email" {...register("email")} />
              <small>{errors.email?.message}</small>
            </div>
            <div className="d-flex-center g-5 input-container">
              <label>Emergency Contact Number</label>
              <input
                placeholder="Enter Emergency No"
                {...register("emergencyContactNumber")}
              />
              <small>{errors.emergencyContactNumber?.message}</small>
            </div>
          </div>
        </div>

        <h4>Address Details</h4>
        <div className="grid-2">
          <div className="d-flex-center  flex-column w-100">
            <div className="d-flex-center g-5 input-container">
              <label>Address</label>
              <input placeholder="Enter Address" {...register("address")} />
              <small>{errors.address?.message}</small>
            </div>
            <div className="d-flex-center g-5 input-container">
              <label>country</label>
              <input placeholder="Enter country" {...register("country")} />
              <small>{errors.country?.message}</small>
            </div>
          </div>
          <div className="d-flex-center  flex-column w-100">
            <div className="d-flex-center g-10">
              <div className="d-flex-center g-5 input-container">
                <label>State</label>
                <select {...register("state")}>
                  <option value={""}>Enter State</option>
                </select>
                <small>{errors.state?.message}</small>
              </div>
              <div className="d-flex-center g-5 input-container">
                <label>City</label>
                <select {...register("city")}>
                  <option value={""}>Enter City</option>
                </select>
                <small>{errors.city?.message}</small>
              </div>
            </div>
            <div className="d-flex-center g-10">
              <div className="d-flex-center g-5 input-container">
                <label>Pincode</label>
                <input {...register("pincode")} placeholder="Enter pincode" />
                <small>{errors.pincode?.message}</small>
              </div>
            </div>
          </div>
        </div>

        <h4>Other Details</h4>
        <div className="d-flex-center g-10">
          <div className="d-flex-center g-5 input-container">
            <label>Occupation</label>
            <input {...register("occupation")} placeholder="Enter occupation" />
            <small>{errors.occupation?.message}</small>
          </div>
          <div className="d-flex-center g-5 input-container">
            <label>Religion</label>
            <select {...register("religion")}>
              <option value={""}>Enter Religion</option>
              <option value={"Christian"}>Christian</option>
              <option value={"Hindhu"}>Hindhu</option>
              <option value={"Islam"}>Islam</option>
            </select>
            <small>{errors.religion?.message}</small>
          </div>
          <div className="d-flex-center g-5 input-container">
            <label>Marital Status</label>
            <select {...register("maritalStatus")}>
              <option value={""}>Enter Marital Status</option>
              <option value={"Married"}>Married</option>
              <option value={"Single"}>Single</option>
            </select>
            <small>{errors.maritalStatus?.message}</small>
          </div>
          <div className="d-flex-center g-5 input-container">
            <label>Blood Group</label>
            <select {...register("bloodGroup")}>
              <option value={""}>Enter Blood Group</option>
              <option value={"A+"}>A+</option>
              <option value={"B+"}>B+</option>
              <option value={"AB+"}>AB+</option>
              <option value={"O+"}>O+</option>
              <option value={"A-"}>A-</option>
              <option value={"B-"}>B-</option>
              <option value={"AB-"}>AB-</option>
              <option value={"O-"}>O-</option>
            </select>
            <small>{errors.bloodGroup?.message}</small>
          </div>
        </div>

        <div className="d-flex justify-left">
          <div className="d-flex-center g-5 input-container">
            <label>Nationaity</label>
            <input {...register("nationaity")} placeholder="Enter nationaity" />
            <small>{errors.nationaity?.message}</small>
          </div>
        </div>

        <div className="d-flex-center button-container g-5 justify-right">
          <button type="submit">Submit</button>
          <button onClick={reset} type="reset">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
