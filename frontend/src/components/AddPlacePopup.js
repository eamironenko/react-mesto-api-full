import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, textButton }) {
    const [cardName, setCardName] = React.useState('')
    const [cardLink, setCardLink] = React.useState('')

    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: cardName,
            link: cardLink,
        })
    }

    function handleNameChange(e) {
        setCardName(e.target.value)
    }

    function handleLinkChange(e) {
        setCardLink(e.target.value)
    }

    React.useEffect(() => {
        setCardName ('');
        setCardLink ('');
    }, [isOpen])

    return (
        <PopupWithForm
            name="add"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            textButton={textButton}
            onSubmit={handleAddPlaceSubmit}
        >
            <input className="popup__input popup__input_type_place" id="place-input" type="text" name="place" onChange={handleNameChange} value={cardName || ''} placeholder="Название" required />
            <input className="popup__input popup__input_type_link" id="link-input" type="url" name="link" onChange={handleLinkChange} value={cardLink || ''} placeholder="Ссылка на картинку" required />
        </PopupWithForm>
    )
}

export default AddPlacePopup;