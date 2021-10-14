import React from 'react'
import './contacts.css'

export const Contacts = () => {
    const contacts = [
        {
          "id": 1,
          "name": "test name",
          "number": 123456
        }
    ]
    
    
    return (
        <div className="contacts">
            <h3 className="contacts__header">Contacts list</h3>
            <ul className="contacts__list">
            {contacts.map(contact => {
                const { id, name, number } = contact
                return (
                    <li key={id} className="contacts__item">
                        <span className="contacts__item__id">{id}</span>
                        <span className="contacts__item__name">{name}</span>
                        <span className="contacts__item__number">{number}</span>
                    </li>
                )
            })}
            </ul>
        </div>
    )
}
