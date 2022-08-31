import React from "react";
import { Link, withRouter } from "react-router-dom";
// import auth from "../utils/Auth.js";

function Login(props) {
    const [profileData, setProfileData] = React.useState({
        email: "",
        password: "",
    })

    function handleSubmit(event) {
        event.preventDefault();
        auth.login(profileData)
            .then(() => {
                props.history.push("/");
            }).catch(err => {
                console.log(err);
            }
        )
    }

    function handleChange(event) {
        setProfileData({ ...profileData, [event.target.name]: event.target.value })
    }

    return (
        <section className="auth">
            <div className="auth__container">
                <h1 className="auth__title">Вход</h1>
                <form className="auth__form" onSubmit={handleSubmit}>
                    <input className="auth__input" type="email" name="email" placeholder="Введите email"
                           onChange={handleChange}/>
                    <input className="auth__input" type="password" name="password" placeholder="Введите пароль"
                           onChange={handleChange}/>
                    <button className="auth__submit-button" type="submit">Войти</button>
                </form>
            </div>
        </section>
    )
}

export default withRouter(Login);