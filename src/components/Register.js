import React from "react";
import { Link, withRouter } from "react-router-dom";
// import auth from "../utils/Auth.js";

function Register(props) {
    const [profileData, setProfileData] = React.useState({
        name: "",
        about: "",
        avatar: "",
        email: "",
        password: "",
    })

    function handleSubmit(event) {
        event.preventDefault();
        auth.register(profileData)
            .then(() => {

    return (
        <section className="auth">
            <div className="auth__container">
                <h1 className="auth__title">Регистрация</h1>
                <form className="auth__form" onSubmit={handleSubmit}>
                    <input 
                        className="auth__input" 
                        autoComplete='off' 
                        type="email" 
                        name="email" 
                        placeholder="Email"
                        onChange={handleChange}/>
                    <input 
                        className="auth__input" 
                        autoComplete='off' 
                        type="password" 
                        name="password" 
                        placeholder="Пароль"
                        onChange={handleChange}/>
                    <button className="auth__submit-button" type="submit">Зарегистрироваться</button>
                </form>
                <Link className="auth__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
            </div>
        </section>
    )
}

export default withRouter(Register);