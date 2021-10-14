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

    return <AppContext.Provider value={{
        loggedIn, 
        setLoggedIn
    }}>{children}</AppContext.Provider>
}

const useGlobalContext = () => useContext(AppContext)

export {ContextProvider, useGlobalContext}