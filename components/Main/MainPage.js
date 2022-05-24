import PageHeading from "./PageHeading"
import classes from "./MainPage.module.css"
import { useEffect, useState } from "react"
import useFirestoreCollection from "../../hooks/useFirestoreCollection"
import IndividualToDo from "../ToDos/IndividualToDo"
import ToDoContainer from "../ToDos/ToDoContainer"
import CompletedToDoContainer from "../ToDos/CompletedToDoContainer"

export default function MainPage(props) {
	const [todos, setTodos] = useState([])
	const [ascending, setAscending] = useState(true)
	const [completedTodos, setCompletedTodos] = useState()
	const [uncompletedTodos, setUncompletedTodos] = useState()

	const data = props.data

	useEffect(() => {
		setTodos(
			data.sort((a, b) => new Date(a.data?.dueDate) - new Date(b.data?.dueDate))
		)
	}, [data])

	useEffect(() => {
		setUncompletedTodos(renderToDos(false))
		setCompletedTodos(renderToDos(true))
	}, [todos])

	function sortHandler() {
		if (ascending) {
			setTodos((prev) => {
				return [...prev].sort(
					(a, b) => new Date(b.data?.dueDate) - new Date(a.data?.dueDate)
				)
			})
			setAscending(false)
		}
		if (!ascending) {
			setTodos((prev) => {
				return [...prev].sort(
					(a, b) => new Date(a.data?.dueDate) - new Date(b.data?.dueDate)
				)
			})
			setAscending(true)
		}
	}

	function renderToDos(completed) {
		return todos
			.filter((todo) => todo.data.completed === completed)
			.map((todo) => {
				return (
					<IndividualToDo
						key={todo.id}
						id={todo.id}
						title={todo.data.title}
						dueDate={todo.data.dueDate}
						project={todo.data.project}
						description={todo.data.description}
						completed={todo.data.completed}
					/>
				)
			})
	}
	return (
		<div className={classes.main}>
			<PageHeading onClickSort={sortHandler} ascending={ascending} {...props} />
			<div>
				<ToDoContainer>{uncompletedTodos}</ToDoContainer>
				<CompletedToDoContainer>{completedTodos}</CompletedToDoContainer>
			</div>
		</div>
	)
}
