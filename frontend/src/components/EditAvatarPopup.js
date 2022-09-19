import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, textButton }) {
    const currentUser = React.useContext(CurrentUserContext);
    const avatar = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatar.current.value);
    }

    React.useEffect(() => {
        avatar.current.value = '';
      }, [isOpen])

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            textButton={textButton}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input className="popup__input popup__input_type_link" id="link-avatar" type="url" name="avatar" ref={avatar} placeholder="Ссылка на фото" required />
        </PopupWithForm>
    )
}
export default EditAvatarPopup;