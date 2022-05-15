import Header from "../components/Header/Header"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import MainMenu from "../components/Menu/MainMenu"
import "../styles/globals.css"

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
