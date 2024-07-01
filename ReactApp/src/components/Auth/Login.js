import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = watch('password');
    const onSubmit = data => {
        if (data.password !== data.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        console.log(data);
        // Aquí puedes hacer una llamada a la API para autenticar al usuario.
    };

    return (
        <div className="login-usuario">
            <div className='GridArea'>
                <div className='Welcome'>
                    <h1 className='Info-Title'>Bienvenido</h1>
                    <p className='Welcome-Text'>
                        Bienvenidos al acortador de links CarlitosApp
                        Si ya tienes una cuenta, inicia sesión para continuar.
                        Si no tienes una cuenta, crea una para comenzar. 
                    </p>
                    <Link className='Redirect-Text' to='../Registro-usuario'>¿No tienes cuenta? <span className='Link-Forms'>Registrate</span></Link>
                </div>
                <form className='Form-Login' onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='Info-Title'>Inicio de Sesión</h2>
                    <div className='Form-Group'>
                        <label className='Label-Forms' htmlFor="email">Correo Electrónico</label>
                        <input
                            id="email"
                            type="email"
                            className={`Input-Forms ${errors.email ? 'error' : ''}`}
                            {...register('email', { required: 'El correo electrónico es obligatorio' })}
                        />
                        <div className="Error-Container">
                            {errors.email && <span className="Error-Message">{errors.email.message}</span>}
                        </div>
                    </div>

                    <div className='Form-Group'>
                        <label className='Label-Forms' htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            className={`Input-Forms ${errors.password ? 'error' : ''}`}
                            {...register('password', { required: 'La contraseña es obligatoria' })}
                        />
                        <div className="Error-Container">
                            {errors.password && <span className="Error-Message">{errors.password.message}</span>}
                        </div>
                    </div>

                    <div className='Form-Group'>
                        <label className='Label-Forms' htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className={`Input-Forms ${errors.confirmPassword ? 'error' : ''}`}
                            {...register('confirmPassword', { required: 'Por favor confirma tu contraseña' })}
                        />
                        <div className="Error-Container">
                            {errors.confirmPassword && <span className="Error-Message">{errors.confirmPassword.message}</span>}
                        </div>
                    </div>

                    <button className='Button-Forms' type="submit">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
};

export default Login;