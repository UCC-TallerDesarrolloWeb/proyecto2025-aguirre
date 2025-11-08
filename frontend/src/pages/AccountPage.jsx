import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Button from '@components/Button'; // Componente Genérico

const AccountPage = () => {
    // Requisito: useState y useNavigate
    const [isLoginPanel, setIsLoginPanel] = useState(true);
    const [loginForm, setLoginForm] = useState({email: '', password: ''});
    const [registerForm, setRegisterForm] = useState({name: '', email: '', password: '', confirmPassword: ''});
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('error');
    const navigate = useNavigate(); // Requisito: useNavigate

    const showPanel = (isLogin) => {
        setIsLoginPanel(isLogin);
        setMessage('');
    };

    // Requisito: Validaciones en tiempo real (manejo de estado)
    const handleRegisterChange = (e) => {
        setRegisterForm({...registerForm, [e.target.name]: e.target.value});
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const {name, email, password, confirmPassword} = registerForm;
        const storedUsers = JSON.parse(localStorage.getItem('theraUsers')) || {};

        if (password.length < 6) {
            setMessage("Error: La contraseña debe tener al menos 6 caracteres.");
            setMessageType('error');
            return;
        }
        if (password !== confirmPassword) {
            setMessage("Error: Las contraseñas no coinciden.");
            setMessageType('error');
            return;
        }

        if (storedUsers[email.toLowerCase()]) {
            setMessage("Error: Este correo electrónico ya está registrado.");
            setMessageType('error');
            return;
        }

        // Requisito: Guardar algún dato en localStorage
        storedUsers[email.toLowerCase()] = {name, password};
        localStorage.setItem('theraUsers', JSON.stringify(storedUsers));

        setMessage(`¡Registro exitoso para ${name}! Redireccionando a Login...`);
        setMessageType('success');
        setRegisterForm({name: '', email: '', password: '', confirmPassword: ''});

        setTimeout(() => {
            showPanel(true);
            setMessage('');
        }, 2000);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const {email, password} = loginForm;
        const storedUsers = JSON.parse(localStorage.getItem('theraUsers')) || {};
        const user = storedUsers[email.toLowerCase()];

        if (!user) {
            setMessage("Error: No se encontró una cuenta con ese correo.");
            setMessageType('error');
            return;
        }

        if (user.password === password) {
            setMessage(`¡Bienvenido de vuelta, ${user.name}! Ingreso exitoso.`);
            setMessageType('success');

            // Simulación de guardar el usuario loggeado en SessionStorage o Estado Global
            sessionStorage.setItem('loggedInUser', JSON.stringify(user));

            // Redirigir a la página de inicio
            setTimeout(() => navigate('/'), 1500);
        } else {
            setMessage("Error: Contraseña incorrecta.");
            setMessageType('error');
        }
    };


    return (
        <div className="auth-wrapper">
            <Link to="/" className="back-button">Regresar</Link>

            <div className="auth-container">
                {/* LOGO DE THERA */}
                <div className="auth-logo">
                    <img src={isLoginPanel ? "/black-logo.png" : "/assets/black-logo.png"} alt="Thera logo"/>
                </div>

                {/* PESTAÑAS */}
                <div className="auth-tab-header">
                    <button className={`auth-tab-button ${isLoginPanel ? 'active' : ''}`}
                            onClick={() => showPanel(true)}>Iniciar Sesión
                    </button>
                    <button className={`auth-tab-button ${!isLoginPanel ? 'active' : ''}`}
                            onClick={() => showPanel(false)}>Registrarse
                    </button>
                </div>

                {/* 1. FORMULARIO DE INICIO DE SESIÓN */}
                {isLoginPanel && (
                    <form onSubmit={handleLogin}>
                        {/* ... Grupos de formulario ... */}
                        <div className="auth-forgot-password"><Link to="#">¿Olvidaste tu contraseña?</Link></div>
                        <Button type="submit" className="auth-btn-submit">Ingresar a Thera</Button>
                    </form>
                )}

                {/* 2. FORMULARIO DE REGISTRO */}
                {!isLoginPanel && (
                    <form onSubmit={handleRegister}>
                        {/* Requisito: Validaciones en tiempo real (inputs y onChange) */}
                        <div className="auth-form-group">
                            <label htmlFor="register-name">Nombre Completo</label>
                            <input id="register-name" name="name" value={registerForm.name}
                                   onChange={handleRegisterChange} required type="text"/>
                        </div>
                        {/* ... El resto de los inputs ... */}

                        <Button type="submit" className="auth-btn-submit">Crear Cuenta Thera</Button>
                    </form>
                )}

                {/* Mensaje de estado */}
                {message && (
                    <p className="auth-message" style={{color: messageType === 'error' ? 'red' : 'green'}}>
                        {message}
                    </p>
                )}

            </div>
        </div>
    );
};

export default AccountPage;