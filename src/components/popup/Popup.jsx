import React, { useState } from 'react'
import { useGlobalContext } from '../../store/context'
import NumberField from '../number/Number'
import TextField from '../text/Text'
import './popup.css'
import { IoMdCloseCircleOutline } from "react-icons/io"
import axios from 'axios'

export const Popup = () => {
    const { setShowFeedback, setFeedbackInfo, setShowPopup, getContacts } = useGlobalContext()

    const [newContact, setNewContact] = useState({
        name: '',
        number: '',
        editable: false
    })

    const handleFieldChange = event => {
        setNewContact({
            ...newContact,
            [event.target.name]: event.target.value
        })
    }

    const isTrue = values => values.every(value => !!String(value))
    
    const handleSubmitButtonClick = async event => {
        event.preventDefault()
        
        const canBeSubmitted = isTrue(Object.values(newContact))
        if (!canBeSubmitted) {
            setShowFeedback(true)
            setFeedbackInfo({ type: 'danger', message: 'Please, fill all fields!'})    
            return 
        }

        try {
            const response = await axios.post('/contacts/', newContact)
            console.log(response.data);
            setShowPopup(false)
            setShowFeedback(true)
            setFeedbackInfo({ type: 'success', message: 'New contact has been added!'})
            getContacts()    
        } catch (error) {
            console.log(error.response);
            setFeedbackInfo({ type: 'danger', message: error.message })
            setShowFeedback(true)
        }
    }


    return (
        <div className="popup__background" onClick={() => setShowPopup(false)}>
            <div className="popup" onClick={e => e.stopPropagation()}>
                <div className="popup__title">New contact</div>
                <button className="popup__close-btn" onClick={() => setShowPopup(false)}><IoMdCloseCircleOutline /></button>
                <form className="popup__form">
                    <TextField name='name' label="Name" value={newContact.name} required editable={true} onChange={handleFieldChange} />  
                    <NumberField name='number' label="Number" value={newContact.number} required editable={true} onChange={handleFieldChange} />  
                    <button type="submit" className="popup__submit-btn" onClick={handleSubmitButtonClick}>Submit</button>
                </form>
            </div>
        </div>
    )
}
