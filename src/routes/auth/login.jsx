import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebaseConfig";
import { setCredentials } from "../../auth/authSlice";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleUserLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const userData = userCredential.user;
                console.log("Signed in user: ", userData);
                setCredentials({
                    user: email,
                    accessToken: userData?.accessToken,
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("An error occured: ", errorCode, errorMessage);
            });
    }

    return (
        <section>
            <input type="text" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleUserLogin}>Login</button>
        </section>
    )
}