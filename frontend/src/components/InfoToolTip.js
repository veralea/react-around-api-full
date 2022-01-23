function InfoToolTip(props) {
    return(
      <section 
        className={`popup popup_type_msg ${props.isOpen ? 'popup_opened' : ''}`}
      >
        <div className="popup__container">
            <button 
              className="button popup__close-button" 
              aria-label="close button"
              onClick={props.onClose}
            ></button>
            <div className="popup__message-main">
              <div className={props.iconMessage}></div>
              <p className="popup__message">{props.textMessage}</p>
            </div>
        </div>
      </section>         
    );
}

export default InfoToolTip;