import { Button, Textarea, TextInput, Select } from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import { doc, updateDoc } from "firebase/firestore"
import { useRef } from "react"
import useFirestoreCollection from "../../hooks/useFirestoreCollection"
import { db } from "../../pages/api/firebase"
import classes from "./ExpandedToDo.module.css"

export default function ExpandedToDo(props) {
	const docRef = doc(db, "todos", props.id)
	const todoTitle = useRef()
	const todoDescription = useRef()
	const todoDate = useRef()
	const todoProject = useRef()

	const projects = useFirestoreCollection("projects").map((project) => {
		return { value: project.data.name, label: project.data.name }
	})

	async function handleForm(e) {
		e.preventDefault()
		await updateDoc(docRef, {
			title: todoTitle.current.value,
			description: todoDescription.current.value,
			dueDate: todoDate.current.value,
			project: todoProject.current.value,
		})
	}

	return (
		<div>
			<form onSubmit={handleForm} className={classes.form}>
				<div className={classes.rowOne}>
					<TextInput
						placeholder="Todo Title"
						label=" Title"
						variant="filled"
						required
						defaultValue={props.title}
						ref={todoTitle}
					/>
					<Textarea
						placeholder="Todo Description"
						label="Description"
						variant="filled"
						defaultValue={props.description}
						ref={todoDescription}
					/>
				</div>
				<div className={classes.rowTwo}>
					<DatePicker
						placeholder={props.dueDate ? props.dueDate : "Select Date"}
						defaultValue={props.dueDate}
						ref={todoDate}
					/>
					<Select
						styles={
							document.body.dataset.theme === "dark"
								? {
										dropdown: { color: "white" },
										item: { color: "white" },
										hovered: { color: "#333" },
										selected: { color: "#333" },
								  }
								: ""
						}
						defaultValue={props.project}
						placeholder={props.project ? props.project : "Select Project"}
						data={projects}
						ref={todoProject}
						allowDeselect
					/>
				</div>

				<div className={classes.actions}>
					<Button type="submit" onClick={props.updateTaskBtn} color="blue">
						Update
					</Button>
					<Button onClick={props.cancelBtn} variant="outline" color="gray">
						Close
					</Button>
				</div>
			</form>
		</div>
	)
}
