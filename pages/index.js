import MainPage from "../components/Main/MainPage"
import IndividualToDo from "../components/ToDos/IndividualToDo"
import ToDoContainer from "../components/ToDos/ToDoContainer"
import useFirestoreCollection from "../hooks/useFirestoreCollection"

export default function Home() {
	const toDos = useFirestoreCollection("todos")

	return (
		<MainPage projectTitle={"All Todos"}>
			<ToDoContainer>
				{toDos.map((todo, i) => {
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
