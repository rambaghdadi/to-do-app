import MainPage from "../components/Main/MainPage"
import useFirestoreCollection from "../hooks/useFirestoreCollection"

export default function Home() {
	const data = useFirestoreCollection("todos")

	return <MainPage data={data} projectTitle={"All Todos"} custom />
}
