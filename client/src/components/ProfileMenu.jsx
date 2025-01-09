import React, { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/ProfileMenuStyles.css';

export const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const menuRef = useRef(null);
  
    const handleToggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    const handleLogout = () => {
      logout();
      navigate('/login');
    };

    const irPrefil = () =>{
      navigate('/profile');
    }
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  return (
    <div className="profile-menu" ref={menuRef}>
    <img
      src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
      alt="Foto de perfil"
      className="profile-picture"
      onClick={handleToggleMenu}
    />
    {isOpen && (
      <div className="profile-dropdown">
        <button className="profile-dropdown-item" onClick={irPrefil}>
            <Link>Configurar perfil</Link>
        </button>
        <button className="profile-dropdown-item" onClick={handleLogout}>Salir</button>
      </div>
    )}
    <div className="profile-buttons">
      <button className="profile-button" onClick={irPrefil}>Configurar perfil</button>
      <button className="profile-button" onClick={handleLogout}>Salir</button>
    </div>
  </div>
  )
}

