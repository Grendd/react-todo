import React, {ChangeEvent, FormEvent, useContext, useState} from "react";
import {registerApi, loginApi} from "../../api/authApi";
import Error from "../Error/Error";
import Tooltip from "../Tooltip/Tooltip";
import {FormType, AuthTypes} from "../../types";

import "./styles.scss";
import {AppContext} from "../../context";

interface AuthInputProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    isPass?: boolean;
    placeholder?: string;
    className?: string;
}

const AuthInput = ({onChange, value, placeholder, isPass = false}: AuthInputProps) => {
	return (
		<Tooltip text={isPass ? "Password length > 6" : "example@mail.com"} margin="-70px 0 0 220px">
			<input
				name={isPass ? "password" : "email"}
				className='inputs auth-input'
				type={isPass ? "password" : "text"}
				autoComplete="off"
				onChange={onChange}
				value={value}
				placeholder={placeholder || ""}
				maxLength={40}
			/>
		</Tooltip>
	);
};

interface AuthFormProps {
    setIsLogined: (state: boolean) => void
    setAuthType: (state: AuthTypes | null) => void
    authType: AuthTypes
    className?: string
}



const AuthForm = ({setIsLogined, authType, setAuthType}: AuthFormProps) => {
	const [form, setForm] = useState<FormType>({email: "", password: ""});
	const [error, setError] = useState<string>("");
	const auth = useContext(AppContext);

	const onSubmit = async(e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const {data, status} = authType === "register" ? await registerApi(form) :
			await loginApi(form);
		if (status >= 500) {
			setError("Server not available");
		}
		if (status >= 400 && status < 500) {
			setError(data.message);
		}
		if (status >= 200 && status < 300) {
			setIsLogined(true);
			auth.login(data.token, data.userId);
		}
		setForm({email: "", password: ""});
	};
	const onChangeInput = (form: FormType, onChange: (data: FormType) => void) => {
		return (e: ChangeEvent<HTMLInputElement>) => {
			onChange({...form, [e.target.name]: e.target.value});
		};
	};
	return (
		<form onSubmit={onSubmit} onClick={e => e.stopPropagation()} className={"auth-form"}>
			<AuthInput onChange={onChangeInput(form, setForm)} value={form.email} placeholder={"Login"}/>
			<AuthInput onChange={onChangeInput(form, setForm)} value={form.password} placeholder={"Password"} isPass/>
			<input type="submit" className='auth-button action-btn' value={authType === "login" ? "Log in" : "Sign up"} />
			<button className="auth-button return-btn" onClick={() => {setAuthType(null);}}>Back</button>
			{error && <Error message={error}/>}
		</form>
	);
};

interface SignInOrUpProps {
    setIsLogined: (state: boolean) => void
}

const SignInOrUp = ({setIsLogined}: SignInOrUpProps) => {
	const [authType, setAuthType] = useState<AuthTypes | null>(null);

	return (
		<div className={"auth"}>
			{authType ?
				<AuthForm setIsLogined={setIsLogined} authType={authType} setAuthType={setAuthType}/> :
				<div className='auth-buttons'>
					<button className="auth-button action-btn" onClick={() => setAuthType("login")}>Log In</button>
					<button className="auth-button action-btn" onClick={() => setAuthType("register")}>Sign Up</button>
				</div>
			}

		</div>
	);
};

export default SignInOrUp;
