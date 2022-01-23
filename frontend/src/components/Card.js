import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
  );

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName  = (
    `button card__like-button ${isLiked ? 'card__like-button_state_liked' : 'card__like-button_state_unliked'}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike();
  }

  function handleDeleteClick() {
    props.onCardDelete();
  }

  return(
    <li className="card" >
      <button 
        type="button" 
        className={cardDeleteButtonClassName}
        aria-label="delete button"
        onClick = {handleDeleteClick}
      ></button>
      <img 
        className="card__picture" 
        src={props.card.link} 
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="card__caption">
        <p className="card__title">{props.card.name}</p>
        <div className="card__like-container">
          <button 
            type="button" 
            className={cardLikeButtonClassName} 
            aria-label="like button"
            onClick={handleLikeClick}
          >
          </button>
          <span className="card__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;