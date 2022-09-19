import React from "react";

function InfoTooltip ( {isOpen, onClose, rejigged, registerYes, registerNo, message}) {
    return (
        <div className={`popup ${isOpen? 'popup_opened' : ''}`} >
            <div className="popup__container">
                <button className="popup__close-button" type="button" onClick={onClose}></button>
                <form className={`popup__content`} name="result">
                    <div className={`${rejigged ? 'popup__regYes': 'popup__regNo'}`}></div>
                    <p className="popup__sign">{rejigged ? registerYes : registerNo}</p>
                    <p className="popup__input-error" style={rejigged ? {display: "none"} : {display: "block"}}>                        
                      {message}
                    </p>
                </form>
            </div>
        </div>
    )
}

export default InfoTooltip;