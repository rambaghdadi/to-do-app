import {
	Calendar,
	Circle,
	FilterOff,
	Inbox,
	Plus,
	Dots,
	Trash,
} from "tabler-icons-react"
import classes from "./MainMenu.module.css"
import MenuItem from "./MenuItem"
import { motion } from "framer-motion"
import useFirestoreCollection from "../../hooks/useFirestoreCollection"
import { useState } from "react"
import { Button, Popover, TextInput, Menu, ColorInput } from "@mantine/core"
import { db } from "../../pages/api/firebase"
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"
import { useRouter } from "next/router"
import { useAuth } from "../../context/AuthContext"

export default function MainMenu(props) {
	const [opened, setOpened] = useState(false)
	const [formInput, setFormInput] = useState("")
	const [colorValue, setColorValue] = useState("#868e96")
	const projects = useFirestoreCollection("projects")
	const todos = useFirestoreCollection("todos")
	const router = useRouter()
	const { user } = useAuth()

	function inputHandler(e) {
		setFormInput(e.target.value)
	}

	async function submitHandler() {
		if (formInput === "") return
		const docRef = await addDoc(collection(db, "projects"), {
			name: formInput,
			color: colorValue,
			user: user.uid,
		})
	}

	const dateOptions = {
		month: "long",
		day: "numeric",
		year: "numeric",
	}

	function numberOfTodos(projectName) {
		return todos
			.filter((todo) => todo.data.user === user?.uid)
			.filter((todo) => {
				return todo.data.project.includes(projectName)
			})
			.filter((todo) => todo.data.completed === false).length
	}

	function numberOfTodosToday() {
		return todos
			.filter((todo) => todo.data.user === user?.uid)
			.filter((todo) => {
				return (
					new Date(todo.data.dueDate).toLocaleDateString(
						"en-US",
						dateOptions
					) === new Date().toLocaleDateString("en-US", dateOptions)
				)
			}).length
	}

	const form = (
		<form
			className={classes.form}
			onSubmit={(e) => {
				e.preventDefault()
			}}
		>
			<div className={classes.options}>
				<div className={classes.mainOptions}>
					<ColorInput
						disallowInput
						withPicker={false}
						swatchesPerRow="6"
						swatches={[
							"#868e96",
							"#fa5252",
							"#e64980",
							"#be4bdb",
							"#7950f2",
							"#4c6ef5",
							"#228be6",
							"#15aabf",
							"#12b886",
							"#40c057",
							"#82c91e",
							"#fab005",
						]}
						className={classes.projectColorInput}
						value={colorValue}
						onChange={setColorValue}
					/>
					<TextInput
						className={classes.projectTitleInput}
						placeholder="Project Name"
						name="projectName"
						value={formInput}
						onChange={inputHandler}
						required
					/>
				</div>
			</div>
			<div className={classes.actions}>
				<Button
					type="submit"
					color="blue"
					onClick={() => {
						submitHandler()
						setOpened(false)
						setFormInput("")
					}}
				>
					Add Project
				</Button>
				<Button
					variant="outline"
					color="gray"
					onClick={() => {
						console.log("Hi")
						setOpened(false)
					}}
				>
					Cancel
				</Button>
			</div>
		</form>
	)

	return (
		<>
			<div onClick={props.backdropClick} className={classes.backdrop}></div>
			<motion.div
				initial={{ x: "-100%" }}
				animate={{ x: 0 }}
				exit={{ x: "-100%" }}
				transition={{ type: "tween", duration: 0.2 }}
				onClick={(e) => {
					e.preventDefault()
					e.stopPropagation()
				}}
				className={classes.menu}
			>
				<div className={classes.container}>
					<div className={classes.mainMenu}>
						<MenuItem
							{...props}
							name={"All Todos"}
							link={"/app"}
							icon={
								<Inbox size={20} strokeWidth={2} color={"rgb(0, 157, 255)"} />
							}
						/>
						<MenuItem
							{...props}
							name={"Unassigned"}
							link={"/app/unassigned"}
							icon={
								<FilterOff
									size={20}
									strokeWidth={2}
									color={"rgb(0, 160, 82)"}
								/>
							}
						/>
						<MenuItem
							{...props}
							name={"Today"}
							link={"/app/today"}
							style={{ color: "rgb(0, 106, 255)" }}
							num={numberOfTodosToday() === 0 ? "" : numberOfTodosToday()}
							icon={
								<Calendar
									size={20}
									strokeWidth={2}
									color={"rgb(225, 154, 19)"}
								/>
							}
						/>
					</div>
					<div className={classes.secondaryMenu}>
						<div className={classes.sectionTitle}>
							<Popover
								closeOnClickOutside={false}
								trapFocus={false}
								opened={opened}
								onClose={() => setOpened(false)}
								target={
									<Plus
										size={20}
										strokeWidth={1}
										color={"gray"}
										style={{ cursor: "pointer" }}
										onClick={() => setOpened((o) => !o)}
									/>
								}
								width={300}
								withArrow
								position="right"
							>
								{form}
							</Popover>

							<h2>Projects</h2>
						</div>
						<div className={classes.projects}>
							{projects &&
								projects
									.filter((project) => project.data.user === user?.uid)
									.map((project) => {
										return (
											<MenuItem
												{...props}
												key={project.id}
												num={numberOfTodos(project.data.name)}
												link={`/app/project/${project.id}`}
												name={project.data.name}
												icon={
													<Circle
														size={13}
														fill={project.data.color}
														strokeWidth={1}
														color={project.data.color}
													/>
												}
											>
												<Menu
													control={
														<button
															onClick={(e) => {
																e.preventDefault()
																e.stopPropagation()
															}}
															className={classes.dotBtn}
														>
															<Dots
																className={classes.dots}
																size={15}
																strokeWidth={2}
																color={"gray"}
															/>
														</button>
													}
													className={classes.dots}
												>
													<Menu.Label>Options</Menu.Label>
													<Menu.Item
														onClick={async (e) => {
															e.preventDefault()
															e.stopPropagation()
															await deleteDoc(doc(db, "projects", project.id))
															if (router.asPath === `/project/${project.id}`)
																router.push("/app")
														}}
														color="red"
														icon={<Trash size={14} />}
													>
														Delete Project
													</Menu.Item>
												</Menu>
											</MenuItem>
										)
									})}
						</div>
					</div>
				</div>
			</motion.div>
		</>
	)
}
