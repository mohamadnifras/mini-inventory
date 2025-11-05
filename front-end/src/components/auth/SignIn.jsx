import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/authSlice";
import { MdOutlineEmail } from "react-icons/md";
import { GoLock } from "react-icons/go";


function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password Required"),
  });
  const handleSubmit = async(values)=>{
     console.log("values:", values);
        try {
          await dispatch(loginUser(values))
            .unwrap()
            .then((respons) => {
              alert(respons.message);
            });
        } catch (error) {
          console.log(error, "error");
          alert(error);
        }
  }
    useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
     <div className="flex flex-col md:flex-row h-screen bg-[#704646] font-display">
         {/* Form Section */}
         <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-8">
           <h1 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6 md:mb-8">
             Sign In to Your Account
           </h1>
   
           <Formik
             initialValues={{ email: "", password: "" }}
             validationSchema={validationSchema}
             onSubmit={handleSubmit}
           >
             <Form className="w-full max-w-sm flex flex-col space-y-4">
               {/* Email */}
               <div className="relative">
                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">
                   <MdOutlineEmail />
                 </span>
                 <Field
                   type="email"
                   name="email"
                   placeholder="Email"
                   className="w-full pl-10 px-4 py-3 bg-gray-100 rounded focus:outline-none"
                 />
                 <ErrorMessage
                   name="email"
                   component="div"
                   className="text-red-500 text-sm mt-1"
                 />
               </div>
   
               {/* Password */}
               <div className="relative">
                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">
                   <GoLock />
                 </span>
                 <Field
                   type="password"
                   name="password"
                   placeholder="Password"
                   className="w-full pl-10 px-4 py-3 bg-gray-100 rounded focus:outline-none"
                 />
                 <ErrorMessage
                   name="password"
                   component="div"
                   className="text-red-500 text-sm mt-1"
                 />
               </div>
   
               {/* Forgot Password */}
               <div className="flex justify-center">
                 <a href="#" className="text-sm underline font-semibold">
                   Forgot password?
                 </a>
               </div>
   
               {/* Submit Button */}
               <div className="flex justify-center">
                 <button
                   type="submit"
                   className="bg-yellow-500 text-white py-3 w-[200px] rounded-full hover:bg-yellow-600 transition disabled:opacity-50"
                 >
                   SIGN IN
                 </button>
               </div>
             </Form>
           </Formik>
   
           {/* Mobile: Don't have account? */}
           <p className="text-sm text-gray-600 mt-4 md:hidden">
             Don’t have an account?{" "}
             <Link to="/sign-up" className="text-yellow-500 font-medium hover:underline">
               Sign Up
             </Link>
           </p>
         </div>
   
   
         
       </div>
  );
}

export default SignIn;
