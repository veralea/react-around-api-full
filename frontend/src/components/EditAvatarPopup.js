import PopupWithForm from "./PopupWithForm";
import { useRef } from 'react';

function EditAvatarPopup(props) {
  const avatarRef = useRef('https://cdn.pixabay.com/photo/2018/01/17/07/06/laptop-3087585_960_720.jpg');
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  }

  
  return (
    <PopupWithForm 
      name='update-avatar' 
      title='Change profile picture' 
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText='Save'
      onSubmit={handleSubmit}
    >  
      <input 
        type="url" 
        className="popup__input"
        ref={avatarRef} 
        name="avatar"     
        placeholder="Avatar link" required />
      <span className="popup__error"></span>    
    </PopupWithForm>
  );
}

export default EditAvatarPopup;