import { createContext, useContext, useEffect, useState } from "react"
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth"
import { auth } from "../pages/api/firebase"

const AuthContext = createContext({})

// export function useAuth() {
// 	return useContext(AuthContext)
// }

export const useAuth = () => useContext(AuthContext)

export function AuthContextProvider(props) {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	console.log(user)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser({
					uid: user.uid,
					email: user.email,
					displayName: user.displayName,
				})
			} else {
				setUser(null)
			}
			setLoading(false)
		})

		return () => unsubscribe()
	}, [])

	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	function signin(email, password) {
		return signInWithEmailAndPassword(auth, email, password)
	}

	async function signout() {
		setUser(null)
		await signOut(auth)
	}

	return (
		<AuthContext.Provider value={{ user, signin, signout, signup }}>
			{loading ? null : props.children}
		</AuthContext.Provider>
	)
}
