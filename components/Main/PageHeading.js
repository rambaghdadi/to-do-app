import classes from "./PageHeading.module.css"

export default function PageHeading(props) {
	return (
		<div className={classes.main}>
			<h1>{props.projectTitle}</h1>
		</div>
	)
}
