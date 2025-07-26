import Form from "@/components/common/Form";
import { RegisterFormControl } from "@/config/formControl";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  username: "",
  email: "",
  password: "",
};

function Register() {
  const [formData, setFormData] = useState(initialState);

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 ">
      <div className="text-center">
        <h1 className=" text-3xl font-bold tracking-tight text-foreground">
          Create new Account
        </h1>
        <Link
          className="mt-2 font-medium text-primary hover:underline"
          to="/auth/login"
        >
          Already have an account
        </Link>
      </div>

      <Form
        formControls={RegisterFormControl}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default Register;
