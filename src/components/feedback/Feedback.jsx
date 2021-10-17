import React,  { useEffect } from 'react'
import { useGlobalContext } from '../../store/context'
import './feedback.css'

const Feedback = () => {
    const {showFeedback, setShowFeedback, feedbackInfo: { type, message }} = useGlobalContext()
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowFeedback(false)
        }, 3000)   // HIDE FEEDBACK AFTER 5 seconds
        return () => {
            clearTimeout(timeout)
        }
    })

    return (
        <div className={showFeedback ? `feedback show ${type}` : 'feedback'}>
            {message}
        </div>
    )
}

export default Feedback
