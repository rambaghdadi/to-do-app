import { collection, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../pages/api/firebase"

export default function useFirestoreCollection(collectionName) {
	const [data, setData] = useState([])

	useEffect(() => {
		const unsub = onSnapshot(collection(db, collectionName), (snapshot) => {
			setData(
				snapshot.docs.map((doc) => {
					return { data: doc.data(), id: doc.id }
				})
			)
		})

		return () => {
			unsub()
		}
	}, [])

	return data
}
