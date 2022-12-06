import * as yup from 'yup'

// Form validation
const loginForm = yup.object().shape({
    email: yup
    .string(),

    password: yup
    .string()
})

// Error Logic
function helperTextLogic(errorBoolean,errorValues) {
    switch(errorBoolean){
        case true:
            return errorValues.email
        default:
            return ''
    }
}

export {
    loginForm,
    helperTextLogic,
}