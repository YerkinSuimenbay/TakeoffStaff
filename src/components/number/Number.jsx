import React, { useState } from 'react'
import './number.css'
import NumberFormat from 'react-number-format';
import { useGlobalContext } from '../../store/context';

const NumberField = ({value='', onChange, type="text", label, name, parentForm, editable=true, required, sign}) => {
    const { feedbackInfo, showPopup } = useGlobalContext()
    // console.log(value);
    const [focused, setFocused] = useState(!!value.toString().length ? 'focused filled' : '')
    

    // const [numberValue, setNumberValue] = useState(value)  // BEFORE THERE WASN'T THIS LINE#11 AND LINE#13 AND LINE#37 WAS LIKE THIS => value={value}

    const handleOnChange = values => {
        // setNumberValue(values.floatValue)
        // console.log(values);
        const event = {
            target: {
                name, 
                value: values.floatValue || ''  // OTHERWISE IT IS EQUAL TO undefined AND !!String(undefined) = true AND IT PASSES THE IF IN POPUP FUNCTION PRIOR TO SENDING REQUEST
            }
        }
          onChange && onChange(event);
    }

    return (
        <div className='text form-field'>
            <label htmlFor={name} className={`text__label ${focused}`} style={{display: !label && "none" }}>{label}</label>
            <NumberFormat
                id={name}
                value={value}
                className="text__input"
                thousandSeparator={' '}  // CUSTOM THOUSAND SEPARATOR
                onValueChange={handleOnChange}
                onFocus={() => setFocused('focused')} 
                onBlur={() => setFocused(!!value ? 'focused filled' : '')}
                suffix={sign ? ` ${sign}` : ''}
                disabled={!editable}
                max={10}
                style={{borderColor: required && !value && feedbackInfo.type === 'danger' && showPopup ? 'red' : ''}}
                autoComplete="off"
                // allowNegative={false}  // TRUE BY DEFAULT
                // prefix={'$'}
                // hintText="Some placeholder"
                // decimalSeparator="."  // DEFAULT VALUE
                // displayType={'text'}  // renders it as a normal text in a span, ONLY readable  
                // renderText={(value, props) => <div {...props}>{value}</div>}
                // thousandsGroupStyle="thousand"  // DEFAULT VALUE
            />
        </div>
    )
}

export default NumberField