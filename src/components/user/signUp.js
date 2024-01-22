import React from 'react'
import {  Form, Input,Button, Icon } from 'semantic-ui-react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm ,handleSubmit} from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addUser } from '../service/serviceUser';
  


const schema = yup
.object({
   // Id: yup.string("נוננננונונו").required("שדה חובה!"),
   Username: yup.string().required(" שדה חובה"),
   Password: yup.string().matches(/^[0-9]{4}$/, 'סיסמא חייבת להכיל  4 ספרות').required(" שדה חובה"),
   Name: yup.string().required(" שדה חובה"),
   Phone: yup.string().matches(/^[0-9]{7,10}$/, 'טלפון חייב להכיל בין 7 ל-10 ספרות').required(" שדה חובה"),
   // Email: yup.string().email("כתובת המייל אינה תקינה").required(" שדה חובה"),
   Email: yup.string().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'יש להכניס כתובת מייל תקינה').required(" שדה חובה"),
   Tz: yup.string().matches(/^[0-9]{9}$/, 'תעודת זהות חייבת להכיל 9 ספרות בלבד').required(" שדה חובה"),
}).required()


const SignUp = () => {
   
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
   })

      
      const onSubmit = (data) => {
         dispatch(addUser(data)) 
        navigate("/home")
      }
      return (
        <div >

            <Form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("Username")} placeholder="userName" />
                <p>{errors.Username?.message}</p>

                <input type="password"{...register("Password")} placeholder="password" />
                <p>{errors.Password?.message}</p>

                <input {...register("Name")} placeholder="name" />
                <p>{errors.Name?.message}</p>

                <input {...register("Phone")} placeholder="phone" />
                <p>{errors.Phone?.message}</p>

                <input {...register("Email")} placeholder="email" />
                <p>{errors.Email?.message}</p>

                <input {...register("Tz")} placeholder="identity" />
                <p>{errors.Tz?.message}</p>

                {/* <Button type="submit" className='but' >הרשמה</Button>gi */}
                <Button className='but' type="submit" >שמור </Button>

            </Form>

                <div> <label>משתמש רשום?👈</label><Link className='link' to={'/login'}> בחזרה להתחברות מחשבון קיים</Link></div> 
              
        </div >

    )
}

export default SignUp