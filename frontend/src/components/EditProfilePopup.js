import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, textButton }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
          name: name,
          about: description,
        });
      }

    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            textButton={textButton}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input className="popup__input popup__input_type_name" id="name-input" type="text" name="name" value={name || ''} onChange={event => setName(event.target.value)}  placeholder="Имя" required />
            <input className="popup__input popup__input_type_profession" id="profession-input" type="text" name="profession" value={description || ''} onChange={event => setDescription(event.target.value)}  placeholder="О себе" required />
        </PopupWithForm>
    )
}

export default EditProfilePopup;