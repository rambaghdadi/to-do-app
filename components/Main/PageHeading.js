import classes from "./PageHeading.module.css"
import { SortAscending2 } from "tabler-icons-react"
import { SortDescending2 } from "tabler-icons-react"

export default function PageHeading(props) {
	const icon = props.ascending ? (
		<SortDescending2 size={20} />
	) : (
		<SortAscending2 size={20} />
	)

	return (
		<div className={classes.main}>
			<h1>{props.projectTitle}</h1>
			<div onClick={props.onClickSort} className={classes.sortSection}>
				{icon}
				<p>Sort by Date</p>
			</div>
		</div>
	)
}
