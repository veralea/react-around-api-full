import { withRouter } from 'react-router-dom';

function Header({...props}) {
  function handleClick(e) {
    e.preventDefault();
    if (props.isLoggedIn) {
      props.handleLogout();
      props.history.push("/signin");
      props.updateHeader("Sign up");
    } else {
      if (document.location.pathname.includes("signup")) {
        props.history.push("/signin");
        props.updateHeader("Sign up");
      } else if (document.location.pathname.includes("signin")) {
        props.history.push("/signup");
        props.updateHeader("Log in");
      }
    }
  }
  
  return (
    <header className="header">
        <div className="header__logo"></div>
        <div className="header__content">
          <div className="header__email">{localStorage.getItem("email") || ""}</div>
          {
            <span className="header__link" onClick={handleClick}>
              {props.textHeaderLink}
            </span>
          }
        </div>
    </header>
  );
}

export default withRouter(Header);