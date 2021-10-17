import { createContext, useContext, useState } from "react";
import axios from 'axios';

const AppContext = createContext()

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
if (localStorage && localStorage.token) {
    const access_token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Token ${access_token}`
}
axios.defaults.headers.post['Content-Type'] = 'application/json'

const ContextProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState(localStorage.isLoggedIn || false)
  const [showPopup, setShowPopup] = useState(false)

  const [showFeedback, setShowFeedback] = useState(false)

  const [feedbackInfo, setFeedbackInfo] = useState({ type: '', message: 'Default feedback message' })

  const [contacts, setContacts] = useState([
    // {
    //   "id": 1,
    //   "name": "test name",
    //   "number": 123456,
    //   "editable": false
    // },
])

const getContacts = async () => {
    try {
        const response = await axios.get('/contacts/')
        setContacts(response.data)
        console.log(response.data);
    } catch (error) {
        console.log(error.response);
    }
}
    return <AppContext.Provider value={{
        loggedIn, 
        setLoggedIn,
        showPopup,
        setShowPopup,
        showFeedback,
        setShowFeedback,
        feedbackInfo,
        setFeedbackInfo,
        contacts,
        setContacts,
        getContacts
    }}>{children}</AppContext.Provider>
}

const useGlobalContext = () => useContext(AppContext)

export {ContextProvider, useGlobalContext}