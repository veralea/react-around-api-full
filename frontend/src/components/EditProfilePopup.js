import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState("joker")
  
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleJobChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm 
      name='edit' 
      title='Edit profile' 
      buttonText='Save'
      isOpen={props.isOpen} 
      onClose={props.onClose} 
      onSubmit={handleSubmit}
    >
      <input type="text" className="popup__input" onChange = {handleNameChange}
        name="name" value={name} minLength="2" maxLength="40" required />
      <span className="popup__error"></span>
      <input type="text" className="popup__input" onChange = {handleJobChange}
        name="job" value={description} minLength="2" maxLength="200" required />
      <span className="popup__error"></span>
    </PopupWithForm>        
  );
}

export default EditProfilePopup;