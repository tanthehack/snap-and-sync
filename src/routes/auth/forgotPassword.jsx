import bg from '../../assets/images/&.svg';
import { Input } from '../../components/global/input';
import * as Icon from 'react-icons/fi'
import { useValidateForm } from '../../hooks/useValidateForm';
import { Button } from '../../components/global/button';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { Link } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg';
import { toast } from 'react-toastify';

export const PasswordRecovery = () => {
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValidEmail = (value) => (value.trim() !== '' && value.trim() !== null && regEmail.test(value))

    let disableButton = true

    const {
        value: enteredEmail,
        hasError: emailError,
        isValid: emailIsValid,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail
    } = useValidateForm(isValidEmail)

    const handleSendPassResetEmail = async () => {
        await sendPasswordResetEmail(auth, enteredEmail.trim(''))
            .then(() => {
                toast.success('Password reset email sent successfully!')
            })
            .catch((error) => {
                if (error.code === 'auth/user-not-found')
                    toast.error(error.code)
                enteredEmail = ''
            });
    }

    if (emailIsValid && enteredEmail !== '')
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
                    </form>
                    <div className="flex flex-col items-center gap-3">
                        <Button children="Send Email" variant="solid" onClick={handleSendPassResetEmail} disabled={disableButton} />
                        <Link to="/login" className="hover:underline text-xs">Go Back to login</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}