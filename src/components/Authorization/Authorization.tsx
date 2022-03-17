import React, {ChangeEvent, FormEvent, useContext, useState} from 'react';
import {registerApi, loginApi} from "../../api/authApi";
import Error from "../Error/Error";

import './Authorization.scss'
import {AppContext} from "../../context";

interface AuthInputProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    isPass?: boolean;
    placeholder?: string;
    className?: string;
}
const AuthInput = ({onChange, value, className, placeholder, isPass = false}: AuthInputProps) => {

    return (
        <input
            name={isPass ? 'password' : 'email'}
            className={className || ''}
            type={isPass ? "password" : "text"}
            autoComplete="off"
            onChange={onChange}
            value={value}
            placeholder={placeholder || ''}
            maxLength={40}
        />
    )
}

type AuthTypes = 'register' | 'login';


interface AuthFormProps {
    setIsLogined: (state: boolean) => void
    authType: AuthTypes
    className?: string
}
interface SignInOrUpProps {
    setIsLogined: (state: boolean) => void
}

interface FormType {
    email: string
    password: string
}
const AuthForm = ({setIsLogined, authType}: AuthFormProps) => {
    const [form, setForm] = useState<FormType>({email: '', password: ''});
    const [error, setError] = useState<string>('')
    const auth = useContext(AppContext)

    const onSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {data, status} = authType === 'register' ? await registerApi(form) :
            await loginApi(form);
        if (status >= 500) {
            setError('Server not available')
        }
        if (status >= 400 && status < 500) {
            setError(data.message)
        }
        if (status >= 200 && status < 300) {
            setIsLogined(true)
            auth.login(data.token, data.userId)
        }
        setForm({email: '', password: ''})
    }
    const onChangeInput = (form: FormType, onChange: (data: FormType) => void) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            onChange({...form, [e.target.name]: e.target.value})
        }
    }
    return (
        <form onSubmit={onSubmit} onClick={e => e.stopPropagation()} className={'auth-form'}>
            <AuthInput onChange={onChangeInput(form, setForm)} value={form.email} className='inputs auth-input' placeholder={'Login'}/>
            <AuthInput onChange={onChangeInput(form, setForm)} value={form.password} className='inputs auth-input' placeholder={'Password'} isPass/>
            <input type="submit" className='auth-button submit'/>
            {error && <Error message={error}/>}
        </form>
    )
}

interface SignInOrUpProps {
    setIsLogined: (state: boolean) => void
}

const SignInOrUp = ({setIsLogined}: SignInOrUpProps) => {
    const [authType, setAuthType] = useState<AuthTypes | null>(null);

    return (
        <div className={'auth'}>
            {authType ?
                <AuthForm setIsLogined={setIsLogined} authType={authType}/> :
                <div className='auth-buttons'>
                    <button className="auth-button" onClick={() => setAuthType('login')}>Sign In</button>
                    <button className="auth-button" onClick={() => setAuthType('register')}>Sign Up</button>
                </div>
            }

        </div>
    )
}

export default SignInOrUp;
