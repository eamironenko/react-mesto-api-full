import React from "react";
import { useHistory } from 'react-router-dom';
import useInputData from "../utils/useInputData";

const Login = ({onLogin, loginErr, error}) =>{
    const [values, setValues, handleChange] = useInputData();
    const history = useHistory();

    React.useEffect(()=>{
        setValues({
            loginEmail:'', 
            loginPassword:''})
    }, []);
      
    const handleSubmit = (e) =>{
        e.preventDefault();
        onLogin({
            email: values.loginEmail, 
            password: values.loginPassword
        })
    }

    return (
        <form className="popup__content popup__content_auth" onSubmit={handleSubmit}>
            <h3 className="popup__title popup__title_auth">Вход</h3>
            <input
                className="popup__input popup__input_auth"
                id="userEmail"
                name="loginEmail"
                type="email"
                value={values.loginEmail || ''}
                onChange={handleChange}
                placeholder="Email"
                required />
            <input
                className="popup__input popup__input_auth"
                id="userPassword"
                name="loginPassword"
                type="password"
                value={values.loginPassword || ''}
                onChange={handleChange}
                placeholder="Password"
                required />
            <p className="popup__input-error" style={!loginErr ? { display: "none" }  :  {display: "block" }} >{error}</p>
            <button className="popup__save-button popup__save-button_auth" type="submit">Войти</button>
        </form>
    )
}

export default Login;