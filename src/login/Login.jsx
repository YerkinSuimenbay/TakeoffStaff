import React, { useEffect, useRef, useState } from 'react'
import Text from '../components/text/Text'
import './login.css'
import axios from 'axios'
import { useGlobalContext } from '../store/context'

const Login = () => {
    const fetch = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/users', {
                "username": "admin",
                "password": "adminadmin"
              })
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const { setLoggedIn, setFeedbackInfo, setShowFeedback } = useGlobalContext()
    
    // const [response, setResponse] = useState(undefined);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const handleChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const login = async (event) => {
        event.preventDefault()
        console.log('LOGGING IN...');
        
        try {
            const areAllFieldsFilled = Object.keys(formData).every(accessor => !!formData[accessor])
            if (!areAllFieldsFilled) {
                throw new Error('Please fill all fields!')
            }
            
            setLoading(true)
            const response = await axios.post('/auth/', formData)
            console.log(response.data);
            // localStorage.setItem('token', response.data.token)
            // axios.defaults.headers.common['Authorization'] = `Token ${localStorage.token}`
            localStorage.setItem('isLoggedIn', true)
            setLoggedIn(true)
        } catch (error) {
            if (error.message === 'Please fill all fields!') {
                // setFeedbackInfo({ type: 'danger', message: 'Пожалуйста, заполните все поля!' })
                // setShowFeedback(true)
            } else if (error.response) {
                console.log(error.response);
                // setError(error.response.data)
                // setFeedbackInfo({ type: 'danger', message: error.response.data.non_field_errors })
                // setShowFeedback(true)

            }
        } finally {
            setLoading(false)
        }
    }
    
    // if (loading) {
    //     return <div>Loading...</div>
    // }

    // if (error) {
    //     return <div>Error...
    //         <pre>{JSON.stringify(error, null, 2)}</pre>
    //     </div>
    // }

    // useEffect(() => {
    //     let inputs = document.querySelectorAll('input')
    //     [...inputs].forEach(input => {
    //         console.log(input);
    //     })
    // }, [])
    
    return (
        <div className="login">
            <h1 className="login__logo"><span className="login__logo__yellow">Takeoff</span>Staff</h1>
            <div className="login__center">
                <h2 className="login__center__title">Вход в систему</h2>
                <form className="login__center__form" autoComplete="off">
                    <Text type="text" label="Username" name="username" value={formData.username} onChange={handleChange} />
                    <Text type="password" label="Password" name="password" value={formData.password} onChange={handleChange}  />
                    {/* <button className="login__center__login-btn button" type="submit" onClick={loading ? () => {} : login}>Log In</button> */}
                    <button className="login__center__login-btn button" type="submit" onClick={loading ? () => {} : login}>Log In</button>
                </form>
            </div>
        </div>
    )
}

export default Login
