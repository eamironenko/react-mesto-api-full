import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" onClick={props.onClose}></button>
                <form className={`popup__content popup__content_${props.name}`} name={`${props.name}`} onSubmit={props.onSubmit}>
                    <h3 className="popup__title">{props.title}</h3>
                    {props.children}
                    <button className="popup__save-button" type="submit">{props.textButton}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;