import '../index.css'
import React, {useEffect, useState} from "react";
import { useHistory, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer'
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';

import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

import * as auth from "../utils/Auth";

export default function App() {
	const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
	const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
	const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

	const [selectedCard, setSelectedCard] = useState(null);
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);

	const [loggedIn, setLoggedIn] = useState(false);
	const [email, setEmail] = useState('');
	const history = useHistory();

	useEffect(() => {
		tokenCheck();
		if (loggedIn) {
			Promise.all([api.getUserInfo(), api.getInitialCards()])
				.then(([userData, initialCards]) => {
					setCurrentUser(userData);
					setCards(initialCards);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [loggedIn]);

	// useEffect(() => {
	// 	api.getInitialCards()
	// 		.then((initialCards) => {
	// 			setCards(initialCards);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, []);

	function handleCardLike(card) {
		const isLiked = card.likes.some((like) => like._id === currentUser._id);
		api.changeLikeCardStatus(card._id, isLiked)
			.then((newCard) => {
				setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
		})
			.catch((err) => {
				console.log(err);
			});
	}
	function handleCardDelete(card) {
		api.deleteCard(card._id).then(() => {
			setCards((state) => state.filter((c) => (c._id !== card._id)));
		})
			.catch((err) => {
				console.log(err);
			});
	}

	// useEffect(() => {
	// 	api.getUserInfo()
	// 		.then(res => {
	// 			setCurrentUser(res);
	// 		}).catch(err => {
	// 			console.log(err);
	// 		}
	// 	)
	// }, []);

	function handleEditAvatarPopupClick() {
		setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
	}

	function handleEditProfilePopupClick() {
		setEditProfilePopupOpen(true);
	}

	function handleAddPlacePopupClick() {
		setAddPlacePopupOpen(true);
	}

	function handleCardClick(card) {
		setSelectedCard(card);
		setIsImagePopupOpen(true);
	}

	function handleUpdateUser(data) {
		api.setUserInfo(data)
			.then(res => {
				setCurrentUser(res);
				closeAllPopups();
			}).catch(err => {
				console.log(err);
			}
		)
	}

	function handleUpdateAvatar(data) {
		api.setUserAvatar(data)
			.then(res => {
				setCurrentUser(res);
				closeAllPopups();
			}).catch(err => {
				console.log(err);
			}
		);
	}

	function handleAddPlace(data) {
		api.addCard(data)
			.then(res => {
				setCards([res, ...cards]);
				closeAllPopups();
			}).catch(err => {
				console.log(err);
			}
		);
	}

	function closeAllPopups(e) {
		setEditAvatarPopupOpen(false);
		setEditProfilePopupOpen(false);
		setAddPlacePopupOpen(false);
		setIsImagePopupOpen(false);
		setSelectedCard(null);
		setIsInfoTooltipOpen(false);
	}

	function handleRegister(email, password) {
		auth.register(email, password)
			.then((res) => {
				setIsInfoTooltipOpen(true);
				history.push('/sign-in');
				console.log(res);				
			})
			.catch((err) => {
				setIsInfoTooltipOpen(true);
				console.log(err);
			});
	}

	function handleLogin(email, password) {
		auth.authorize(email, password)
			.then((res) => {
				setEmail(email);
				localStorage.setItem('jwt', res.token);
				setLoggedIn(true);
				history.push('/');
			})
			.catch((err) => {
				setIsInfoTooltipOpen(true);
				console.log(err);
			});
	}

	function tokenCheck() {
		const jwt = localStorage.getItem('jwt');
		if (jwt) {
			auth.getContent(jwt)
				.then((res) => {
					setLoggedIn(true);
					setEmail(res.data.email);
					history.push('/');
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}

	// function handleSignOut() {
	// 	setLoggedIn(false);
	// 	localStorage.removeItem('jwt');
	// 	history.push('/sign-in');
	// }

    return(
		<CurrentUserContext.Provider value={currentUser}>
			<div className='page'>
				<Header />

				<Switch>
					<ProtectedRoute
						exact path='/'
						component={Main}
						onEditProfile={handleEditProfilePopupClick}
						onEditAvatar={handleEditAvatarPopupClick}
						onAddPlace={handleAddPlacePopupClick}
						onCardClick={handleCardClick}
						cards={cards}
						onCardLike={handleCardLike}
						onCardDelete={handleCardDelete}
						>
					</ProtectedRoute>
					<Route path='/sign-up'>
						<Register onRegister={handleRegister} />
					</Route>
					<Route path='/sign-in'>
						<Login onLogin={handleLogin} />
					</Route>
				</Switch>

				<Footer />

				{/* <!-- Попап редактирования профиля --> */}
				<EditProfilePopup 
					isOpen={isEditProfilePopupOpen} 
					onClose={closeAllPopups} 
					onUpdateUser={handleUpdateUser}
				/>
				{/* <!-- Попап добавления новых карточек --> */}
				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlace}
				/>
				{/* <!-- Попап редактирования аватара --> */}
				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
				/>
				{/* <!-- Попап с картинкой --> */}
				<ImagePopup
					name="popup_fullscreen"
					card={selectedCard}
					isOpen={isImagePopupOpen}
					onClose={closeAllPopups}>
				</ImagePopup>
				{/* Попап удачной или не очень удачной регистрации */}
				<InfoTooltip 
					isOpen={isInfoTooltipOpen}
					onClose={closeAllPopups}
				/>
			</div>
		</CurrentUserContext.Provider>
    )

};

