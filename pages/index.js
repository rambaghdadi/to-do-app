import { Button, Stack } from "@mantine/core"
import { useRouter } from "next/router"

export default function Home() {
	const router = useRouter()
	return (
		<div className="homepage">
			<div style={{ maxWidth: "55rem", textAlign: "center" }}>
				<Stack spacing={30}>
					<h1 style={{ fontSize: "4rem" }}>
						Why pay for a todo app when you can build your own?
					</h1>
					<p style={{ fontSize: "1.8em" }}>
						Includes dark mode, date functionality, search functionality,
						different projects, authentication, and more.
					</p>
				</Stack>
			</div>
			<div style={{ width: 150 }}>
				<Stack>
					<Button onClick={() => router.push("/signin")} size="md">
						Get Started
					</Button>
				</Stack>
			</div>
		</div>
	)
}
