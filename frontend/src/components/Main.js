import { useContext } from 'react';
import Card from './Card'; 
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext); 

  return(
    <main className="main">  
        <section className="profile">
            <div 
                className="profile__avatar" 
                onClick={props.onEditAvatarClick}
                style={{ backgroundImage: `url(${currentUser.avatar})` }}
            >
              <div className="profile__avatar-cover"></div>    
            </div>
            <div className="profile__title">
              <span className="profile__name">{currentUser.name}</span>
              <button className="button profile__edit-button" aria-label="edit button"
                  onClick={props.onEditProfileClick}>
              <div className="profile__edit-image"></div>
              </button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
            <button className="button profile__add-button" aria-label="add button" 
              onClick={props.onAddPlaceClick}>
              <div className="profile__add-image"></div>
            </button>
        </section>
        <section>
          <ul className="cards-grid">
            {
              props.cards.map((card) => {
                return(
                  <Card 
                    key={card._id} 
                    card={card} 
                    onCardClick={props.onCardClick}
                    onCardLike={(e) => props.onCardLike(card)}
                    onCardDelete={(e) => props.onCardDelete(card)}
                  />
                );
              })
            }
          </ul>
        </section>
    </main> 
  );
}

export default Main