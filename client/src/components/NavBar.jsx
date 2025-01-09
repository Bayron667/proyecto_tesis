import { Link} from 'react-router-dom';
import logo from "../images/logoImagen.png";
import "../styles/NavBarStyles.css";
import { BurguerButton } from "./BurguerButton";
import React, { useState, useContext  } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ProfileMenu } from './ProfileMenu';

export const NavBar = () => {
  const { isAuthenticated} = useContext(AuthContext);
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    //cuando esta true lo pasa a false y vice versa
    setClicked(!clicked);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <>{isAuthenticated ? (
          <Link className="navbar-brand" to="/dashboard">
            <img src={logo} alt="Logo" className="logo-img" />
          </Link>
        ):(
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" className="logo-img" />
          </Link>
        )}
        </>
        <div className="d-lg-none">
          <BurguerButton handleClick={handleClick} clicked={clicked} />
        </div>
        <div className={`collapse navbar-collapse ${clicked ? "show" : ""}`}>
          <div className="navbar-nav ms-auto mb-2 mb-lg-0">

            {isAuthenticated ? (
              <>
                <ProfileMenu />
              </>
              ) : (
                <>
                  <Link className="nav-link" onClick={handleClick} to="/"> Inicio </Link>
                  <Link className="nav-link" onClick={handleClick} to="/login"> Iniciar sesión </Link>
                </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
