import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import ProfileButton from "../components/Navigation/ProfileButton";
import "./Layout.css"; // Import the CSS file

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <Navigation />
        <div className="layout-container">
          {/* Check if the session is loaded */}
          {isLoaded && (
            <>
              <nav>
                <ProfileButton /> {/* Display the ProfileButton */}
              </nav>
              <main className="main-content">
                <Outlet /> {/* Render child routes */}
              </main>
            </>
          )}
        </div>
        <Modal /> {/* Render the modal here */}
      </ModalProvider>
    </>
  );
}
