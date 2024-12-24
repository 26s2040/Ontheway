import * as yup from "yup"; //import all exports from the yup

export const userSchemaValidation = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Not valid email format")
      .required("Email is required"),
  

      phone: yup
  .string()
  .length(8, "Phone Number must be exactly 8 numbers")
  .required("Phone Number is required"),
address: yup
  .string()
  .required("Address is required"),
        password: yup.string().min(4).max(20).required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Don't Match")
      .required(),

  });
  