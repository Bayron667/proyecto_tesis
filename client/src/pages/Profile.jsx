import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import parseJwt from '../components/parseJwt';
import '../styles/ProfileStyles.css';
import { useForm } from "react-hook-form";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { uploadFoto } from "../firebase/config";

export const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { register: Validation, handleSubmit: handleUpdateData, setValue: setValueData, formState: { errors: errorsData } } = useForm();
  const { register: ValidationPassword, reset: resetPassword, handleSubmit: handleUpdatePassword, formState: { errors: errorsPassword } } = useForm();

    useEffect(() => {
    const id = parseJwt(localStorage.getItem("token")).id;
    fetch(`http://localhost:3001/user/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
    }).then(response => {
    if (!response.ok) {
        return response.json().then(error => {
            throw new Error(error.message || 'Ocurrió un error inesperado');
        });
    }
    return response.json();
    }).then(result => {
    const userData = result[0];
    setFotoPerfil(userData.foto);
    setValueData("nombre", userData.nombre);
    setValueData("genero", userData.genero);
    setValueData("correo", userData.correo);
    }).catch(err => {
    let errorMessage = err.message;
    if (err.message === 'Failed to fetch') {
        errorMessage = 'No se pudo conectar al servidor. Por favor, verifica tu conexión a internet o inténtalo de nuevo más tarde.';
    }
    Swal.fire({
        title: "<strong>Error!</strong>",
        html: "<i>" + errorMessage + "</i>",
        icon: "error",
        timer: 3000,
    });
    });
    }, [setValueData]);
  
    const deleteAccount = () => {
    const id = parseJwt(localStorage.getItem("token")).id;
    const nombre = parseJwt(localStorage.getItem("token")).nombre;

    Swal.fire({
    title: '¿Confirmar eliminar?',
    html: `<i>¿Desea Eliminar la cuenta ${nombre}?</i>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
    if (result.isConfirmed) {
        fetch(`http://localhost:3001/user/delete/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.message || 'Ocurrió un error inesperado');
                });
            }
            return response.json();
        }).then(result => {
            Swal.fire({
                title: "<strong>Eliminado!</strong>",
                html: "<i>" + result.message + "</i>",
                icon: "success",
                timer: 3000,
            }).then(() => {
                logout();
                navigate("/");
            });
        }).catch(err => {
            let errorMessage = err.message;
            if (err.message === 'Failed to fetch') {
                errorMessage = 'No se pudo conectar al servidor. Por favor, verifica tu conexión a internet o inténtalo de nuevo más tarde.';
            }
            Swal.fire({
                title: "<strong>Error!</strong>",
                html: "<i>" + errorMessage + "</i>",
                icon: "error",
                timer: 3000,
            });
        });
    }
    });
    }

    const updatePassword = (data) => {
        const datos = {
            claveAntigua: data.claveAntigua,
            claveNueva: data.claveNueva,
        };

        const id = parseJwt(localStorage.getItem("token")).id;

        fetch(`http://localhost:3001/user/update/password/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        }).then(response => {
            if (!response.ok) {
                return response.json().then(datos => {
                    throw new Error(datos.message || 'Ocurrió un error inesperado');
                });
            }
            return response.json();
        }).then(result => {
            Swal.fire({
                title: "<strong>Actualizado!</strong>",
                html: "<i>" + result.message + "</i>",
                icon: "success",
                timer: 3000,
            });
            resetPassword();
        }).catch(err => {
            let errorMessage = err.message;
            if (err.message === 'Failed to fetch') {
                errorMessage = 'No se pudo conectar al servidor. Por favor, verifica tu conexión a internet o inténtalo de nuevo más tarde.';
            }
            Swal.fire({
                title: "<strong>Error!</strong>",
                html: "<i>" + errorMessage + "</i>",
                icon: "error",
                timer: 3000,
            });
        });
    }

    const updateData = (data) => {
        const datos = {
            nombre: data.nombre,
            correo: data.correo,
            genero: data.genero
        };

        const id = parseJwt(localStorage.getItem("token")).id;

        fetch(`http://localhost:3001/user/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        }).then(response => {
            if (!response.ok) {
                return response.json().then(datos => {
                    throw new Error(datos.message || 'Ocurrió un error inesperado');
                });
            }
            return response.json();
        }).then(result => {
            Swal.fire({
                title: "<strong>Actualizado!</strong>",
                html: "<i>" + result.message + "</i>",
                icon: "success",
                timer: 3000,
            });
        }).catch(err => {
            let errorMessage = err.message;
            if (err.message === 'Failed to fetch') {
                errorMessage = 'No se pudo conectar al servidor. Por favor, verifica tu conexión a internet o inténtalo de nuevo más tarde.';
            }
            Swal.fire({
                title: "<strong>Error!</strong>",
                html: "<i>" + errorMessage + "</i>",
                icon: "error",
                timer: 3000,
            });
        });
    }

    const handleFileChange = async (e) => {
        const selectedFoto = e.target.files[0];
        const id = parseJwt(localStorage.getItem("token")).id;
        try{
            const fotoUpload = await uploadFoto(selectedFoto)

            fetch(`http://localhost:3001/user/update/foto/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ foto: fotoUpload })
            }).then(response => {
                if (!response.ok) {
                    return response.json().then(datos => {
                        throw new Error(datos.message || 'Ocurrió un error inesperado');
                    });
                }
                return response.json();
            }).then(result => {
                Swal.fire({
                    title: "<strong>Actualizado!</strong>",
                    html: "<i>" + result.message + "</i>",
                    icon: "success",
                    timer: 3000,
                });
                resetPassword();
            }).catch(err => {
                let errorMessage = err.message;
                if (err.message === 'Failed to fetch') {
                    errorMessage = 'No se pudo conectar al servidor. Por favor, verifica tu conexión a internet o inténtalo de nuevo más tarde.';
                }
                Swal.fire({
                    title: "<strong>Error!</strong>",
                    html: "<i>" + errorMessage + "</i>",
                    icon: "error",
                    timer: 3000,
                });
            });
        }catch(error){
            Swal.fire({
                title: "<strong>Error!</strong>",
                html: "<i>Error al cargar la imagen.</i>",
                icon: "error",
                timer: 3000,
              });
        }
    
        const reader = new FileReader();
        reader.onload = () => {
          setFotoPerfil(reader.result);
        };
        if (selectedFoto) {
          reader.readAsDataURL(selectedFoto);
        }
      }

    return (
    <div>
        <div className="card-data-user">
            <div className="sidebar">
                <ul className="sidebar-menu">
                    <li className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>Foto de Perfil</li>
                    <li className={`sidebar-item ${activeTab === 'data' ? 'active' : ''}`} onClick={() => setActiveTab('data')}>Datos</li>
                    <li className={`sidebar-item ${activeTab === 'password' ? 'active' : ''}`} onClick={() => setActiveTab('password')}>Contraseña</li>
                </ul>
            </div>
        <div className="content">
            {activeTab === 'profile' && (
                <div className="profile-section">
                    <h5 className="card-title">{parseJwt(localStorage.getItem("token")).nombre}</h5>
                    <img src={fotoPerfil || "https://cdn-icons-png.flaticon.com/512/6073/6073873.png"} className="profile-img mt-4" alt="Foto de perfil" />
                    <div className="file-upload">
                        <label htmlFor="file-upload" className="button-primary">Elegir Archivo</label>
                        <input id="file-upload" type="file" className="form-control" onChange={handleFileChange} accept="image/*" style={{ display: "none" }} />
                    </div>
                </div>
                )}
            {activeTab === 'data' && (
                <div className="data-section" >
                    <form onSubmit={handleUpdateData(updateData)} >
                        <div className="input-group">
                            <span className="input-group-texts" id="basic-addon1"> Nombre </span>
                            <input type="text" className="form-controls" aria-label="Nombre" aria-describedby="basic-addon1"
                            {...Validation("nombre", { required: {
                            value: true, message: "Nombre es requerido", }, maxLength: 20, minLength: 5, })}/>
                        </div>
                        {errorsData.nombre?.type === "required" && <span className="text-dangers" >Nombre requerido</span>}
                        {errorsData.nombre?.type === "maxLength" && ( <span className="text-dangers" >Nombre no debe ser mayor a 20 caracteres</span>)}
                        {errorsData.nombre?.type === "minLength" && ( <span className="text-dangers" >Nombre debe ser mayor a 5 caracteres</span>)}


                        <div className="input-group mt-3 ">
                            <span className="input-group-texts" id="basic-addon1"> Género </span>
                            <select className="form-controls" {...Validation("genero", { required: "Seleciona una opción de genero" })}>
                                <option value="">Seleccione</option>
                                <option value="1">Hombre</option>
                                <option value="2">Mujer</option>
                                <option value="3">Otro</option>
                            </select>
                        </div>
                        {errorsData.genero && <span className="text-dangers">{errorsData.genero.message}</span>}

                        <div className="input-group mt-3">
                            <span className="input-group-texts" id="basic-addon1"> Correo </span>
                            <input {...Validation("correo", { required: { value: true, message: "Correo es requerido", }, pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: "Correo no válido", }, })}
                                type="email"
                                className="form-controls"
                                aria-label="Correo"
                                aria-describedby="basic-addon1"
                            />
                        </div>
                        {errorsData.correo && <span className="text-dangers">{errorsData.correo.message}</span>}

                        <div className="buttons">
                            <button className="button-primary " type="submit">
                                Actualizar datos
                            </button>
                            <button className="button-danger mt-3" type="button" onClick={deleteAccount}>
                                Eliminar cuenta
                            </button>
                        </div>
                    </form>
                </div>
                )}
            {activeTab === 'password' && (
                
                <div className="password-section">
                    <h5>Cambiar Contraseña</h5>
                    <form onSubmit={handleUpdatePassword(updatePassword)}>
                        <div className="input-group mt-3">
                            <span className="input-group-texts">Contraseña Actual</span>
                            <input type="password" className="form-controls" aria-describedby="basic-addon1"
                            {...ValidationPassword("claveAntigua", { required: {
                            value: true, message: "La contraseña es requerida", }, maxLength: 20, minLength: 6, })}/>
                        </div>
                        {errorsPassword.claveAntigua?.type === "required" && <span className="text-dangers" >Contraseña requerida</span>}
                        {errorsPassword.claveAntigua?.type === "maxLength" && ( <span className="text-dangers" >La contraseña no debe ser mayor a 20 caracteres</span>)}
                        {errorsPassword.claveAntigua?.type === "minLength" && ( <span className="text-dangers" >La contraseña debe ser mayor a 6 caracteres</span>)}
                        
                        <div className="input-group mt-3">
                            <span className="input-group-texts">Contraseña Nueva</span>
                            <input type="password" className="form-controls" aria-describedby="basic-addon1"
                            {...ValidationPassword("claveNueva", { required: {
                            value: true, message: "La contraseña nueva es requerida", }, maxLength: 20, minLength: 6, })}/>
                        </div>
                        {errorsPassword.claveNueva?.type === "required" && <span className="text-dangers" >Contraseña nueva requerida</span>}
                        {errorsPassword.claveNueva?.type === "maxLength" && ( <span className="text-dangers" >La contraseña nueva no debe ser mayor a 20 caracteres</span>)}
                        {errorsPassword.claveNueva?.type === "minLength" && ( <span className="text-dangers" >La contraseña nueva debe ser mayor a 6 caracteres</span>)}
                        
                        <div className="buttons">
                            <button className="button-primary " type="submit">
                                Actualizar Contraseña
                            </button>
                        </div>

                    </form>
                </div>
            )}
            </div>
        </div>
    </div>
    )
}
