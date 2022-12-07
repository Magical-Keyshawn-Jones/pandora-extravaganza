import './WebsiteLoginCss.css';
import * as yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// Importing Function logic
import {
    loginForm,
    helperTextLogic,    
} from './WebsiteLogic';
// Material Ui imports
import {
    Box,
    Button,
    TextField,
  } from '../../Storage/MuiExports';

//   Make Login Page loud or you're not done and it is not professional
// in the bottom right corner offer to show my Portfolio first for employers

export default function WebsiteLogin() {
    const navigate = useNavigate()
    // Initial States
    const formInputs = {
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
    function registerButton() {
        navigate('/testingRender')
    }

    function loginButton() {
        navigate('/homePage')
    }

    return ( 
        <motion.main className='WebsiteLogin'>
            <header className='WebsiteTitle'>
                <h1 className='WebsiteTitle'>Pandora Extravaganza!</h1>
            </header>
            <motion.div initial={{x: 700, scale: .1, opacity: 0}} animate={{x: 0, opacity: 1, rotate: 360, rotateY: [0, 360], rotateX: [0,0,360], scale: [0,1]}} transition={{type: 'spring', duration: 2, bounce: .45}} className='LoginBox'>
                <motion.div initial={{opacity: 0}} animate={{ opacity: 1}} transition={{}} >
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
                </motion.div>
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
                    <Button onClick={()=>{registerButton()}} >Register</Button>
                </div>
            </motion.div>
        </motion.main>
    )
}