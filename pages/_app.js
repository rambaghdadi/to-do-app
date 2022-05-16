import Header from "../components/Header/Header"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import MainMenu from "../components/Menu/MainMenu"
import "../styles/globals.css"
import Head from "next/head"

function MyApp({ Component, pageProps }) {
	const [width, setWidth] = useState(0) // default width, detect on server.
	const [menuOpen, setMenuOpen] = useState(false)

	const handleResize = () => setWidth(window.innerWidth)

	useEffect(() => {
		setWidth(window.innerWidth)
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [handleResize])

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
				<link rel="icon" href="/images/task.png" />

				<title>Ram - Todo App</title>
			</Head>
			<Header hamburgerClick={() => setMenuOpen(!menuOpen)} opened={menuOpen} />
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
