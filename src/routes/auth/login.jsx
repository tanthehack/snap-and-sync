import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebaseConfig";
import logoWhite from '../../assets/icons/logoWhite.svg';
import landingImg from '../../assets/images/landingImg.png';
import logo from '../../assets/icons/logo.svg';
import { Input } from "../../components/global/input";
import * as Icon from 'react-icons/fi'
import { Link } from "react-router-dom";
import { Button } from "../../components/global/button";
import { useValidateForm } from "../../hooks/useValidateForm";
import wavingHand from '../../assets/images/wavingHand.png'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import bg from '../../assets/images/bg.png'

export const Login = () => {
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValidEmail = (value) => (value.trim() !== '' && value.trim() !== null && regEmail.test(value))
    const isValidPassword = (value) => (value.trim() !== '' && value.trim() !== null)

    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate();
    let buttonDisabled = true

    const [isLoading, setIsLoading] = useState(false)

    const {
        value: enteredEmail,
        hasError: emailError,
        isValid: emailIsValid,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail
    } = useValidateForm(isValidEmail)

    const {
        value: enteredPassword,
        hasError: passwordError,
        isValid: passwordIsValid,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPassword
    } = useValidateForm(isValidPassword)

    const handleUserLogin = async () => {
        try {
            setIsLoading(true)
            await signInWithEmailAndPassword(auth, enteredEmail.trim(''), enteredPassword.trim(''))
                .then((userCredential) => {
                    const user = userCredential.user;
                    toast.success('Login Successful')
                    navigate('/app', { replace: true })
                })
            setIsLoading(false)
        }
        catch (error) {
            toast.error(error.code)
        };
    }

    const handleShowPassword = () => {
        setShowPass(prev => !prev)
    }

    if (emailIsValid && passwordIsValid || enteredEmail !== '' && enteredPassword !== '')
        buttonDisabled = false

    return (
        <section className="lg:h-[100dvh] lg:overflow-hidden flex flex-col lg:flex-row items-center justify-center p-6 py-11 lg:p-0">
            <aside className=" w-[50%] h-full hidden lg:block lg:py-24 lg:pl-24 overflow-hidden"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'rgb(17 24 39)',
                }}
            >
                <img src={logoWhite} alt="logo" />
                <img src={landingImg} alt='landing image of the application' className="ml-[100px]" />
            </aside>
            <div className="bg-white lg:w-[50%] h-full text-4xl text-gray-900 flex flex-col items-center justify-center">
                <img src={logo} alt="logo" className="w-32 mb-12" />
                <div className="space-y-[64px]">
                    <div className="space-y-3">
                        <h1 className="font-bold flex items-center gap-4">Hey, Welcome Back! <img src={wavingHand} alt="waving hand emoji" className="w-6 h-6" /></h1>
                        <p className="text-lg">Enter your details to gain access to your account.</p>
                    </div>

                    <form className="space-y-8">
                        <Input
                            label="Email"
                            type="text"
                            icon={<Icon.FiMail />}
                            placeholder="Enter your email"
                            value={enteredEmail}
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                            error={emailError}
                            errorText={'Enter a valid email'}
                            required
                        />
                        <Input
                            label="Password"
                            type={showPass ? "text" : "password"}
                            icon={<Icon.FiLock />}
                            placeholder="Enter your password"
                            value={enteredPassword}
                            onChange={passwordChangeHandler}
                            onClick={handleShowPassword}
                            onBlur={passwordBlurHandler}
                            password={showPass}
                            error={passwordError}
                            errorText={'Enter a valid password'}
                            required
                        />
                    </form>

                    <Link to="/forgot-password" className="text-sm text-gray-400 hover:text-gray-500">Forgot Password?</Link>

                    <div className="space-y-3">
                        <Button children="Login" variant="solid" onClick={handleUserLogin} disabled={buttonDisabled} isLoading={isLoading} />
                        <p className="text-xs text-center">Don't have an account? <Link to="/register" className="text-sky-400 hover:underline">Register here</Link></p>
                    </div>
                </div>
            </div>
        </section>
    )
}