import { Plus } from "tabler-icons-react"
import classes from "./NewToDo.module.css"

export default function NewToDo(props) {
	return (
		<div onClick={props.onClick} className={classes.main}>
			<Plus size={20} strokeWidth={1} color={"rgb(0, 106, 255)"} />
			<p>Add To-Do</p>
		</div>
	)
}
