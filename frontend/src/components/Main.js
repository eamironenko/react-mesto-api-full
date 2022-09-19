import React from "react";
//import avatar from '../images/Kusto.svg';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-border">
            <button className="profile__avatar-button" type="button" area-label="Редактировать фото" onClick={props.onEditAvatar}></button>
            <img className="profile__avatar" src={currentUser.avatar} alt="Фото пользователя" />
          </div>
          <div className="profile__info">
            <div className="profile__name-edit">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        {props.cards.map((item, i) => (
          <Card card={item}
            key={item._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete} />
        ))
        }
      </section>
    </main>
  )
}

export default Main;