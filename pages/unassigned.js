import MainPage from "../components/Main/MainPage"
import PageHeading from "../components/Main/PageHeading"
import IndividualToDo from "../components/ToDos/IndividualToDo"
import ToDoContainer from "../components/ToDos/ToDoContainer"
import useFirestoreCollection from "../hooks/useFirestoreCollection"

export default function Unassigned(props) {
	const toDos = useFirestoreCollection("todos")

	return (
		<MainPage projectTitle={"Unassigned"}>
			<ToDoContainer>
				{toDos
					.filter((todo) => todo.data.project === "")
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
