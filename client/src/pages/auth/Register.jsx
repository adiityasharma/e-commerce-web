import Form from "@/components/common/Form.jsx";
import { RegisterFormControl } from "@/config/formControl.js";
import { registerUser } from "@/features/auth/authSlice.js";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  username: "",
  email: "",
  password: "",
};
  
function Register() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(registerUser(formData)).unwrap();
      toast.success(result.message);
      navigate("/auth/login")
    } catch (error) {
      toast.error(error)
    }
  };

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
