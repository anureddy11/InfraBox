import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout, thunkLogin } from "../../redux/session"; // Assuming you have thunkLogin for login
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
        setShowLoginForm(false);
        setShowSignupForm(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => {
    setShowMenu(false);
    setShowLoginForm(false);
    setShowSignupForm(false);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(thunkLogin({ email: "demo@aa.io", password: "password" }));
    closeMenu();
  };

  return (
    <>
      <button onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button onClick={() => setShowLoginForm(!showLoginForm)}>
                  Log In
                </button>
                {showLoginForm && (
                  <div className="form-container">
                    <LoginFormModal closeForm={closeMenu} />
                  </div>
                )}
              </li>
              <li>
                <button onClick={() => setShowSignupForm(!showSignupForm)}>
                  Sign Up
                </button>
                {showSignupForm && (
                  <div className="form-container">
                    <SignupFormModal closeForm={closeMenu} />
                  </div>
                )}
              </li>
              <li>
                <button onClick={demoLogin}>Login as Demo</button>
              </li>
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
