import React , {useState} from 'react';
import {useFormik} from 'formik';
import "./App.css";
import Popup from "./components/Popup";

const validate = values => {
  const errors ={};
  if(!values.firstname){ // checks for empty condition
    errors.firstname="*Required";
  }
  else if (values.firstname.length > 8){
      errors.firstname="*Must be 8 characters or less";
  }

  if(!values.lastname){ // checks for empty condition
      errors.lastname="*Required";
  }
  else if (values.lastname.length > 8){
        errors.lastname="*Must be 8 characters or less";
  }

  if(!values.email){ // checks for empty condition
        errors.email="*Required";
  }
  else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(values.email)){ // compares user enerded values
      errors.email="*Invalid Email Address";
  }

  if(!values.password){ // checks for empty condition
      errors.password="*Required";
  } 
  else if(values.password.length > 8){
    errors.password ="*Maximum 8 characters"
  }
  else if(values.password.length < 4 ){
    errors.password ="*Minimum 4 characters"
  }

  if(!values.confirmpassword){ // checks for empty condition
    errors.confirmpassword="*Required";
}
else if(values.password !== values.confirmpassword){
  errors.confirmpassword="*Password must match";
}
return errors;
}

const App =() =>{
const [bool , setBool] = useState(0);
const formik = useFormik({
  initialValues :{
    firstname : '',
    lastname : '',
    email : '',
    password : '',
    confirmpassword : '',
  },
   validate,
   onSubmit : values =>{
    // alert (`Hello ! , ${values.firstname} you Successfully Signed up!`)
    if(bool){
      setBool(0);
    }
    else{
      setBool(1);
      console.log(values);
    }
   }
});
console.log(formik.values);
  return (
    
    <div className="main"> 
    <div className="SignUp-form">
      <h2> Sign Up Here</h2>
      <form onSubmit={formik.handleSubmit}>
        <input type="text" placeholder="First Name...." name="firstname" autoComplete="off" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstname}/>
        {formik.touched.firstname && formik.errors.firstname ? <span>{formik.errors.firstname} </span> : null} 
        {/* {formik.errors.firstname ? <span>{formik.errors.firstname} </span> : null} */}
        
        <input type="text" placeholder="Last Name...." name="lastname"  autoComplete="off" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastname}/>
        {formik.touched.lastname && formik.errors.lastname ? <span>{formik.errors.lastname} </span> : null}
       
        <input type="text" placeholder="Email...." name="email"   autoComplete="off" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
        {formik.touched.email && formik.errors.email ? <span>{formik.errors.email} </span> : null}
        
        <input type="password" placeholder="Password...." name="password"  autoComplete="off" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
        {formik.touched.password && formik.errors.password ? <span>{formik.errors.password} </span> : null}

        <input type="password" placeholder="Confirm Password...." name="confirmpassword"  autoComplete="off"onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmpassword}/>
        {formik.touched.confirmpassword && formik.errors.confirmpassword ? <span>{formik.errors.confirmpassword} </span> : null}
        
        <input type="submit" value="Submit"/>        
        </form>
    </div>
    < div className="message-box">
      {
        bool ? (<Popup onClick={formik.handleSubmit}/>) : null
      }
    </div>
    </div>
  );
}

export default App;
