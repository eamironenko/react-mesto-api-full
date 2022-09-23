import React from 'react';
import { api } from '../utils/Api.js'
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';
import * as auth from '../utils/auth.js'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [deletedCard, setDeletedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  //--------авторизация
  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [rejigged, setRejigged] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [loginErr, setLoginErr] = React.useState(false);
  const history = useHistory();

  //--------кнопки
  const [isTextButtonSave, setIsTextButtonSave] = React.useState('Сохранить');
  const [isTextButtonAdd, setIsTextButtonAdd] = React.useState('Создать');
  const [isTextButtonDel, setIsTextButtonDel] = React.useState('Да');

  //---------popups
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarOpen(true);
  }
  const handleCardClick = (data) => {   //кликаем - получаем данные карточки
    setSelectedCard(data);
  }
  const handleButtonDelete = (data) => {
    setIsDeletePopupOpen(true);
    setDeletedCard(data)
  }
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltip(false);
  }
  //---------------------
  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setStatusToken(jwt);
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/')
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInformation(), api.getInitialCards()])
        .then(([userData, cardData]) => {
          setCurrentUser(userData.data);
          setCards(cardData.data);
        })
        .catch((err) => { console.log(err) })
    }
  }, [loggedIn])

  //----------------------
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.handleLikeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
      })
      .then(() => closeAllPopups())
      .catch((err) => { console.log(err) })
  }

  function handleDeleteCard(card) {
    setIsTextButtonDel('Удаление...')
    api.handleDeleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .then(() => closeAllPopups())
      .catch((err) => { console.log(err) })
      .finally(() => { setIsTextButtonDel('Да') })
  }

  function handleUpdateUser(formData) {
    setIsTextButtonSave('Сохранение...')
    api.editProfileForm(formData)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .then(() => closeAllPopups())
      .catch((err) => { console.log(err) })
      .finally(() => { setIsTextButtonSave('Сохранить') })
  }

  function handleUpdateAvatar(formData) {
    setIsTextButtonSave('Сохранение...')
    api.editUserAvatar(formData)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .then(() => closeAllPopups())
      .catch((err) => { console.log(err) })
      .finally(() => { setIsTextButtonSave('Сохранить') })
  }

  function handleAddNewCard(newCard) {
    setIsTextButtonAdd('Сохранение...')
    api.addNewCard(newCard)
      .then((res) => {
        setCards([res.data, ...cards])
      })
      .then(() => closeAllPopups())
      .catch((err) => { console.log(err) })
      .finally(() => { setIsTextButtonAdd('Создать') })
  }

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    handleDeleteCard(deletedCard);
  }

  //------------------------
  const onRegister = ({ email, password }) => {
    return auth.register(email, password)
      .then((res) => {
        if (res.error) {
          setMessage(res.error);
          setRejigged(false);
          history.push('/sign-up')
        } else {
          setRejigged(true);
          setMessage('');
          history.push('/sign-in')
        }
      })
      .catch((err) => { 
        console.log(err);
        
      })
      .finally(() => { setIsInfoTooltip(true)})
  }

  const onLogin = ({ email, password }) => {
    return auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setLoginErr(false);
          history.push('/');
        } else {
          setLoginErr(true);
          setLoggedIn(false);
        }
      })
      .catch((err) => { console.log(err) })
      .finally(() => { setIsInfoTooltip(true)})
  }

  const setStatusToken = (jwt) => {
    auth.checkToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserInfo(res.data.email);
        } else {
          setLoggedIn(false);
        }
      })
      .catch((err) => { console.log(err) })
  }

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setUserInfo('');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>      
        <Header loggedIn={loggedIn} userInfo={userInfo} onSignOut={onSignOut} />
        <Switch>
          <Route path="/sign-up">
            <Register onRegister={onRegister} />
          </Route>

          <Route path="/sign-in">
            <Login onLogin={onLogin} loginErr={loginErr} error={'Неверный email или пароль'} />
          </Route>

          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleButtonDelete}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            component={Main}
          />
          <Route path="*">
            <Redirect to="/sign-in" />
          </Route>
        </Switch>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          textButton={isTextButtonSave}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          textButton={isTextButtonSave}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddNewCard}
          textButton={isTextButtonAdd}
        />

        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          isOpen={isDeletePopupOpen}
          data={deletedCard}
          onClose={closeAllPopups}
          textButton={isTextButtonDel}
          onSubmit={handleSubmitDelete}
        />

        <ImagePopup
          data={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltip}
          onClose={closeAllPopups}
          rejigged={rejigged}
          message={message}
          registerYes="Вы успешно зарегистрировались!"
          registerNo="Что-то пошло не так! Попробуйте еще раз."
        />

        <Footer />
      </CurrentUserContext.Provider>
    </div >
  );
};

export default App;