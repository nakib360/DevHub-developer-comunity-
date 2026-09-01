import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../../firebase.config';

const SignUp = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user;
};

const SignIn = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
}

const SignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    return res.user;
}

const SignOut = async () => {
    await signOut(auth);
}

export {SignIn, SignUp, SignInWithGoogle, SignOut};
