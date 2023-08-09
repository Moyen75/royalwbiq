import initializeAuthentication from "./firebase-init";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "@firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


initializeAuthentication()
const useFirebase = () => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const auth = getAuth();

    // google sign in
    const googleSignIn = (router, modal) => {
        setLoading(true)
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(result => {
                setUser(result.user)
                // saveUser(result.user.email, result.user.displayName, 'PUT')
                modal()
                // let from = location.state?.from?.pathname || "/";
                router.push("/")
            })
            .catch(error => {
                setError(error.message)
            })
            .finally(() => setLoading(false))
    }


    // create user with email and password
    const emailSignUp = ({ email, password, name, modal, router }) => {
        setLoading(true)
        console.log(email, password, name)
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result)
                router.push('/')
                modal()
                // saveUser(result.user.email, name, 'POST')
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(result => {
                    setUser(result.user)


                }).catch(error => {
                    setError(error.message)
                })
            })
            .catch(error => {
                setError(error.message)
            })
            .finally(() => setLoading(false))
    }

    // sign in with email and password
    const emailSignIn = ({ email, password, router, modal }) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user)
                // let from = location.state?.from?.pathname || "/";
                router.push("/")
                modal()
            })
            .catch(error => {
                console.log(error.message)
                setError(error.message)
            })
            .finally(() => setLoading(false))
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user)
                setLoading(false)
            }
            else {
                setUser(null)
            }
        })

        return () => unsubscribe;
    }, [auth])


    const logOut = () => {
        setLoading(true)
        signOut(auth)
            .then(() => {

            })
            .catch(error => {
                setError(error.message)
            })
            .finally(() => setLoading(false))
    }

    // save user to database
    const saveUser = (email, displayName, method) => {
        const userInfo = { email, displayName }
        fetch('https://arcane-tor-66544.herokuapp.com/user', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })

    }

    return {
        error,
        user,
        loading,
        googleSignIn,
        emailSignUp,
        emailSignIn,
        logOut
    }
}
export default useFirebase;