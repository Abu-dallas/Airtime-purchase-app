export const registerValidation = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  }
  if (!values.phone) {
    errors.phone = "Phone number is required";
  }
  if (!values.password) {
    errors.password = "password is required";
  } else if (values.password.length < 5) {
    errors.password = "password must be more than 5 characters long";
  }
  if (!values.cpassword) {
    errors.cpassword = "confirm your password";
  } else if (values.cpassword !== values.password) {
    errors.cpassword = "password does not match";
  }
  return errors;
};

export const loginValidate = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "email is required";
  }
  if (!values.password) {
    errors.password = "password is required";
  }
  return errors;
};

export const purchaseValidation = (values) => {
  let errors = {};
  if (!values.phone) {
    errors.phone = "Please enter phone number";
  }
  if (!values.amount) {
    errors.amount = "please enter the amount";
  }
  if (!values.network) {
    errors.network = "please select the network";
  }
  return errors;
};

export const fundingValidation = (values) => {
  let errors = {};
  if (!values.amount) {
    errors.amount = "Please enter the amount";
  } else if (values.amount === 0) {
    errors.amount = "Pnter valid amount";
  } else if (values.amount < 100) {
    errors.amount = "Minimum deposit is 100";
  }
  return errors;
};
