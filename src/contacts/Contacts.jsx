import React, { useEffect, useState } from 'react'
import NumberField from '../components/number/Number'
import TextField from '../components/text/Text'
import './contacts.css'
import { GoSearch } from 'react-icons/go'
import { MdModeEditOutline, MdDelete, MdAdd } from 'react-icons/md'
import { GrFormCheckmark } from 'react-icons/gr'
import { useGlobalContext } from '../store/context'
import axios from 'axios'
export const Contacts = () => {
    const { setShowPopup, contacts, setContacts, getContacts, setShowFeedback, setFeedbackInfo } = useGlobalContext()

    useEffect(() => {
        getContacts()
    }, [])
    
    const handleFieldChange = async (event, id) => {
        console.log({[event.target.name]: event.target.value});
        const updatedContacts = contacts.map(contact => {
            if (contact.id === id) {
                return {
                    ...contact,
                    [event.target.name]: event.target.value
                }
            }
            return contact
        })

        setContacts(updatedContacts)
        try {
            const response = await axios.patch(`/contacts/${id}`, {[event.target.name]: event.target.value})
            console.log(response.data);
            setShowFeedback(true)
            setFeedbackInfo({ type: 'success', message: 'Contact has beed changed!'})
            
           
        } catch (error) {
            console.log(error.message);
            setShowFeedback(true)
            setFeedbackInfo({ type: 'danger', message: error.message})
        }
    }

    const handleEditButtonClick = id => {
        setContacts(contacts.map(contact => contact.id === id ? {...contact, editable: !contact.editable} : contact))
    }
    
    const handleDeleteButtonClick = async id => {
        try {
            const response = await axios.delete(`/contacts/${id}`)
            console.log(response.data);
            setShowFeedback(true)
            setFeedbackInfo({ type: 'success', message: 'Contact has beed deleted!'})
        } catch (error) {
            console.log(error.message);
            setShowFeedback(true)
            setFeedbackInfo({ type: 'danger', message: error.message})
        }
        setContacts(contacts.filter(contact => contact.id !== id))
    }

    const [filter, setFilter] = useState('')
    const handleFilterChange = event => {
        setFilter(event.target.value)
    }

    return (
        <div className="contacts">
            <h3 className="contacts__header">Contacts list</h3>
            <div className="contacts__top">
            <div className="contacts__filter">
                <GoSearch className="contacts__filter__icon"/>
                <TextField name='filter' value={filter} editable={true} onChange={(event) => handleFilterChange(event)} />  
            </div>
            <button className="contacts__add-btn" onClick={() => setShowPopup(true)}><MdAdd /> Add new contact</button>
            </div>

            <ul className="contacts__list">
            {contacts.filter(contact => Object.values(contact).some(value => String(value).includes(filter))).map((contact, idx) => {
                const { id, name, number, editable=false } = contact
                return (
                    <li key={id} className="contacts__item">
                        <span className="contacts__item__id">{idx + 1}</span>
                        <span className="contacts__item__name">
                            <TextField name='name' value={name} editable={editable} onChange={(event) => handleFieldChange(event, id)} />  
                        </span>
                        <span className="contacts__item__number">
                            <NumberField name='number' value={number}  editable={editable} onChange={(event) => handleFieldChange(event, id)} />  
                        </span>
                        <button className="contacts__item__edit-btn" onClick={() => handleEditButtonClick(id)}>{editable ? <GrFormCheckmark /> : <MdModeEditOutline />} </button>
                        <button className="contacts__item__delete-btn" onClick={() => handleDeleteButtonClick(id)}><MdDelete /></button>
                    </li>
                )
            })}
            </ul>
        </div>
    )
}
