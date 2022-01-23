import '../App.css';
import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import api from "../utils/api";
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoToolTip from './InfoToolTip';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {
  const history = useHistory();
  const token = localStorage.getItem('token');
  console.log("token from App",token);
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  
  const [textHeaderLink, setTextHeaderLink] = useState("");
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [iconMessage, setIconMessage] = useState("");
  const [textMessage, setTextMessage] = useState("");
  const [cards , setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    {
      // name: 'Vera Lea', 
      // about: 'Teacher', 
      // avatar: 'https://cdn.pixabay.com/photo/2018/01/17/07/06/laptop-3087585_960_720.jpg', 
      // // _id: 'c77e00360c598eb801029d0f', 
      // cohort: 'group-12'
    }
  );

  // useEffect(() => {
  //   api.getCards()    
  //   .then((result) => {
  //       setCards(result);
  //   })
  //   .catch((err) => console.log(err))
  // },[]);

  useEffect(() => {
    api.getUserInfo()    
    .then((result) => {
      setCurrentUser(result); 
    })
    .catch((err) => console.log(err));
  },[]);

  function handleRegisterSubmit({ icon,text }) {
    setIconMessage(icon);
    setTextMessage(text); 
    setIsInfoToolTipOpen(true);      
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard(null);
    if (isRegistered && window.location.href.includes("/signup")) {
      history.push('/signin');
    }
  }

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', closeByEscape);  
    return () => document.removeEventListener('keydown', closeByEscape);
}, [])


  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({name, about}) {
    api.setUserInfo({name, about})
    .then((result) => {
      setCurrentUser(result);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar)
    .then((result) => {
      setCurrentUser(result);
      closeAllPopups();    
    })
    .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikes(card._id, !isLiked ? "PUT" : "DELETE").then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    })
    .catch((err) => console.log(err));   
  }

  function handleAddPlaceSubmit(cardData) { 
    api.addNewCard({cardData})
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleLogin(e,email) {
    e.preventDefault();
    localStorage.setItem('email',email);
    localStorage.setItem('isLoggedIn',true);
    updateHeader('Log out');
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('isLoggedIn');
    updateHeader('Sign up');
  }

  function register(e,email, password) {
    e.preventDefault();
    auth.register(email, password).then((res) => {
      console.log("yes");
      handleRegisterSubmit(
        {
          icon:"popup__icon", 
          text:"Success! You have now been registered."
        });     
      setIsRegistered(true); 
    })
    .catch((err) => {
      console.log(err);
      handleRegisterSubmit(
        {
          icon:"popup__icon_unsuccess", 
          text: "Oops, something went wrong! Please try again."
        });
      setIsRegistered(false);   
    });    
  }

  function authorize(e,email, password) {
    e.preventDefault();
    auth.authorize(email, password)
    .then(result => result.json())
    .then((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('isLoggedIn', true);
        handleLogin(e,email);
        history.push('/');
        updateHeader("Log out");
    })
    .catch((err) => {
      handleRegisterSubmit(
        {
          icon:"popup__icon_unsuccess", 
          text: "Oops, something went wrong! Please try again."
        });
    });  
  }

  useEffect(() => {
    
     if (token) {
      console.log("last useEffect is token");
      console.log("token from last useEffect", token);
       auth.getContent(token)
       .then(result => result.json())
       .then((res) => {
        console.log("is res from getContent", res);
    //     localStorage.setItem('email',res.data.email);
       })
       .catch((err) => {
        console.log("no res from getContent", err);
    //     handleRegisterSubmit(
    //       {
    //         icon:"popup__icon_unsuccess", 
    //         // text: "Oops, something went wrong! Please try again."
    //         text: "error from last useEffect"
    //       });
       });
     }else {
      console.log("last useEffect no token");
    //   localStorage.removeItem('email');
     }
  },[]);

  function updateHeader(text) {
    setTextHeaderLink(text); 
  }


  useEffect(() => {
    if (token) {
      updateHeader("Log out");
    } else {
      if (document.location.pathname.includes("signup")) {
        updateHeader("Log in");
      } else if (document.location.pathname.includes("signin")) {
        updateHeader("Sign up");
      }
    }

  },[token]);

  return (
    <div className="page">
      <div className="page__content">       
        <CurrentUserContext.Provider value={currentUser}>
          <Header 
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            textHeaderLink={textHeaderLink}
            updateHeader={updateHeader}
          />
          <Switch>
             <ProtectedRoute
              exact
              path="/" 
              isLoggedIn={isLoggedIn} 
              onEditProfileClick={handleEditProfileClick} 
              onAddPlaceClick={handleAddPlaceClick}
              onEditAvatarClick={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              component={Main}
            />
            
            <Route exact path="/signup">
              <Register
                title="Sign up"
                buttonText="Sign up"
                updateHeader={updateHeader}
                register={register}
              />
            </Route>
            <Route exact path="/signin">
              <Login
                title="Log in"
                buttonText="Log in"
                updateHeader={updateHeader}
                authorize={authorize}           
              />
            </Route>
            <Route exact path="/">
              { isLoggedIn ? <Redirect to="/"/> : <Redirect to="/signin" />}
            </Route>
          </Switch>
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          /> 
          <PopupWithForm 
              name='delete' 
              title='Are you sure?' 
              isOpen={false}
              onClose={closeAllPopups}
              buttonText='Yes'
          />
          <ImagePopup 
            card={selectedCard}
            isOpen={selectedCard ? true : false}
            onClose={closeAllPopups}
          />
          <InfoToolTip
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
            iconMessage={iconMessage}
            textMessage={textMessage}
          />          
          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
