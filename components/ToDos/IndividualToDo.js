import { Menu, Modal } from "@mantine/core"
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { Dots, Trash } from "tabler-icons-react"
import { db } from "../../pages/api/firebase"
import ExpandedToDo from "./ExpandedToDo"
import classes from "./IndividualToDo.module.css"

export default function IndividualToDo(props) {
	const [opened, setOpened] = useState(false)

	async function handleComplete() {
		const docRef = doc(db, "todos", props.id)
		const docSnap = await getDoc(docRef)
		const completed = docSnap.data().completed
		await updateDoc(docRef, {
			completed: !completed,
		})
	}

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title="Todo Details"
			>
				<ExpandedToDo
					{...props}
					updateTaskBtn={() => setOpened(false)}
					cancelBtn={() => setOpened(false)}
				/>
			</Modal>
			<div className={classes.container}>
				<div className={classes.main}>
					<div className={classes.rowOne}>
						<div
							onClick={handleComplete}
							className={
								!props.completed
									? classes.circle
									: `${classes.circle} ${classes.completed}`
							}
						/>
					</div>
					<div onClick={() => setOpened(true)} className={classes.rowTwo}>
						<p>{props.title}</p>
						<p className={classes.date}>{props.dueDate}</p>
					</div>
					<div className={classes.rowThree}>
						<Menu
							control={
								<button
									onClick={(e) => {
										e.preventDefault()
										e.stopPropagation()
									}}
									className={classes.dotBtn}
								>
									<Dots
										// className={classes.dots}
										size={20}
										strokeWidth={2}
										color={"gray"}
									/>
								</button>
							}
							className={classes.dots}
						>
							<Menu.Label>Options</Menu.Label>
							<Menu.Item
								onClick={async (e) => {
									e.preventDefault()
									e.stopPropagation()
									await deleteDoc(doc(db, "todos", props.id))
								}}
								color="red"
								icon={<Trash size={14} />}
							>
								Delete Item
							</Menu.Item>
						</Menu>
					</div>
				</div>
			</div>
		</>
	)
}
