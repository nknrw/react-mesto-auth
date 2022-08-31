import { useEffect } from 'react';
import success from '../images/Success.svg';
import failure from '../images/Failure.svg';

export default function InfoTooltip(props) {
    const className = `popup popup_info-tooltip ${props.isOpen && "popup_active"}`;
    useEffect(() => {
		const handleEscClose = (e) => {
			if (e.key === "Escape") {
			  props.onClose();
			}
		};
			if (props.isOpen) {
				document.addEventListener("keydown", handleEscClose);
			} else {
				document.removeEventListener("keydown", handleEscClose);
			}
	}, [props.isOpen, props.onClose]);

    return (
        <div className={className}>
            <div className="popup__container">
                <img className="popup__icon" src={props.isRegistred ? success : failure} alt="Информация" />
                <p className="popup__text">{props.isRegistred ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
                <button className="popup__close-button" type="button" onClick={props.onClose} />
            </div>
        </div>
    )
}