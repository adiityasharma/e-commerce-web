import Form from '@/components/common/Form';
import { LoginFormControl } from '@/config/formControl';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const initialState = {
  email: "",
  password: ""
}

function Login() {

  const [formData, setFormData] = useState(initialState);

  const onSubmit = (e) => {
    e.preventDefault()
  }

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

export default Login
