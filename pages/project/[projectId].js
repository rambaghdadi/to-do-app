import { doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ToDoContainer from "../../components/ToDos/ToDoContainer"
import IndividualToDo from "../../components/ToDos/IndividualToDo"
import useFirestoreCollection from "../../hooks/useFirestoreCollection"
import { db } from "../api/firebase"
import MainPage from "../../components/Main/MainPage"
import CompletedToDoContainer from "../../components/ToDos/CompletedToDoContainer"

export default function Project() {
	const router = useRouter()
	const [projectName, setProjectName] = useState(null)
	const { projectId } = router.query
	const data = useFirestoreCollection("todos")

	async function getProjectDetails() {
		try {
			const docRef = doc(db, "projects", projectId)
			const docSnap = await getDoc(docRef)

			if (docSnap.exists()) {
				setProjectName(docSnap.data().name)
			} else {
				router.push("/404")
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getProjectDetails()
	}, [projectId, projectName, setProjectName])

	return (
		<MainPage
			projectTitle={projectName}
			data={data.filter((todo) => {
				return todo.data.project.includes(projectName)
			})}
		/>
	)
}
