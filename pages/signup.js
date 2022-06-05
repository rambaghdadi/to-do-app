import { Button, TextInput } from "@mantine/core"
import { getAuth, updateProfile } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import { useAuth } from "../context/AuthContext"

export default function Signup(props) {
	const { user, signup } = useAuth()
	const auth = getAuth()
	const router = useRouter()
	console.log(user)

	const userName = useRef()
	const userEmail = useRef()
	const userPassword = useRef()

	useEffect(() => {
		if (user) router.replace("/app")
	}, [])

	async function handleSignUp(e) {
		e.preventDefault()
		try {
			await signup(userEmail.current.value, userPassword.current.value)
			await updateProfile(auth.currentUser, {
				displayName: userName.current.value,
			})
			router.push("/app")
		} catch (err) {
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
				<h1 style={{ fontSize: "5rem" }}>Sign Up</h1>
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
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "1.5rem",
					}}
					onSubmit={handleSignUp}
				>
					<TextInput
						placeholder="Your name"
						label="Name"
						variant="filled"
						required
						ref={userName}
					/>

					<TextInput
						type="email"
						variant="filled"
						placeholder="Your email"
						label="Email"
						ref={userEmail}
						required
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
						Sign Up
					</Button>
				</form>
				<p
					style={{ fontSize: "1.3rem", color: "#333", alignSelf: "flex-start" }}
				>
					Already signed up? <Link href={"/signin"}>Sign in</Link> instead.
				</p>
			</div>
		</div>
	)
}
