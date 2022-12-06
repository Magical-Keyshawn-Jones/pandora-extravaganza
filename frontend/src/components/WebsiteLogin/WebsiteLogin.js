import './WebsiteLoginCss.css';
import * as yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <main className='WebsiteLogin'>
            <header className='WebsiteTitle'>
                <h1 className='WebsiteTitle underline'>Pandora Extravaganza!</h1>
            </header>
            <form className='LoginBox'>
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
                    <Button onClick={()=>{registerButton()}} >Register</Button>
                </div>
            </form>
        </main>
    )
}