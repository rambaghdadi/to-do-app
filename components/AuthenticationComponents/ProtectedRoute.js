import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuth } from "../../context/AuthContext"

export default function ProtectedRoute(props) {
	const { user } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!user) {
			router.push("/signin")
		}
	}, [router, user])

	return <>{user ? props.children : null}</>
}
