import logo from '../images/logo.svg'
import {Link, BrowserRouter} from "react-router-dom";

export default function Header() {
    return(
        <header className="header">
			<img className="header__logo" src={logo} alt="Логотип" />
                <Link className="header__link" to="/sign-up"><h2>Регистрация</h2></Link>
		</header>
    )
}