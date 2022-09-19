import React from "react";

function ImagePopup({data, onClose}) {
    return (
        <div className={`popup popup_image ${Object.keys(data).length && 'popup_opened'}`}>
            <div className="popup__container-photo">
                <button className="popup__close-button" type="button" onClick={onClose}></button>
                <img className="popup__photo" alt={data.name} src={data.link} />
                <p className="popup__photo-title">{data.name}</p>
            </div>
        </div>

    )
}
export default ImagePopup;