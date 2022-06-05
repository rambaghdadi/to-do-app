import Header from "../components/Header/Header"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import MainMenu from "../components/Menu/MainMenu"
import "../styles/globals.css"
import Head from "next/head"
import { AuthContextProvider } from "../context/AuthContext"
import { useRouter } from "next/router"
import ProtectedRoute from "../components/AuthenticationComponents/ProtectedRoute"

function MyApp({ Component, pageProps }) {
	const router = useRouter()

	const [width, setWidth] = useState(0)
	const [menuOpen, setMenuOpen] = useState(false)
	const [darkTheme, setDarkTheme] = useState(false)
	const [path, setPath] = useState(router.asPath)

	const noNavLinks = ["/", "/signup", "/signin"]
	const noAuthRequired = ["/", "/signup", "/signin"]

	const handleResize = () => setWidth(window.innerWidth)

	useEffect(() => {
		setPath(router.asPath)
	}, [router.asPath])

	useEffect(() => {
		setWidth(window.innerWidth)
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [handleResize])

	useEffect(() => {
		if (localStorage.getItem("theme") === "true") {
			setDarkTheme(true)
		} else {
			setDarkTheme(false)
		}
	}, [])

	useEffect(() => {
		if (darkTheme) document.body.dataset.theme = "dark"
		if (!darkTheme) document.body.dataset.theme = "light"
	}, [darkTheme])

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width"
					initial-scale="1.0"
				/>
				<meta name="description" content="Ram's Todo App" />
				<meta name="keywords" content="Ram, Todo, App" />
				<meta name="theme-color" content="rgb(0, 106, 255)" />
				<link rel="icon" href="/images/task.png" />
				{/* <link rel="manifest" href="/manifest.json" /> */}

				<link rel="apple-touch-icon" href="/images/ios/192.png" />
				<meta
					name="apple-mobile-web-app-status-bar"
					content="rgb(0, 106, 255)"
				/>

				<title>Ram - Todo App</title>
			</Head>
			<AuthContextProvider>
				{noAuthRequired.includes(router.pathname) ? null : (
					<ProtectedRoute>
						<Header
							theme={darkTheme}
							switchTheme={() => {
								setDarkTheme(!darkTheme)
								localStorage.setItem("theme", !darkTheme)
							}}
							hamburgerClick={() => setMenuOpen(!menuOpen)}
							opened={menuOpen}
						/>
					</ProtectedRoute>
				)}
				<div className="main">
					{noAuthRequired.includes(router.pathname) ? null : (
						<ProtectedRoute>
							<AnimatePresence key={"menu"}>
								{menuOpen && (
									<motion.div>
										<MainMenu
											backdropClick={() => {
												setMenuOpen(!menuOpen)
											}}
											close={() => {
												if (width > 749) return
												setMenuOpen(!menuOpen)
											}}
										/>
									</motion.div>
								)}
							</AnimatePresence>
						</ProtectedRoute>
					)}

					{noAuthRequired.includes(router.pathname) ? (
						<Component {...pageProps} />
					) : (
						<ProtectedRoute>
							<Component {...pageProps} />
						</ProtectedRoute>
					)}
				</div>
			</AuthContextProvider>
		</>
	)
}

export default MyApp
