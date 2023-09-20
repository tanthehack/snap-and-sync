import { useState } from "react";
import { auth } from "../../firebaseConfig";
import { Input } from "../../components/global/input";
import * as Icon from 'react-icons/fi'
import { Link } from "react-router-dom";
import { Button } from "../../components/global/button";
import { useValidateForm } from "../../hooks/useValidateForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import bg from '../../assets/images/&.svg';
import logo from '../../assets/icons/logo.svg';
import { createUserWithEmailAndPassword } from "firebase/auth";

export const Register = () => {
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValidEmail = (value) => (value.trim() !== '' && value.trim() !== null && regEmail.test(value))
    const isValidPassword = (value) => (value.trim() !== '' && value.trim() !== null)
    const isValidMatch = (value) => (value.trim() !== '' && value.trim() !== null && value.trim() === enteredPassword.trim(''))

    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const navigate = useNavigate();
    let disableButton = true

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

    const {
        value: enteredConfirmPassword,
        hasError: confirmPasswordError,
        isValid: confirmPasswordIsValid,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
        reset: resetConfirmPassword
    } = useValidateForm(isValidMatch)

    const handleCreateNewAccount = async () => {
        await createUserWithEmailAndPassword(auth, enteredEmail.trim(''), enteredPassword.trim(''))
            .then((userCredential) => {
                toast.success('Account Created Successfully!')
                const user = userCredential.user;
                navigate('/app', { replace: true })
            })
            .catch((error) => {
                toast.error(error.code)
            });
    }

    const handleShowPassword = () => {
        setShowPass(prev => !prev)
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPass(prev => !prev)
    }

    if (emailIsValid && passwordIsValid && confirmPasswordIsValid || enteredEmail !== '' && enteredPassword !== '' && enteredConfirmPassword !== '') {
        disableButton = false
    }

    return (
        <section className="lg:h-[100dvh] overflow-hidden p-6 py-10"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="text-4xl h-full text-gray-900 flex flex-col items-center justify-center">
                <img src={logo} alt="logo" className="w-32 mb-12" />
                <div className="space-y-[32px]">
                    <div className="space-y-3">
                        <h1 className="font-bold flex items-center gap-4">Create an account</h1>
                        <p className="text-lg">Enter your details to create an account.</p>
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
                        />
                        <Input
                            label="Confirm Password"
                            type={showConfirmPass ? "text" : "password"}
                            icon={<Icon.FiLock />}
                            placeholder="Enter your password"
                            value={enteredConfirmPassword}
                            onChange={confirmPasswordChangeHandler}
                            onClick={handleShowConfirmPassword}
                            onBlur={confirmPasswordBlurHandler}
                            password={showConfirmPass}
                            error={confirmPasswordError}
                            errorText={'Passwords do not match'}
                        />
                    </form>
                    <div className="space-y-3">
                        <Button children="Register" variant="solid" onClick={handleCreateNewAccount} disabled={disableButton} />
                        <p className="text-xs text-center">Already have an account? <Link to="/login" className="text-sky-400 hover:underline">Login here</Link></p>
                    </div>
                </div>
            </div>
        </section>
    )
}