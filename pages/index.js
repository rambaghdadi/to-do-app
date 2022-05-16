import MainPage from "../components/Main/MainPage"
import CompletedToDoContainer from "../components/ToDos/CompletedToDoContainer"
import IndividualToDo from "../components/ToDos/IndividualToDo"
import ToDoContainer from "../components/ToDos/ToDoContainer"
import useFirestoreCollection from "../hooks/useFirestoreCollection"

export default function Home() {
	const toDos = useFirestoreCollection("todos")

	function renderToDos(completed) {
		const todos = toDos
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
		<MainPage projectTitle={"All Todos"}>
			<ToDoContainer>{renderToDos(false)}</ToDoContainer>
			<CompletedToDoContainer>{renderToDos(true)}</CompletedToDoContainer>
		</MainPage>
	)
}
