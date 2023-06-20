import React, { useState } from "react";
import SignupScreen from "./SignupScreen";
import "./LoginScreen.css";

function LoginScreen() {
	const [signIn, setSignIn] = useState(false);

	return (
		<div className="loginScreen">
			<div className="loginScreen__background">
				<img
					className="loginScreen__logo"
					src="https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo.png"
					alt="Nteflix Logo"
				/>
				<button className="loginScreen__button" onClick={() => setSignIn(true)}>
					Sign In
				</button>
				<div className="loginScreen__gradient" />
			</div>
			<div className="loginScreen__body">
				{signIn ? (
					<SignupScreen />
				) : (
					<>
						<h1>Unlimited films, TV programmes and more.</h1>
						<h2>Watch anywhere. Cancel at any time.</h2>
						<h3>
							Ready to watch? Enter your email to create or restart your
							membership.
						</h3>
						<div className="loginScreen__input">
							<form>
								<input type="email" placeholder="Email Address" />
								<button
									className="loginScreen__getStarted"
									onClick={() => setSignIn(true)}
								>
									GET STARTED
								</button>
							</form>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default LoginScreen;
