
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './Login.css';

const FormGroup = ({ id, label, type = "text", register, rules, errors }) => (
    <div className='Form-Group'>
        <label className='Label-Forms' htmlFor={id}>{label}</label>
        <input
            id={id}
            type={type}
            className={`Input-Forms ${errors[id] ? 'error' : ''}`}
            {...register(id, rules)}
        />
        <div className="Error-Container">
            {errors[id] && <span className="Error-Message">{errors[id].message}</span>}
        </div>
    </div>
);

FormGroup.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    register: PropTypes.func.isRequired,
    rules: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const Login = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = watch('password');

    const onSubmit = data => {
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
                    <Link className='Redirect-Text' to='../Registro-usuario'>
                        ¿No tienes cuenta? <span className='Link-Forms'>Regístrate</span>
                    </Link>
                </div>
                <form className='Form-Login' onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='Info-Title'>Inicio de Sesión</h2>
                    <FormGroup
                        id="email"
                        label="Correo Electrónico"
                        type="email"
                        register={register}
                        rules={{ required: 'El correo electrónico es obligatorio' }}
                        errors={errors}
                    />
                    <FormGroup
                        id="password"
                        label="Contraseña"
                        type="password"
                        register={register}
                        rules={{ required: 'La contraseña es obligatoria' }}
                        errors={errors}
                    />
                    <FormGroup
                        id="confirmPassword"
                        label="Confirmar Contraseña"
                        type="password"
                        register={register}
                        rules={{
                            required: 'Por favor confirma tu contraseña',
                            validate: value => value === password || 'Las contraseñas no coinciden'
                        }}
                        errors={errors}
                    />
                    <button className='Button-Forms' type="submit">Iniciar Sesión</button>
                    <ButtonLogin />
                </form>
            </div>
        </div>
    );
};

const ButtonLogin = () => (
    <Link className='Redirect-Boton Redirect-Text' to='../Registro-usuario'>
        ¿No tienes cuenta? <span className='Link-Forms'>Regístrate</span>
    </Link>
);

export default Login;
