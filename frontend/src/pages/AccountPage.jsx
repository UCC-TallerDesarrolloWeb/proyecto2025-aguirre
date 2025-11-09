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

    // Logo desde la carpeta /public
    const blackLogo = '/black-logo.png';

    const showPanel = (isLogin) => {
        setIsLoginPanel(isLogin);
        setMessage('');
    };

    // --- MANEJO DE ESTADO DE FORMULARIOS ---

    // Manejador para el formulario de INICIO DE SESIÓN
    const handleLoginChange = (e) => {
        setLoginForm({...loginForm, [e.target.name]: e.target.value});
    };

    // Manejador para el formulario de REGISTRO (Requisito: Validaciones en tiempo real)
    const handleRegisterChange = (e) => {
        setRegisterForm({...registerForm, [e.target.name]: e.target.value});
    };

    // --- MANEJADORES DE ENVÍO ---

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

            // Simulación de guardar el usuario loggeado
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
                    <img src={blackLogo} alt="Thera logo"/>
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

                        {/* CAMPO: CORREO ELECTRÓNICO */}
                        <div className="auth-form-group">
                            <label htmlFor="login-email">Correo Electrónico</label>
                            <input
                                id="login-email"
                                name="email"
                                value={loginForm.email}
                                onChange={handleLoginChange}
                                placeholder="tu.correo@ejemplo.com"
                                required
                                type="email"
                                maxLength="50"
                            />
                        </div>

                        {/* CAMPO: CONTRASEÑA */}
                        <div className="auth-form-group">
                            <label htmlFor="login-password">Contraseña</label>
                            <input
                                id="login-password"
                                name="password"
                                value={loginForm.password}
                                onChange={handleLoginChange}
                                placeholder="Tu contraseña"
                                required
                                type="password"
                                maxLength="24"
                            />
                        </div>

                        <div className="auth-forgot-password"><Link to="#">¿Olvidaste tu contraseña?</Link></div>
                        <Button type="submit" className="auth-btn-submit">Ingresar a Thera</Button>
                    </form>
                )}

                {/* 2. FORMULARIO DE REGISTRO */}
                {!isLoginPanel && (
                    <form onSubmit={handleRegister}>

                        {/* CAMPO: NOMBRE COMPLETO */}
                        <div className="auth-form-group">
                            <label htmlFor="register-name">Nombre Completo</label>
                            <input
                                id="register-name"
                                name="name"
                                value={registerForm.name}
                                onChange={handleRegisterChange}
                                placeholder="Juan Pérez"
                                required
                                type="text"
                                maxLength="50"
                            />
                        </div>

                        {/* CAMPO: CORREO ELECTRÓNICO */}
                        <div className="auth-form-group">
                            <label htmlFor="register-email">Correo Electrónico</label>
                            <input
                                id="register-email"
                                name="email"
                                value={registerForm.email}
                                onChange={handleRegisterChange}
                                placeholder="tu.correo@ejemplo.com"
                                required
                                type="email"
                                maxLength="50"
                            />
                        </div>

                        {/* CAMPO: CONTRASEÑA */}
                        <div className="auth-form-group">
                            <label htmlFor="register-password">Contraseña</label>
                            <input
                                id="register-password"
                                name="password"
                                value={registerForm.password}
                                onChange={handleRegisterChange}
                                placeholder="Mínimo 6 caracteres"
                                required
                                type="password"
                                minLength="6"
                                maxLength="24"
                            />
                        </div>

                        {/* CAMPO: CONFIRMAR CONTRASEÑA */}
                        <div className="auth-form-group">
                            <label htmlFor="register-confirm-password">Confirmar Contraseña</label>
                            <input
                                id="register-confirm-password"
                                name="confirmPassword" // Usamos confirmPassword para el estado
                                value={registerForm.confirmPassword}
                                onChange={handleRegisterChange}
                                placeholder="Repite la contraseña"
                                required
                                type="password"
                                minLength="6"
                                maxLength="24"
                            />
                        </div>

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