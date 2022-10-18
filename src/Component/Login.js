import { Button } from '@mui/material'
import React from 'react'
import './Login.css'
import { auth, provider } from '../Redux/Firebase'
import { actionTypes } from "../Redux/reducer"
import { useStateValue } from '../Redux/StateProvider'
function Login() {

    const [{ }, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(res => (dispatch({
                type: actionTypes.SET_USER,
                user: res.user.multiFactor.user
            })))
            .catch(err => alert(err));
        // auth.signInWithPopup(provider)
        //     .then(res => console.log(res.user.multiFactor.user))
        //     .catch(err => alert(err));
    }
    return (
        <div className='login'>
            <div className="login__container">
                <img src="https://cdn-icons-png.flaticon.com/512/174/174879.png" alt="" />
                <div className="login__text">
                    <h1>Sign in to WhatsApp Messenger</h1>
                </div>

                <Button type='submit' onClick={signIn}>Sign In With Google</Button>
            </div>
        </div>
    )
}

export default Login