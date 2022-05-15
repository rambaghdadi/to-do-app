import { Circle, Dots } from "tabler-icons-react"
import classes from "./IndividualToDo.module.css"

export default function IndividualToDo(props) {
	return (
		<div className={classes.container}>
			<div className={classes.main}>
				<div className={classes.rowOne}>
					<Circle size={20} strokeWidth={1} color={"red"} />
				</div>
				<div className={classes.rowTwo}>
					<p>{props.toDoTitle}</p>
					<p className={classes.date}>{props.toDoDate}</p>
				</div>
				<div className={classes.rowThree}>
					<Dots size={20} strokeWidth={2} color={"gray"} />
				</div>
			</div>
		</div>
	)
}
