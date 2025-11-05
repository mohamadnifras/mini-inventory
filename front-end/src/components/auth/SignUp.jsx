import React from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from '../../redux/authSlice';



function SignUp() {
     const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Username Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password Required"),
  
  });

  const handleSubmit = async (values) => {

    try {
      await dispatch(registerUser(values))
        .unwrap()
        .then((response) => {
          navigate("/sign-in");
          alert(response?.data?.message || "Registered Successfully");
        });
    } catch (error) {
        console.log("errro",error)
      alert(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#704646]  bg-cover bg-center  bg-no-repeat px-4 sm:px-6">
      <div className="w-full max-w-md bg-transparent shadow-xl rounded-lg p-8 border-2  border-white/50 backdrop-blur-xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Sign Up
        </h2>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-5 text-amber-50">
            <div>
              <Field
                type="text"
                name="name"
                placeholder="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-amber-50"
              />

              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-amber-50"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-amber-50"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-amber-300 text-white rounded-lg hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </Form>
        </Formik>

        <p className="text-center text-sm text-white mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 underline">
            Log in
          </a>
        </p>
      </div>
     
    </div>
  )
}

export default SignUp






