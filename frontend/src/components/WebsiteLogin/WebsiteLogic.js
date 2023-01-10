import * as yup from 'yup'

// Form validation
const loginForm = yup.object().shape({
    username: yup
    .string(),

    password: yup
    .string()
})

// Error Logic
function helperTextLogic(errorBoolean,errorValues, isOpen) {
    if (errorBoolean === true && isOpen === false) {
        return 'Incorrect Username or Password'
    } else {
        return ''
    }
}

export {
    loginForm,
    helperTextLogic,
}