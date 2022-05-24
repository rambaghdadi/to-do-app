import MainPage from "../components/Main/MainPage"
import useFirestoreCollection from "../hooks/useFirestoreCollection"

export default function Today(props) {
	const data = useFirestoreCollection("todos")

	const dateOptions = {
		month: "long",
		day: "numeric",
		year: "numeric",
	}

	return (
		<MainPage
			projectTitle={`Today - ${new Date().toLocaleDateString(
				"en-US",
				dateOptions
			)}`}
			data={data.filter((todo) => {
				return (
					new Date(todo.data.dueDate).toLocaleDateString(
						"en-US",
						dateOptions
					) === new Date().toLocaleDateString("en-US", dateOptions)
				)
			})}
		/>
	)
}
