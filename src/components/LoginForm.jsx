import React, { useRef, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { FormikProvider, useFormik } from "formik";
import Form from "react-validation/build/form";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import CheckButton from "react-validation/build/button";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import axios from "axios";

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

const LoginForm = ({ setAuth }) => {
  
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);
  const checkBtn = useRef();
  const form = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };


  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/home");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
          console.log(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };



 /* const [valus,setValus] = useState ({
    email:"",
    pass:""
  });

  console.log(valus);

  const [user , setUser] = useState({
    user_email: "",
    user_password: "",
  })


  function onTextFieldChange(e){
    setUser({
        ...user ,
        [e.target.name] : e.target.value
    });
}
    
    const [check, setCheck]  = useState(false);

 /*   async function handleLogin(){
      let value = await axios.get("http://localhost:3333/user");

    for(let i=0 ; i < value.data.length; i++){
      if( value.data[i].user_email === user.user_email &&
        value.data[i].user_password === user.user_password)
     {
         setCheck(true);
        alert("success");
        
        navigate('/home');
        console.log("success");
     }
    }
    if(check)
      alert(" Wrong User Email or password");
  }
  */

/*  const handleSubmit = async (e) => {
    e.preventDefault();
    var session_url = 'http://localhost:3333/user';
    var uname = 'user_name';
    var pass = 'user_password';
    axios.post(session_url, {}, {
      auth: {
        username: uname,
        password: pass
      }
    }).then(function(response) {
      console.log('Authenticated');
    }).catch(function(error) {
      console.log('Error on Authentication');
    })
  };
*/

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Provide a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      console.log("submitting...");
      setTimeout(() => {
        console.log("submited!!");
        setAuth(true);
        navigate(from, { replace: true });
      }, 2000);
    },
  });

  const { errors, touched, values, isSubmitting, getFieldProps } =
    formik;

  return (
    
      <Form  onSubmit={handleLogin} ref={form}>
        <Box
          component={motion.div}
          animate={{
            transition: {
              staggerChildren: 0.55,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
            <TextField
              fullWidth
              autoComplete="username"
              type="text"
              label="username"
              name="username"
              value={username}
              onChange={onChangeUsername}
            
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              name="password"
              value={password}
              onChange={onChangePassword}
              
              required
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <Icon icon="eva:eye-fill" />
                      ) : (
                        <Icon icon="eva:eye-off-fill" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}

            />
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    {...getFieldProps("remember")}
                    checked={values.remember}
                  />
                }
                label="Remember me"
              />

              <Link
                component={RouterLink}
                variant="subtitle2"
                to="#"
                underline="hover"
              >
                Forgot password?
              </Link>
            </Stack>
          
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {isSubmitting ? "loading..." : "Login"}
            </LoadingButton>
          </Box>
        </Box>

        <CheckButton
        style={{ display: "none" }}
        ref={checkBtn}
      />

      
        </Form>
  );
};

export default LoginForm;
