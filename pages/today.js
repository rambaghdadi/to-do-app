import MainPage from "../components/Main/MainPage"
import PageHeading from "../components/Main/PageHeading"
import CompletedToDoContainer from "../components/ToDos/CompletedToDoContainer"
import IndividualToDo from "../components/ToDos/IndividualToDo"
import ToDoContainer from "../components/ToDos/ToDoContainer"
import useFirestoreCollection from "../hooks/useFirestoreCollection"

export default function Today(props) {
	const toDos = useFirestoreCollection("todos")

	const dateOptions = {
		month: "long",
		day: "numeric",
		year: "numeric",
	}

	function renderToDos(completed) {
		const todos = toDos
			.filter((todo) => {
				return (
					new Date(todo.data.dueDate).toLocaleDateString(
						"en-US",
						dateOptions
					) === new Date().toLocaleDateString("en-US", dateOptions)
				)
			})
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
		return todos
	}

	return (
		<MainPage
			projectTitle={`Today - ${new Date().toLocaleDateString(
				"en-US",
				dateOptions
			)}`}
		>
			<ToDoContainer>{renderToDos(false)}</ToDoContainer>
			<CompletedToDoContainer>{renderToDos(true)}</CompletedToDoContainer>
		</MainPage>
	)
}
