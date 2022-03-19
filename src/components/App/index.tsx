import React, {useState} from "react";
import ToDos from "../Todos";
import {AppContext} from "../../context";
import {useAuth} from "../../hooks/auth";
import SignInOrUp from "../Authorization";
import Layout, {Header, Main, Footer, Box} from "../Layout";

import "./styles.scss";

export type TaskFilter = "all" | "active" | "completed"

const App: React.FC = () => {
	const {token, login, logout, userId} = useAuth();
	const local = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") as string) : null;
	const isAuthenticated = (local && !!local.token) || !!token;
	const [isLogined, setIsLogined] = useState<boolean>(isAuthenticated);
	return (
		<AppContext.Provider value={{
			token, login, logout, userId, isAuthenticated
		}}>
			<Layout>
				<Header>
					<a href="/"><h1>toDos</h1></a>
				</Header>
				<Main>
					<Box>
						{isLogined ? <ToDos /> : <SignInOrUp setIsLogined={setIsLogined} />}
					</Box>
				</Main>
				<Footer>Created by <a href="http://github.com/grendd">grendd</a> | 2021</Footer>
			</Layout>
		</AppContext.Provider>
	);
};

export default App;
