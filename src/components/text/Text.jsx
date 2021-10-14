import React, { useState } from 'react'
import './text.css'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'


const TextField = ({value='', onChange, type="text", label, name, parentForm, editable=true, required, rowClickable=false, handleValueRemoveButtonClick}) => {
    const [passwordOrText, setPasswordOrText] = useState(type)
    // console.log(value);
    const [focused, setFocused] = useState(!!value.toString().length ? 'focused filled' : '')
    const handleFormFieldClick = event => {
        // event.preventDefault()
        rowClickable && event.stopPropagation()
        // console.log('inside', event.target);
    }
    return (
        <div className='text form-field' onClick={handleFormFieldClick} style={{pointerEvents: !editable && 'none'}}>
            <label htmlFor={name} className={`text__label ${focused}`} style={{display: !label && "none" }}>{label}</label>
            <input autoComplete="off" name={name} required type={passwordOrText} id={name} disabled={!editable} className="text__input" value={value} onChange={onChange} onFocus={() => setFocused('focused')} onBlur={() => setFocused(!!value ? 'focused filled' : '')} />
            {type === 'password' && 
            <button className="svg-container password__eye" tabIndex={-1} onClick={(e) => {e.preventDefault(); setPasswordOrText(passwordOrText === 'text' ? 'password' : 'text')}}>{passwordOrText === 'text' ? <AiOutlineEye /> :<AiOutlineEyeInvisible />}</button>}
        </div>
    )
}

export default TextField
