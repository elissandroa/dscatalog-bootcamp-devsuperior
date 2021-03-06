import { useForm } from 'react-hook-form';
import ButtonIcon from 'core/assets/components/ButtonIcon';
import { Link, useHistory } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';
import { makeLogin } from 'core/utils/request';
import { useState } from 'react';
import { saveSessionData } from 'core/utils/auth';

type FormData ={
    username:string;
    password:string
}

const Login = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const[hasError, setHasError]= useState(false);
    const history = useHistory();

    const onSubmit = (data: FormData) =>{
        console.log(data);
        makeLogin(data)
        .then(response => {
            setHasError(false);
            saveSessionData(response.data);
            history.push('/admin');
        })
        .catch(()=> {
            setHasError(true);
        })
    }

    return (
        <AuthCard title="login">
            {hasError && (
                <div className="alert alert-danger mt-5">
                Usuário ou senha inválidos !
            </div>
            )}
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input type="email"
                className="form-control input-base margin-botton-30"
                placeholder="Email"
                {...register('username', { required: true })} 
                
                />
                <input type="password"
                className="form-control input-base"
                placeholder="Senha"
                {...register('password', { required: true })}
                
                />
                 <Link to ="/admin/auth/recover" className="login-link-recover">
                   Esqueceu a senha?
                </Link>
                <div className="login-submit">
                    <ButtonIcon text="logar"/>
                </div>
                <div className="text-center">
                    <span className="not-registered">
                        Não tem cadastro?  
                    </span>
                    <Link to="/admin/auth/register" className="login-link-register">
                        CADASTRAR
                    </Link>
                </div>
            </form>
        </AuthCard>
    );
}

export default Login;