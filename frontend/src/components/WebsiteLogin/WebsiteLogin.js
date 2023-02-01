import './WebsiteLoginCss.css';
import '@fontsource/emilys-candy/400.css';
import axios from 'axios'
import Cookies from 'js-cookie';
import * as yup from 'yup';
import * as React from 'react'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import ProfilePic from '../../Storage/Images/Portfolio/Profile_Pic.jpg';
// Importing Function logic
import {
    loginForm,
} from './WebsiteLogic';
// Material Ui imports
import {
    Box,
    Button,
    TextField,
    Typography,
  } from '../../Storage/MuiExports';

// *Note* Shrink text to fix for same username error
//   Make Login Page loud or you're not done and it is not professional
// in the bottom right corner offer to show my Portfolio first for employers

export default function WebsiteLogin(props) {
    const { loginStatus, changeUsername, changeServerResponse, serverResponse } = props
    const theme = createTheme({
        typography: {
            fontFamily: ['emilys-candy'].join(',')
        }
    })

    const navigate = useNavigate()
    // Initial States
    const formInputs = {
        username: '',
        first_Name: '',
        last_Name: '',
        gender: '',
        email: '',
        password: '',
    }

    const [formValues, setFormValues, handleChanges] = useInput(formInputs)
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

    // Used to only send filled out areas of the form
    function specificLetter(){
        const newLetter = {}
        for (const [key, value] of Object.entries(formValues)) {
            if (value.length >= 1) {
                newLetter[key] = value
            }
        }
        return newLetter
    }


    // Button functions
    // If "isOpen" is false, then set it to true, else submit the information in the form
    function registerButton() {
        if (isOpen === true){
            if (formValues.username.length < 1 || formValues.password < 1) {
                setErrorBoolean(true)
            } else {
                axios.post('http://127.0.0.1:8000/users/register', specificLetter())
                .then(res => {
                    if (res.data.error) {setErrorBoolean(true)}
                    else {
                        Cookies.set('access_token', res.data.accessToken)
                        changeUsername(formValues.username)
                        loginStatus()
                        navigate('/home')
                    }
                })
                .catch(err => {
                    console.log(err.response.data.error)
                    changeServerResponse(err.response.data.error)
                    setErrorBoolean(true)
                })
            }
        } else {
            setIsOpen(!isOpen)
            setErrorBoolean(false)
            changeServerResponse(null)
        }
    }

    function loginButton() {
        if (isOpen === true) {
            setIsOpen(!isOpen)
            setErrorBoolean(false)
            changeServerResponse(null)
            setFormValues({
                username: formValues.username,
                password: formValues.password,
                email: '',
                first_name: '',
                last_name: '',
                gender: '',
            })
        } else if (formValues.username.length === 0 || formValues.password.length === 0) {
            setErrorBoolean(true)
        } else {
            // Bypass Login
            if (formValues.username === 'Admin') {
                Cookies.set('access_token', 'Admin')
                changeUsername(formValues.username)
                loginStatus()
                navigate('/home')
            }
            setFormValues({
                username: formValues.username,
                password: formValues.password,
            })
            axios.post('http://127.0.0.1:8000/users/login', formValues)
            .then(res => {
                if (res.data.error) {
                    setErrorBoolean(true)
                    changeServerResponse(res.data.error)
                }
                else {
                    Cookies.set('access_token', res.data.accessToken)
                    changeUsername(formValues.username)
                    loginStatus()
                    navigate('/home')
                }
            })
            .catch(err => {
                // Triggers when username is correct but password isn't
                console.log(err.response.data.error)
                changeServerResponse(err.response.data.error)
                console.log('triggered')
                setErrorBoolean(true)
            })
        }
    }

    // Returns certain errors
    // *Note* Shrink text to fix for same username error
    function returningErrors(){
        if (errorBoolean === true && isOpen === true && serverResponse === null) {
            return (
                <Box sx={{color: 'black'}}>
                    <p>Please fill out the required fields</p>
                </Box>
            )
        }
        else if (errorBoolean === true && isOpen === true && serverResponse !== null) {
            return (
                <Box sx={{color: 'black'}}>
                    <p>{serverResponse}</p>
                </Box> 
            )
        }
        else if (errorBoolean === true && isOpen === false) {
            if (formValues.username.length <= 0 || formValues.password.length <= 0) {
                return (
                    <Box sx={{color: 'black'}}>
                        <p>Please fill out the required fields</p>
                    </Box> 
                )
            } else if (serverResponse !== null) {
                return (
                    <Box sx={{color: 'black'}}>
                        <p>Username or Password is Incorrect</p>
                    </Box>
                )
            }
        }
        else return ''
    }
    
    return ( 
        <motion.main className='WebsiteLogin'> 
        {/* Title above the login form */}
            <header className='WebsiteTitle'> {/*Give each letter a span with a dynamic className to animate the Title*/}
                <motion.h1 initial={{scale: .1}} animate={{scale: 1, skew:360, rotateY: 360}} transition={{duration: 2}} className='WebsiteTitle'>
                    <ThemeProvider theme={theme}>
                    <Typography id='ResponsiveWebsiteTitle' sx={{ fontSize: '4rem'}}>Pandora Extravaganza!</Typography>
                    </ThemeProvider>
                    </motion.h1>
            </header>
            {/* The login form */}
            <motion.div layout 
            style={{ height: isOpen ? '40rem' : '20rem', marginTop: isOpen ? '1rem' : '5rem'}} 
            initial={{x: 700, scale: .1, opacity: 0}} 
            animate={{x: 0, opacity: 1, rotate: 360, rotateY: [0, 360], rotateX: [0,0,360], scale: [0,1]}} 
            transition={{type: 'spring', duration: 1.5, bounce: .45}} 
            className='LoginBox'>
                {/*Note* Shrink text to fix for same username error*/}
                {returningErrors()}
                <TextField 
                    name='username'
                    type='text' 
                    value={formValues.username}
                    onChange={handleChanges}
                    color='primary' 
                    required 
                    error={errorBoolean} 
                    label='Username'
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
                {isOpen === true ?
                <motion.div className='RegisterInputs'>
                    <TextField className='RegisterChild' name='email' type='email' value={formValues.email} onChange={handleChanges} label='Email Address'/>
                    <TextField className='RegisterChild' name='first_name' type='text' value={formValues.first_name} onChange={handleChanges}  label='First Name'/>
                    <TextField className='RegisterChild' name='last_name' type='text' value={formValues.last_name} onChange={handleChanges}  label='Last Name'/>
                    <TextField className='RegisterChild' name='gender' type='text' value={formValues.gender} onChange={handleChanges}  label='Gender'/>
                </motion.div> : null}
                <div className='LoginButtons'>
                    <Button onClick={()=>{loginButton()}} variant='contained'>Login</Button>
                    <Button onClick={()=>{registerButton()}}>Register</Button>
                </div>
            </motion.div>
            {/* The bottom left portfolio section */}
            <div className="PortfolioCard card position-absolute align-self-start" style={{ width: "18rem", top: "49vh"}}>
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