//STEP: 15 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
'use client';
import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import {AiOutlineEye,AiOutlineEyeInvisible,AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import { styles } from '../../../app/styles/style'; //imported later in this step
import { useRegisterMutation } from '../../../redux/features/auth/authApi'; //imported in 24th step
import toast from 'react-hot-toast'; //imported in 24th step
//defining props
type Props = {
    setRoute:(route:string) => void;
}
//creating schema for "yup"
const schema = Yup.object().shape({
    name: Yup.string().required("Please enter your name!"),
    email: Yup.string().email("Invalid email!").required("Please enter your email!"),
    password: Yup.string().required("Please enter your password!").min(6),
});
//creating page
const SignUp:FC<Props> = ({setRoute}) => {
  const [show, setShow] = useState(false); //for showing/hiding password

  //STEP: 24 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //watch- 2:02:05 to 2:08:00
  const [register,{data,error,isSuccess}] = useRegisterMutation();
  useEffect(() => {
    if(isSuccess){
        const message = data?.message || "Registration successful";
        toast.success(message);
        setRoute("Verification");
    }
    if(error){
        if("data" in error){
            const errorData = error as any;
            toast.error(errorData.data.message);
        }
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess,error]);
  //OVER: 24 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //using "formik" for form-valiation
  const formik = useFormik({
    initialValues: {name:"", email:"", password:""},
    validationSchema: schema,
    //onSubmit: async({email,password}) => {setRoute("Verification")}

    //STEP: 25 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //first, comment the above line and then proceed
    onSubmit: async({name,email,password}) => {
        const data = {name,email,password};
        await register(data);
    }
    //watch- 2:06:30 to 2:07:30
    //now, time to move towards finalizing "verification"
    //OVER: 25("m": ./Verification.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  });
  const {errors,touched,values,handleChange,handleSubmit} = formik;
  //now, we will be using the same style in a lot of our components, so lets first create that type of style separately. Create a folder named "styles" inside the "app" folder and then create a file named "style.ts" inside the "styles" folder, code in it and then come back here.
  //also, watch- 1:09:55 to 1:10:20
  //disaplaying data to user
  return (
    <div className='w-full'>
        <h1 className={`${styles.title}`}>
            Join Elearning
        </h1>
        <form onSubmit={handleSubmit}>
            {/* for name */}
            <div className='mb-3'>
                <label className={`${styles.label}`} htmlFor="email">Enter your Name</label>
                <input type="text" name="" value={values.name} onChange={handleChange} id="name" placeholder='John Doe' className={`${errors.name && touched.name && "border-red-500"} ${styles.input}`} />
                {errors.name && touched.name && (<span className="text-red-500 pt-2 block">{errors.name}</span>)}
            </div>
            {/* for email */}
            <label className={`${styles.label}`} htmlFor="email">Enter your Email</label>
            <input type="email" name="" value={values.email} onChange={handleChange} id="email" placeholder='loginmail@gmail.com' className={`${errors.email && touched.email && "border-red-500"} ${styles.input}`} />
            {errors.email && touched.email && (<span className="text-red-500 pt-2 block">{errors.email}</span>)}
            {/* for password */}
            <div className='w-full mt-5 relative mb-1'>
                <label className={`${styles.label}`} htmlFor="password">Enter your password</label>
                <input type={!show ? "password" : "text"} name="password" value={values.password} onChange={handleChange} id="password" placeholder="password!@%" className={`${errors.password && touched.password && "border-red-500"} ${styles.input}`} />
                {!show ? (<AiOutlineEyeInvisible className="absolute bottom-3 right-2 z-1 cursor-pointer" size={20} onClick={() => setShow(true)}/>) : (<AiOutlineEye className="absolute bottom-3 right-2 z-1 cursor-pointer" size={20} onClick={() => setShow(false)}/>)}
            </div>
            {errors.password && touched.password && (<span className="text-red-500 pt-2 block">{errors.password}</span>)}
            {/* for submit-button */}
            <div className="w-full mt-5">
                <input type="submit" value="Sign Up" className={`${styles.button}`} />
            </div>
            {/* for social-auth */}
            <br />
            <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">Or join with</h5>
            <div className='flex items-center justify-center my-3'>
                <FcGoogle size={30} className='cursor-pointer mr-2'/>
                <AiFillGithub size={30} className='cursor-pointer ml-2 dark:text-white text-black'/>
            </div>
            {/* for sign-up */}
            <h5 className='text-center pt-4 font-Poppins text-[14px] dark:text-white text-black'>Already have any account?{" "}<span className='text-[#2190ff] pl-1 cursor-pointer' onClick={() => setRoute("Login")}>Sign in</span></h5>
            <br />
        </form>
    </div>
  )
}
export default SignUp;
//OVER: 15("c": ./Verification.tsx and "m": ./Verification.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////