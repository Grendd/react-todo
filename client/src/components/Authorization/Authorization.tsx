import React, {ChangeEvent, FormEvent, useState} from 'react';
import {registerApi, loginApi} from "../../api/authApi";
import Error from "../Error/Error";
import './Authorization.scss'

interface AuthInputProps {
    onChange: (value: string) => void;
    value: string;
    isPass?: boolean;
    placeholder?: string;
    className?: string;
}
const AuthInput = ({onChange, value, className, placeholder, isPass = false}: AuthInputProps) => {

    return (
        <input
            className={className || ''}
            type={isPass ? "password" : "text"}
            autoComplete="off"
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
            value={value}
            placeholder={placeholder || ''}
            maxLength={18}
        />
    )
}

type FormType = 'subtaskInput' | '';
type AuthTypes = 'register' | 'login';


interface AuthFormProps {
    setIsLogined: (state: boolean) => void
    authType: AuthTypes
    className?: string
}
interface SignInOrUpProps {
    setIsLogined: (state: boolean) => void
}

const AuthForm = ({setIsLogined, authType}: AuthFormProps) => {
    const [loginValue, setLoginValue] = useState<string>('');
    const [passValue, setPassValue] = useState<string>('');
    const [error, setError] = useState<string>('')
    const onSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoginValue('')
        setPassValue('')
        if (authType === 'register') {
            const {data, status} = await registerApi({email: loginValue, password: passValue})
            if (status >= 500) {
                setError('Server not available')
            }
            if (status >= 400) {
                setError(data.message)
            }
            if (status >= 200) {
                console.log(data)
            }
        } else {
            const {data, status} = await loginApi({email: loginValue, password: passValue})
            if (status >= 500) {
                setError('Server not available')
            }
            if (status >= 400) {
                setError(data.message)
            }
            if (status >= 200) {
                console.log(data)
            }
        }
    }
    return (
        <form onSubmit={onSubmit} onClick={e => e.stopPropagation()} className={'auth-form'}>
            <AuthInput onChange={setLoginValue} value={loginValue} className='inputs auth-input' placeholder={'Login'}/>
            <AuthInput onChange={setPassValue} value={passValue} className='inputs auth-input' placeholder={'Password'}/>
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
