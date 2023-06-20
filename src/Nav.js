import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

function Nav() {
	const [show, setShow] = useState(false);
	const history = useNavigate();

	const transitionNavbar = () => {
		if (window.scrollY > 100) {
			setShow(true);
		} else setShow(false);
	};

	useEffect(() => {
		window.addEventListener("scroll", transitionNavbar);
		return () => window.removeEventListener("scroll", transitionNavbar);
	}, []);

	return (
		<div className={`nav ${show && "nav__black"}`}>
			<div className="nav__contents">
				<img
					className="nav__logo"
					src="https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo.png"
					alt="Netflix Logo"
				/>
				<img
					className="nav__avatar"
					src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
					onClick={() => history("/profile")}
					alt="Nextflix Avatar"
				/>
			</div>
		</div>
	);
}
//https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo.png
export default Nav;
