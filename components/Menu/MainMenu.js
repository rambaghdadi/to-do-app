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
import { Button, Popover, TextInput, Menu } from "@mantine/core"
import { db } from "../../pages/api/firebase"
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"
import { useRouter } from "next/router"

export default function MainMenu(props) {
	const [opened, setOpened] = useState(false)
	const [formInput, setFormInput] = useState("")
	const projects = useFirestoreCollection("projects")
	const todos = useFirestoreCollection("todos")
	const router = useRouter()

	// const newProjectName = useRef()

	function inputHandler(e) {
		setFormInput(e.target.value)
	}

	// async function formHandler(e) {
	// 	console.log("form handler")
	// 	e.preventDefault()
	// 	const docRef = await addDoc(collection(db, "projects"), {
	// 		name: newProjectName.current.value,
	// 	})
	// }

	async function submitHandler() {
		const docRef = await addDoc(collection(db, "projects"), {
			name: formInput,
		})
	}

	const dateOptions = {
		month: "long",
		day: "numeric",
		year: "numeric",
	}

	function numberOfTodos(projectName) {
		return todos.filter((todo) => {
			return todo.data.project.includes(projectName)
		}).length
	}

	const form = (
		<form
			className={classes.form}
			onSubmit={(e) => {
				e.preventDefault()
				console.log("ON SUBMIT")
			}}
		>
			<div className={classes.options}>
				<div className={classes.mainOptions}>
					<TextInput
						placeholder="Project Name"
						// ref={newProjectName}
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
					color="red"
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
							link={"/"}
							icon={
								<Inbox size={20} strokeWidth={1} color={"rgb(0, 157, 255)"} />
							}
						/>
						<MenuItem
							{...props}
							name={"Unassigned"}
							link={"/unassigned"}
							icon={
								<FilterOff
									size={20}
									strokeWidth={1}
									color={"rgb(0, 160, 82)"}
								/>
							}
						/>
						<MenuItem
							{...props}
							name={"Today"}
							link={"/today"}
							style={{ color: "#dd4b39" }}
							num={
								todos.filter((todo) => {
									return (
										new Date(todo.data.dueDate).toLocaleDateString(
											"en-US",
											dateOptions
										) === new Date().toLocaleDateString("en-US", dateOptions)
									)
								}).length
							}
							icon={
								<Calendar
									size={20}
									strokeWidth={1}
									color={"rgb(162, 0, 255)"}
								/>
							}
						/>
					</div>
					<div className={classes.secondaryMenu}>
						{/* {form} */}
						<div className={classes.sectionTitle}>
							<Popover
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
								// width={260}
								position="right"
								withArrow
							>
								{form}
							</Popover>

							<h2>Projects</h2>
						</div>
						<div className={classes.projects}>
							{projects &&
								projects.map((project) => {
									return (
										<MenuItem
											{...props}
											key={project.id}
											num={numberOfTodos(project.data.name)}
											link={`/project/${project.id}`}
											name={project.data.name}
											icon={
												<Circle
													size={13}
													fill={"rgb(0, 160, 82)"}
													strokeWidth={1}
													color={"rgb(0, 160, 82)"}
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
															router.push("/")
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
