import { confirmPasswordReset } from "firebase/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import bg from '../../assets/images/&.svg';
import { Input } from '../../components/global/input';
import * as Icon from 'react-icons/fi'
import { useValidateForm } from '../../hooks/useValidateForm';
import { Button } from '../../components/global/button';
import { auth } from '../../firebaseConfig';
import { Link } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg';
import { toast } from "react-toastify";
import { useState } from "react";

export const PasswordReset = () => {
    const isValidPassword = (value) => (value.trim() !== '' && value.trim() !== null)
    const isValidMatch = (value) => (value.trim() !== '' && value.trim() !== null && value.trim() === enteredPassword.trim(''))

    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    let oobCode = searchParams?.get('oobCode')

    let disableButton = true

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

    const handleConfirmPasswordReset = async (oobCode, newPassword) => {
        if (!oobCode && !newPassword) return;

        return await confirmPasswordReset(auth, oobCode, newPassword)
    }

    const handleSubmitPassword = async () => {
        await handleConfirmPasswordReset(oobCode, enteredPassword)
            .then(() => {
                toast.success('Password reset successful!')
                navigate('/login', { replace: true })
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

    if (enteredPassword !== '' && enteredConfirmPassword !== '' && passwordIsValid && confirmPasswordIsValid)
        disableButton = false

    return (
        <section className="lg:h-[100dvh] overflow-hidden p-6 py-10"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="h-full text-gray-900 flex flex-col items-center justify-center">
                <img src={logo} alt="logo" className="w-32 mb-12" />
                <div className='space-y-[32px]'>
                    <h1 className="font-bold flex items-center gap-4 text-2xl">Enter your email to <br /> recover your password</h1>
                    <form className="space-y-8">
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
                    <div className="flex flex-col items-center gap-3">
                        <Button children="Send Email" variant="solid" onClick={handleSubmitPassword} disabled={disableButton} />
                        <Link to="/login" className="hover:underline text-xs">Go Back to login</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}