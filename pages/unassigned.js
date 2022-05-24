import MainPage from "../components/Main/MainPage"
import PageHeading from "../components/Main/PageHeading"
import CompletedToDoContainer from "../components/ToDos/CompletedToDoContainer"
import IndividualToDo from "../components/ToDos/IndividualToDo"
import ToDoContainer from "../components/ToDos/ToDoContainer"
import useFirestoreCollection from "../hooks/useFirestoreCollection"

export default function Unassigned(props) {
	const data = useFirestoreCollection("todos")

	return (
		<MainPage
			data={data.filter((todo) => todo.data.project === "")}
			projectTitle={"Unassigned"}
		/>
	)
}
