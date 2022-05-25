import { Modal } from "@mantine/core"
import { useRouter } from "next/router"
import { useState } from "react"
import { Home, Menu2, Moon, Plus, Sun, X } from "tabler-icons-react"
import NewToDoOptions from "../ToDos/NewToDoOptions"
import classes from "./Header.module.css"

export default function Header(props) {
	const [opened, setOpened] = useState(false)

	const themeColorIcon = props.theme ? (
		<Sun
			size={25}
			onClick={props.switchTheme}
			strokeWidth={1}
			color={"white"}
		/>
	) : (
		<Moon
			size={25}
			onClick={props.switchTheme}
			strokeWidth={1}
			color={"white"}
		/>
	)

	const router = useRouter()
	const hamburgerMenu = props.opened ? (
		<X
			onClick={props.hamburgerClick}
			size={25}
			strokeWidth={1}
			color={"white"}
			style={{ cursor: "pointer" }}
		/>
	) : (
		<Menu2
			onClick={props.hamburgerClick}
			size={25}
			strokeWidth={1}
			color={"white"}
			style={{ cursor: "pointer" }}
		/>
	)
	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title="Add a New Todo"
			>
				<NewToDoOptions
					cancelBtn={() => setOpened(false)}
					addTaskBtn={() => setOpened(false)}
				/>
			</Modal>
			<header className={classes.header}>
				<div className={classes.main}>
					<div className={classes.mainOne}>{hamburgerMenu}</div>
					<div className={classes.mainTwo}>
						{themeColorIcon}
						<Home
							style={{ cursor: "pointer" }}
							size={25}
							strokeWidth={1}
							color={"white"}
							onClick={() => router.push("/")}
						/>

						<Plus
							onClick={() => setOpened((o) => !o)}
							size={25}
							strokeWidth={1}
							color={"white"}
							style={{ cursor: "pointer" }}
						/>

						{/* <User
						size={25}
						strokeWidth={1}
						color={"white"}
						style={{ cursor: "pointer" }}
					/> */}
					</div>
				</div>
			</header>
		</>
	)
}
