function PopupWithForm(props) { 
    return (
        <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
            <button 
                className="button popup__close-button" 
                aria-label="close button"
                onClick={props.onClose}
            ></button>
            <form className={`popup__form popup__form_type_${props.name}`} onSubmit={props.onSubmit}>
            <h2 className="popup__title">{`${props.title}`}</h2>
            {props.children}
            <button type="submit" name="submit"
                className="button popup__button popup__button">
                {props.buttonText}
            </button>
            </form>
        </div>
        </section>

    );
}

export default PopupWithForm;