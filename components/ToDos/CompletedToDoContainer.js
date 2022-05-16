import { useState } from "react"
import { ChevronDown, ChevronRight } from "tabler-icons-react"
import classes from "./CompletedToDoContainer.module.css"

export default function CompletedToDoContainer(props) {
	const [visible, setVisible] = useState(true)

	return (
		<div className={classes.main}>
			<div onClick={() => setVisible(!visible)} className={classes.title}>
				{visible ? (
					<ChevronDown color="gray" size={20} />
				) : (
					<ChevronRight size={20} color="gray" />
				)}
				<p>Completed Todos</p>
			</div>
			{visible && <div className={classes.todos}>{props.children}</div>}
		</div>
	)
}
