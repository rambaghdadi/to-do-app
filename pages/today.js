import MainPage from "../components/Main/MainPage"
import PageHeading from "../components/Main/PageHeading"
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

	return (
		<MainPage projectTitle={"Today"}>
			<ToDoContainer>
				{toDos
					.filter((todo) => {
						return (
							new Date(todo.data.dueDate).toLocaleDateString(
								"en-US",
								dateOptions
							) === new Date().toLocaleDateString("en-US", dateOptions)
						)
					})
					.map((todo, i) => {
						return (
							<IndividualToDo
								key={i}
								toDoTitle={todo.data.title}
								toDoDate={todo.data.dueDate}
							/>
						)
					})}
			</ToDoContainer>
		</MainPage>
	)
}
