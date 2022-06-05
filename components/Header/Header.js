import { Menu, Modal } from "@mantine/core"
import { useRouter } from "next/router"
import { useState } from "react"
import { Home, Menu2, Moon, Plus, Sun, User, X } from "tabler-icons-react"
import { useAuth } from "../../context/AuthContext"
import NewToDoOptions from "../ToDos/NewToDoOptions"
import classes from "./Header.module.css"
import SearchBar from "./SearchBar"

export default function Header(props) {
	const [opened, setOpened] = useState(false)
	const { user, signout } = useAuth()

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
				title={"Add a New Todo"}
			>
				<NewToDoOptions
					cancelBtn={() => setOpened(false)}
					addTaskBtn={() => setOpened(false)}
				/>
			</Modal>

			<header className={classes.header}>
				<div className={classes.main}>
					<div className={classes.mainOne}>
						{hamburgerMenu}
						<SearchBar />
					</div>
					<div className={classes.mainTwo}>
						{themeColorIcon}
						<Home
							style={{ cursor: "pointer" }}
							size={25}
							strokeWidth={1}
							color={"white"}
							onClick={() => router.push("/app")}
						/>

						<Plus
							onClick={() => {
								setOpened(true)
							}}
							size={25}
							strokeWidth={1}
							color={"white"}
							style={{ cursor: "pointer" }}
						/>

						<Menu
							control={
								<button style={{ all: "unset" }}>
									<User
										type="button"
										size={25}
										strokeWidth={1}
										color={"white"}
										style={{ cursor: "pointer" }}
									/>
								</button>
							}
							className={classes.dots}
						>
							<Menu.Label>Hello, {user?.displayName}</Menu.Label>
							<Menu.Item
								onClick={() => {
									signout()
									router.push("/")
								}}
							>
								Sign Out
							</Menu.Item>
						</Menu>
					</div>
				</div>
			</header>
		</>
	)
}
