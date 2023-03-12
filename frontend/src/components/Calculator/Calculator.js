import './Calculator.css'
import { useState } from 'react'
import { images } from '../../Storage/images'

export default function Calculator() {
    // Current Number being Displayed
    const [display, setDisplay] = useState(0)
    const calculatorButtons = [
        'Clear', 'X', '7', '8', '9', '4', '5', '6', '1', '2', '3',
        'plusMinus', '0', '.', '*', '-', '+', '/', '='
    ]
    
    function buttonFactory(element, index) {
        if (element === 'plusMinus') {
            return (
                <button className='CalculatorButtonChild' key={index}><img src={images.calculator.Calculator_PositiveNegative} alt='Positive Negative Symbol'/></button>
            )
        } else if (element === 'X') {
            return (
                <button className='CalculatorButtonChild' key={index}><img src={images.calculator.Calculator_Backspace} alt='Backspace'/></button>
            )
        } else {
            return (
                <button className='CalculatorButtonChild' key={index}>{element}</button>
            )
        }
    }
    return (
        <main className='CalculatorPage'>
            <div className='Calculator'>
                <div className='ValueDisplay'>
                    <p>{display}</p>
                </div>
                <div className='CalculatorButtons'>
                    {calculatorButtons.map((item, index) => {return buttonFactory(item, index)})}
                </div>
            </div>
        </main>
    )
}