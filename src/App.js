import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from "./Screens/ProfileScreen";

function App() {
	const user = useSelector(selectUser); //null;
	/* {
		name: "ooje",
	}; */
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			if (userAuth) {
				//loggedin
				dispatch(
					login({
						uid: userAuth.uid,
						email: userAuth.email,
					})
				);
			} else {
				//logged out
				dispatch(logout());
			}
		});

		return unsubscribe;
	}, [dispatch]);

	return (
		<div className="app">
			{!user ? (
				<LoginScreen />
			) : (
				<Routes>
					<Route path="/profile" element={<ProfileScreen />} />
					<Route exact path="/" element={<HomeScreen />} />
				</Routes>
			)}
		</div>
	);
}

export default App;
