import { Button, Popover, Select, Textarea, TextInput } from "@mantine/core"
import { DatePicker } from "@mantine/dates"

import { useRef, useState } from "react"
import classes from "./NewToDoOptions.module.css"
import useFirestoreCollection from "../../hooks/useFirestoreCollection"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import { db } from "../../pages/api/firebase"

export default function NewToDoOptions(props) {
	const todoTitle = useRef()
	const todoDescription = useRef()
	const todoDate = useRef()
	const todoProject = useRef()

	const projects = useFirestoreCollection("projects").map((project) => {
		return { value: project.data.name, label: project.data.name }
	})

	async function formHandler(e) {
		e.preventDefault()
		if (todoTitle.current.value.length < 1) return

		const docRef = await addDoc(collection(db, "todos"), {
			title: todoTitle.current.value,
			description: todoDescription.current.value,
			dueDate: todoDate.current.value,
			project: todoProject.current.value,
			dateAdded: Timestamp.now(),
			completed: false,
		})
	}

	return (
		<div className={classes.main}>
			<form onSubmit={formHandler}>
				<div className={props.border ? classes.border : ""}>
					<div className={classes.mainOptions}>
						<TextInput
							variant="filled"
							placeholder="New To-Do"
							ref={todoTitle}
							required
						/>
						<Textarea
							placeholder="Description"
							variant="filled"
							ref={todoDescription}
						/>
					</div>
					<div className={classes.secondaryOptions}>
						<DatePicker
							placeholder="Pick date"
							variant="filled"
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
							placeholder="Project"
							variant="filled"
							data={projects}
							ref={todoProject}
							allowDeselect
						/>
					</div>
				</div>
				<div className={classes.actions}>
					<Button type="submit" onClick={props.addTaskBtn} color="blue">
						Add Task
					</Button>
					<Button onClick={props.cancelBtn} variant="outline" color="gray">
						Cancel
					</Button>
				</div>
			</form>
		</div>
	)
}
