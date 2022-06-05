import { Button, TextInput } from "@mantine/core"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function Signin(props) {
	const [error, setError] = useState(null)
	const { user, signin } = useAuth()
	console.log(user)

	const router = useRouter()

	const userEmail = useRef()
	const userPassword = useRef()

	//TODO add form validation - e.x user not found

	useEffect(() => {
		if (user) router.replace("/app")
	}, [])

	async function handleSignIn(e) {
		e.preventDefault()
		try {
			await signin(userEmail.current.value, userPassword.current.value)
			router.replace("/app")
		} catch (err) {
			setError(err)
			console.log(err)
		}
	}
	return (
		<div
			style={{
				height: "100vh",
				width: "100%",
				padding: "0 2rem",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				gap: "6rem",
			}}
		>
			<div>
				<h1 style={{ fontSize: "5rem" }}>Login</h1>
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					gap: "1rem",
				}}
			>
				<form
					onSubmit={handleSignIn}
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "1.5rem",
					}}
				>
					<TextInput
						type="email"
						variant="filled"
						placeholder="Your email"
						label="Email"
						required
						ref={userEmail}
					/>
					<TextInput
						placeholder="Password"
						variant="filled"
						type="password"
						label="Password"
						description="Password must include at least one letter, number and special character"
						ref={userPassword}
						required
					/>
					<Button type="submit" color={"default"}>
						Sign In
					</Button>
				</form>
				<p
					style={{ fontSize: "1.3rem", color: "#333", alignSelf: "flex-start" }}
				>
					Don't have an account? <Link href={"/signup"}>Sign up</Link> instead.
				</p>
				<div
					style={{
						marginTop: "2.5rem",
						alignSelf: "flex-start",
						fontSize: "1.7rem",
						color: "#333",
					}}
				>
					<p style={{ marginBottom: "1rem" }}>
						Recruiter? Feel free to use the below guest login details:
					</p>
					<p>
						Email: <span style={{ userSelect: "text" }}>guest@hotmail.com</span>
					</p>
					<p>
						Password: <span style={{ userSelect: "text" }}>password123</span>
					</p>
				</div>
			</div>
		</div>
	)
}
