import PageHeading from "./PageHeading"
import classes from "./MainPage.module.css"

export default function MainPage(props) {
	return (
		<div className={classes.main}>
			<PageHeading {...props} />
			<div>{props.children}</div>
		</div>
	)
}
