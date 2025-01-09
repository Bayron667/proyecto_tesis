import '../styles/LoginStyles.css'
import React, { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import parseJwt from "../components/parseJwt";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { AuthContext } from '../context/AuthContext';

export const Login = () => {
  const { login } = useContext(AuthContext);

  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: errorsRegister },
    reset: resetRegister,
  } = useForm({
    defaultValues: {
      nombre: "",
      correo: "",
      password: "",
      genero: "",
      pregunta_seguridad: "",
      respuesta_seguridad: "",
    },
  });

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
    reset: resetLogin,
  } = useForm({
    defaultValues: {
      correo: "",
      password: "",
    },
  });


  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate("");

  let token = parseJwt(localStorage.getItem('token')).exp * 1000 >  Date.now();

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleLogin = handleSubmitLogin((data) => {

    const datos = {
      correo: data.correo,
      password: data.password
    };
    // Mostrar alerta de carga
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor, espere',
      icon: 'info',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    fetch('http://localhost:3001/login',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
    }, body: JSON.stringify(datos) }).then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message || 'Ocurrió un error inesperado');
        });
      }
      return response.json(); })
    .then(result => {
      if(result.token) {
        login(result.token);
        Swal.fire({
          title: "<strong>Inicio de Sesión Exitoso!</strong>",
          html: "<i>¡Bienvenido " + parseJwt(result.token).nombre + "!</i>",
          icon: "success",
          timer: 3000,
        });
        resetLogin();
        navigate('/dashboard');
      }
    }).catch(err => {
      let errorMessage = err.message;
      if (err.message === 'Failed to fetch') {
        errorMessage = 'No se pudo conectar al servidor. Por favor, verifica tu conexión a internet o inténtalo de nuevo más tarde.';
      }
      Swal.fire({
        title: "<strong>Error!</strong>",
        html: "<i>"+errorMessage+"</i>",
        icon: "error",
        timer: 3000,
      });
      
    });
  })

  const handleRegister = handleSubmitRegister((data) =>{
    
    const datos = {
      nombre: data.nombre,
      genero: data.genero,
      correo: data.correo,
      password: data.password,
      pregunta_seguridad: data.pregunta_seguridad,
      respuesta_seguridad: data.respuesta_seguridad
    };

    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor, espere',
      icon: 'info',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    
    fetch('http://localhost:3001/create',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    }).then(response => {
      if (!response.ok) {
        return response.json().then(datos => {
            throw new Error(datos.message || 'Ocurrió un error inesperado');
        });
    }
    return response.json() })
    .then(result => {
      Swal.fire({
        title: "<strong>Bienvenido!</strong>",
        html: "<i>" + result.message + "</i>",
        icon: "success",
        timer: 3000,
    })
      handleLoginClick();
      resetRegister();
    }).catch(err => {
      let errorMessage = err.message;
      if (err.message === 'Failed to fetch') {
        errorMessage = 'No se pudo conectar al servidor. Por favor, verifica tu conexión a internet o inténtalo de nuevo más tarde.';
      }
      Swal.fire({
        title: "<strong>Error!</strong>",
        html: "<i>"+errorMessage+"</i>",
        icon: "error",
        timer: 3000,
      });
      handleRegisterClick();
    });
  })

  return (
    <>{token ? <Navigate to="/dashboard"/>:(
      <div className="login-body">
      <div className={`container ${isActive ? "active" : ""}`} id="container">
        <div className="form-container sign-up">
          <form onSubmit={handleRegister}>
            <h1>Crear cuenta</h1>
              <input type="text" placeholder="Nombre" name="nombre"  {...registerRegister("nombre", { required: {
                value: true, message: "Nombre es requerido", }, maxLength: 20, minLength: 2, })}/>
                {errorsRegister.nombre?.type === "required" && <span>Nombre requerido</span>}
                {errorsRegister.nombre?.type === "maxLength" && ( <span>Nombre no debe ser mayor a 30 caracteres</span>)}
                {errorsRegister.nombre?.type === "minLength" && ( <span>Nombre debe ser mayor a 2 caracteres</span>)}

              <select className="custom-select" name="genero" {...registerRegister("genero", {required: 'Seleciona una opción de genero',})} >
                <option value="" disabled> Seleccione un genero </option>
                <option value="1">Hombre</option>
                <option value="2">Mujer</option>
                <option value="3">Otro</option>
              </select>
              {errorsRegister.genero && <span>{errorsRegister.genero.message}</span>}
    
              <input type="email" placeholder="Email" name="correo" {...registerRegister("correo", { required: { value: true,
                message: "Correo es requerido", }, pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Correo no válido", }, })} />
              {errorsRegister.correo && <span>{errorsRegister.correo.message}</span>}
         
              <input type="password" name="password" placeholder="Contraseña" {...registerRegister("password", { required: {
                    value: true, message: "Contraseña es requerida", }, minLength: { value: 6,
                      message: "Contraseña debe ser mayor a 6 caracteres",},})}/>
              {errorsRegister.password && <span>{errorsRegister.password.message}</span>}

              <input type="text" name="pregunta_seguridad" placeholder="Pregunta de seguridad" {...registerRegister("pregunta_seguridad", { required: {
                    value: true, message: "La pregunta es requerida", }, minLength: { value: 10,
                      message: "La pregunta debe ser mayor a 10 caracteres",},})}/>
              {errorsRegister.pregunta_seguridad && <span>{errorsRegister.pregunta_seguridad.message}</span>}

              <input type="text" name="respuesta_seguridad" placeholder="Respuesta de seguridad" {...registerRegister("respuesta_seguridad", { required: {
                    value: true, message: "La respuesta es requerida", }, minLength: { value: 10,
                      message: "La respuesta debe ser mayor a 10 caracteres",},})}/>
              {errorsRegister.respuesta_seguridad && <span>{errorsRegister.respuesta_seguridad.message}</span>}

            <button type="submit">Registrarse</button>
          </form>
        </div>
        <div className="form-container sign-in">
        
          <form onSubmit={handleLogin}>
            <h1>Iniciar Sesión</h1>
            <input type="email" placeholder="Email" name="correo" {...registerLogin("correo", { required: { value: true,
                message: "Correo es requerido", }, pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Correo no válido", }, })} />
            {errorsLogin.correo && <span>{errorsLogin.correo.message}</span>}

            <input type="password" name="password" placeholder="Contraseña" {...registerLogin("password", { required: {
                value: true, message: "Contraseña es requerida", }, minLength: { value: 6,
                message: "Contraseña debe ser mayor a 6 caracteres",},})}/>
            {errorsLogin.password && <span>{errorsLogin.password.message}</span>}

            <p className="register-link" onClick={handleRegisterClick}>¿Aún no tienes cuenta? Regístrate</p>
            <button type="submit">Iniciar Sesión</button>
          </form>
        
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Bienvenido de nuevo!</h1>
              <p>Obtén respuestas en minutos y termina las tareas escolares más rápido</p>
              <button className="hidden" id="login" onClick={handleLoginClick}>Iniciar Sesión</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Únete a UniLearn</h1>
              <p>Crea una cuenta para ser parte de la comunidad</p>
              <button className="hidden" id="register" onClick={handleRegisterClick}>Registrarse</button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
    )}</>
        
  )
}
