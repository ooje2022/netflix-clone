import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
	const [movie, setMovie] = useState([]);
	const truncate = (str, n) => {
		return str?.length > n ? str.substr(0, n - 1) + ". . ." : str;
	};

	useEffect(() => {
		async function fecthData() {
			const response = await axios.get(requests.fetchTrending);
			setMovie(
				response.data.results[
					Math.floor(Math.random() * response.data.results.length - 1)
				]
			);
			return response;
		}
		fecthData();
	}, []);
	return (
		<header
			className="banner"
			style={{
				backgroundSize: "cover",
				backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
				backgroundPosition: "center center",
			}}
		>
			<div className="banner__contents">
				<h1 className="banner__title">
					{movie.title || movie?.name || movie?.original_name}
				</h1>
				<div className="banner__buttons">
					<button className="banner__button">Play</button>
					<button className="banner__button">My List</button>
				</div>
				<p className="banner__description">{truncate(movie?.overview, 250)}</p>
			</div>
			<div className="banner__fadeBottom" />
		</header>
	);
}
//"https://cdn.wallpapersafari.com/24/74/zgeTuV.jpg
export default Banner;
