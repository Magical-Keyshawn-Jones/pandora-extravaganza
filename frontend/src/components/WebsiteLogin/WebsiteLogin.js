import './WebsiteLoginCss.css';
import '@fontsource/emilys-candy/400.css';
import * as React from 'react'
import ProfilePic from '../../Storage/Images/Portfolio/Profile_Pic.jpg';
import * as yup from 'yup';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeProvider, createTheme } from '@mui/material';
// Importing Function logic
import {
    loginForm,
    helperTextLogic,    
} from './WebsiteLogic';
// Material Ui imports
import {
    Button,
    TextField,
    Typography,
  } from '../../Storage/MuiExports';

//   Make Login Page loud or you're not done and it is not professional
// in the bottom right corner offer to show my Portfolio first for employers

export default function WebsiteLogin(props) {
    const { loginStatus } = props
    const theme = createTheme({
        typography: {
            fontFamily: ['emilys-candy'].join(',')
        }
    })

    const navigate = useNavigate()
    // Initial States
    const formInputs = {
        username: '',
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        password: '',
    }

    const errorInputs = {
        email: 'Incorrect Email or Password',
        password: '',
    }

    const [formValues, setFormValues, handleChanges] = useInput(formInputs)
    const [errorValues, setErrorValues] = useState(errorInputs)
    const [errorBoolean, setErrorBoolean] = useState(false)
    // Tracker for Login container
    const [isOpen, setIsOpen] = useState(false)

    // Form/Input Logic
        // Validator Function
        function validator(name, value) {
            yup.reach(loginForm, name)
            .validate(value)
            .then(()=> setErrorBoolean(false))
            .catch(()=> setErrorBoolean(true))
        }

        //Custom Hook helper
        function change(name, value) {
            setFormValues({...formValues, [name]: value})

            validator(name, value) 
        }
        
        // Custom Hook for onChange
        function useInput (startingValue) {
            const [value, setValue] = useState(startingValue)

            function handleChanges(event) {
                // Grabbing Values
                const { name, type, checked, value } = event.target

                // Setting correct checkbox values
                const checkboxValue = type === 'checkbox' ? checked : value
                
                // Changes form values
                change(name, checkboxValue)
            }

            return [value, setValue, handleChanges]
        }
    //

     
    // Button functions
    // If "isOpen" is false, then set it to true, else submit the information in the form
    function registerButton() {
        if (isOpen === true){
            if (formValues.email.length < 1 || formValues.password < 1) {
                setErrorBoolean(true)
            } else {
                navigate('/testingRenders')
            }
        } else {
            setIsOpen(!isOpen)
            setErrorBoolean(false)
        }
    }

    function loginButton() {
        if (isOpen === true) {
            setIsOpen(!isOpen)
            setErrorBoolean(false)
        } else if (formValues.email.length === 0 || formValues.password.length === 0) {
            setErrorBoolean(true)
        } else {
            loginStatus()
            navigate('/homePage')
        }
    }

    return ( 
        <motion.main className='WebsiteLogin'> 
            <header className='WebsiteTitle'> {/*Give each letter a span with a dynamic className to animate the Title*/}
                <motion.h1 initial={{scale: .1}} animate={{scale: 1, skew:360, rotateY: 360}} transition={{duration: 2}} className='WebsiteTitle'>
                    <ThemeProvider theme={theme}>
                    <Typography sx={{ fontSize: '4rem'}}>Pandora Extravaganza!</Typography>
                    </ThemeProvider>
                    </motion.h1>
            </header>
            <motion.div layout 
            style={{ height: isOpen ? '40rem' : '20rem', marginTop: isOpen ? '1rem' : '5rem'}} 
            initial={{x: 700, scale: .1, opacity: 0}} 
            animate={{x: 0, opacity: 1, rotate: 360, rotateY: [0, 360], rotateX: [0,0,360], scale: [0,1]}} 
            transition={{type: 'spring', duration: 1.5, bounce: .45}} 
            className='LoginBox'>
                {isOpen === true ?
                <motion.div className='RegisterInputs'>
                    <TextField className='RegisterChild' name='username' type='text' value={formValues.username} onChange={handleChanges} label='Username'/>
                    <TextField className='RegisterChild' name='firstName' type='text' value={formValues.firstName} onChange={handleChanges}  label='First Name'/>
                    <TextField className='RegisterChild' name='lastName' type='text' value={formValues.lastName} onChange={handleChanges}  label='Last Name'/>
                    <TextField className='RegisterChild' name='gender' type='text' value={formValues.gender} onChange={handleChanges}  label='Gender'/>
                </motion.div> : null}
                <TextField 
                    name='email'
                    type='email' 
                    value={formValues.email}
                    onChange={handleChanges}
                    color='primary' 
                    required 
                    error={errorBoolean} 
                    helperText={helperTextLogic(errorBoolean, errorValues)} 
                    label='Email Address'
                /> 
                <TextField 
                    name='password' 
                    type='password' 
                    value={formValues.password}
                    onChange={handleChanges}
                    color='primary' 
                    required 
                    error={errorBoolean} 
                    sx={{marginTop: 3}} 
                    label='Password' 
                />
                <div className='LoginButtons'>
                    <Button onClick={()=>{loginButton()}} variant='contained'>Login</Button>
                    <Button onClick={()=>{registerButton()}}>Register</Button>
                </div>
            </motion.div>
            <div className="card position-absolute align-self-start" style={{ width: "18rem", top: "49vh"}}>
                <img src={ProfilePic} className="card-img-top" alt="Profile_Picture"/>
                <div className="card-body">
                    <h5 className="card-title">Keyshawn Jones Portfolio</h5>
                    <p className="card-text">Just wanna see my portfolio. I gotch you fam</p>
                    <Link to='/portfolio' className='btn btn-primary' >Portfolio</Link>
                </div>
            </div>
        </motion.main>
    )
}