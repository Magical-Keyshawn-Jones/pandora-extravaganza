import * as yup from 'yup'

// Form validation
const loginForm = yup.object().shape({
    username: yup.string(),
    password: yup.string(),
    first_name: yup.string(),
    last_name: yup.string(),
    gender: yup.string(),
    email: yup.string().email(),
})

// Error Logic
function helperTextLogic(errorBoolean, isOpen, serverResponse) {
    if (serverResponse !== undefined || serverResponse !== null) {return serverResponse}
    else if (errorBoolean === true && isOpen === false) { return 'Incorrect Username or Password' } 
    else { return '' }
}

export {
    loginForm,
    helperTextLogic,
}