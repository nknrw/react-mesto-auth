import React from "react";

export default function ImagePopup({ card, onClose }) {
	const className = `popup popup_fullscreen ${card && "popup_active"}`;

	return (
		<div
			className={className}
			onClick={onClose}>
			<div
				className="popup__image-container"
				onClick={(event) => {
				event.stopPropagation();
				}}>
				<figure className="popup__figure">
					<button
						className="popup__close-button"
						type="button"
						onClick={onClose}
					>
					</button>
					<img
						className="popup__image"
						src={card?.link}
						alt={card?.name}
					/>
					<figcaption className="popup__caption">{card ? card.name : ``}</figcaption>
				</figure>
			</div>
		</div>
	);
}