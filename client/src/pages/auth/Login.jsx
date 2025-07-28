import Form from "@/components/common/Form";
import { LoginFormControl } from "@/config/formControl";
import { loginUser } from "@/features/auth/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser(formData)).unwrap();
      toast.success(result.message);
      // navigate("/shop");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6 ">
      <div className="text-center">
        <h1 className=" text-3xl font-bold tracking-tight text-foreground">
          Sign In to your account
        </h1>
        <Link
          className="mt-2 font-medium text-primary hover:underline"
          to="/auth/register"
        >
          Or Create a new account
        </Link>
      </div>

      <Form
        formControls={LoginFormControl}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default Login;
