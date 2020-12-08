import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from './firebase';
import './Login.css';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer'

const Login = () => {

    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch(err => alert(err.message))
    };

    return (
        <div className="login">
            <div className="login_container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/897px-WhatsApp.svg.png" />
                <div className="login_text">
                    <h1>Sign in to whatsapp</h1>
                </div>
                <Button type="submit" onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login
