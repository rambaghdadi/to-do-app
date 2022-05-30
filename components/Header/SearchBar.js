import { Modal, TextInput } from "@mantine/core"
import { useState } from "react"
import { Search, X } from "tabler-icons-react"
import useFirestoreCollection from "../../hooks/useFirestoreCollection"
import classes from "./SearchBar.module.css"
import ExpandedToDo from "../ToDos/ExpandedToDo"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../pages/api/firebase"

export default function SearchBar(props) {
	const [opened, setOpened] = useState(false)
	const [search, setSearch] = useState(false)
	const [initialiseSearch, setInitialiseSearch] = useState(false)
	const [searchInput, setSearchInput] = useState("")
	const [searchedItem, setSearchedItem] = useState({
		id: "",
		key: "",
		title: "",
		dueDate: "",
		project: "",
		description: "",
	})

	const data = useFirestoreCollection("todos")
	const projectData = useFirestoreCollection("projects")

	function getColor(projectName) {
		for (let x of projectData) {
			if (x.data.name === projectName) return x.data.color
		}
	}

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title="Todo Details"
			>
				<ExpandedToDo
					{...props}
					key={searchedItem.id}
					id={searchedItem.id}
					title={searchedItem.title}
					dueDate={searchedItem.dueDate}
					project={searchedItem.project}
					description={searchedItem.description}
					updateTaskBtn={() => setOpened(false)}
					cancelBtn={() => setOpened(false)}
				/>
			</Modal>
			<div
				className={
					!initialiseSearch
						? classes.search
						: `${classes.search} ${classes.searching}`
				}
			>
				<Search
					className={classes.searchIcon}
					size={25}
					strokeWidth={1}
					color={"white"}
					onClick={() => setInitialiseSearch(true)}
				/>

				<TextInput
					onFocus={() => setSearch(true)}
					onBlur={() => {
						setTimeout(() => {
							setSearch(false)
							setSearchInput("")
							setInitialiseSearch(false)
						}, 100)
					}}
					size="sm"
					className={classes.searchInput}
					autoComplete="off"
					variant="filled"
					placeholder="Search"
					onChange={(e) => setSearchInput(e.target.value)}
					value={searchInput}
					icon={<Search size={20} />}
					rightSection={
						<X
							className={classes.xButton}
							size={20}
							color={"grey"}
							onClick={() => {
								setSearchInput("")
								setInitialiseSearch(false)
								setSearch(false)
							}}
						/>
					}
				/>
				{search && (
					<div className={classes.searchResultsContainer}>
						{data
							.filter((todo) =>
								todo.data.title
									.toLowerCase()
									.includes(searchInput.toLowerCase())
							)
							.map((todo) => (
								<div
									key={todo.id}
									onClick={() => {
										setSearch(false)
										setSearchedItem({
											id: todo.id,
											key: todo.id,
											title: todo.data.title,
											dueDate: todo.data.dueDate,
											project: todo.data.project,
											description: todo.data.description,
										})
										setOpened(true)
									}}
									className={classes.searchResult}
								>
									<div className={classes.searchItem}>
										<p>{todo.data.title}</p>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												gap: "0.5rem",
											}}
										>
											<div
												style={{
													backgroundColor: getColor(todo.data.project),
													width: "7px",
													height: "7px",
													borderRadius: "50%",
												}}
											/>
											<p style={{ fontSize: "1.2rem" }}>
												{todo.data.project ? todo.data.project : "Unassigned"}
											</p>
										</div>
									</div>
								</div>
							))}
					</div>
				)}
			</div>
		</>
	)
}
