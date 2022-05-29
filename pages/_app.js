import Header from "../components/Header/Header"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import MainMenu from "../components/Menu/MainMenu"
import "../styles/globals.css"
import Head from "next/head"

function MyApp({ Component, pageProps }) {
	const [width, setWidth] = useState(0)
	const [menuOpen, setMenuOpen] = useState(false)
	const [darkTheme, setDarkTheme] = useState(false)

	const handleResize = () => setWidth(window.innerWidth)

	useEffect(() => {
		setWidth(window.innerWidth)
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [handleResize])

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
					maximum-scale="1"
				/>
				<meta name="description" content="Ram's Todo App" />
				<meta name="keywords" content="Ram, Todo, App" />
				<meta name="theme-color" content="rgb(0, 106, 255)" />
				<link rel="icon" href="/images/task.png" />

				<title>Ram - Todo App</title>
			</Head>
			<Header
				theme={darkTheme}
				switchTheme={() => setDarkTheme(!darkTheme)}
				hamburgerClick={() => setMenuOpen(!menuOpen)}
				opened={menuOpen}
			/>
			<div className="main">
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
				<Component {...pageProps} />
			</div>
		</>
	)
}

export default MyApp
