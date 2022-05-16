import { useState } from "react"
import NewToDo from "./NewToDo"
import NewToDoOptions from "./NewToDoOptions"
import classes from "./ToDoContainer.module.css"

export default function ToDoContainer(props) {
	const [newToDo, setNewToDo] = useState(false)

	return (
		<div className={classes.main}>
			{props.children}
			{!newToDo && <NewToDo onClick={() => setNewToDo(true)} />}
			{newToDo && (
				<NewToDoOptions
					{...props}
					border={true}
					cancelBtn={() => setNewToDo(false)}
					addTaskBtn={() => {
						setTimeout(() => {
							setNewToDo(false)
						}, 10)
					}}
				/>
			)}
		</div>
	)
}
