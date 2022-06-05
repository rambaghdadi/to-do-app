import MainPage from "../../components/Main/MainPage"
import useFirestoreCollection from "../../hooks/useFirestoreCollection"

export default function Unassigned(props) {
	const data = useFirestoreCollection("todos")

	return (
		<MainPage
			data={data.filter((todo) => todo.data.project === "")}
			projectTitle={"Unassigned"}
		/>
	)
}
