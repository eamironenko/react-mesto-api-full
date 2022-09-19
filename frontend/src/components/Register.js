import React from 'react';
import { Link, } from 'react-router-dom';
import useInputData from "../utils/useInputData";

const Register = ({onRegister}) => {
    const [values, setValues, handleChange]=useInputData();

    React.useEffect(()=>{
        setValues({email:'', password:''})
    }, [])

    const handleSubmit=(e) => {
        e.preventDefault();
        onRegister({
            email: values.email,
            password: values.password
        })
    }

    return (
        <form className="popup__content popup__content_auth" onSubmit={handleSubmit}>
            <h3 className="popup__title popup__title_auth">Регистрация</h3>
            <input
                className="popup__input popup__input_auth"
                id="userEmail"
                name="email"
                type="email"
                value={values.email || ''}
                onChange={handleChange}
                placeholder="Email"
                required />
            <input
                className="popup__input popup__input_auth"
                id="userPassword"
                name="password"
                type="password"
                value={values.password || ''}
                onChange={handleChange}
                placeholder="Password"
                required />
            <button className="popup__save-button popup__save-button_auth" type="submit">Зарегистрироваться</button>
            <div>
                <p className='popup__sign popup__sign_auth'>Уже зарегистрированы?
                <Link to='/sign-in' className='popup__sign popup__sign_auth'> Войти</Link>
                </p>
            </div>
        </form>
    )
}

export default Register;