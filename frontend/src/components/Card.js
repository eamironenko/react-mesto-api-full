import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);     

    function handleCardClick() {
        onCardClick(card);
    }
    function handleLikeClick() {
        onCardLike(card);
    }
    function handleDeleteClick() {
        onCardDelete(card)
    }

    const isOwn = card.owner === currentUser._id;
    const cardDeleteButton = (`element__trash ${isOwn ? 'element__trash' : 'element__trash_hidden'}`);
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButton = `element__like ${isLiked ? 'element__like_active' : 'element__like'}`;

    return (
        <article className="element">
            <button className={cardDeleteButton} type="button" onClick={handleDeleteClick}></button>
            <img className="element__photo" src={card.link} alt={`${card.name}`} onClick={handleCardClick} />
            <div className="element__caption">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button className={cardLikeButton} type="button" onClick={handleLikeClick}></button>
                    <span className="element__like-counter" type="text" name="likeCounter">{card.likes.length}</span>
                </div>
            </div>
        </article>
    )
}

export default Card;