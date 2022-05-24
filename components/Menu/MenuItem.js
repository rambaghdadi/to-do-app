import classes from "./MenuItem.module.css"
import { useRouter } from "next/router"

export default function MenuItem(props) {
	const router = useRouter()

	return (
		<div
			onClick={() => {
				router.replace(props.link)
				props.close()
			}}
			className={
				router.asPath === props.link
					? `${classes.main} ${classes.active}`
					: classes.main
			}
		>
			{props.icon}
			<p>{props.name}</p>
			<p style={props.style} className={classes.num}>
				{props.num}
			</p>
			<div className={classes.dots}>{props.children}</div>
		</div>
	)
}
