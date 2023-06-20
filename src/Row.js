import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Row.css";

function Row({ title, fetchUrl, isLargeRow = false }) {
	const base_url = " https://image.tmdb.org/t/p/original";
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		async function fecthData() {
			const response = await axios.get(fetchUrl);
			setMovies(response.data.results);
			return response;
		}

		fecthData();
	}, [fetchUrl]);

	return (
		<div className="row">
			<h2>{title}</h2>
			<div className="row__posters">
				{movies.map(
					(movie) =>
						((isLargeRow && movie.poster_path) ||
							(!isLargeRow && movie.backdrop_path)) && (
							<img
								className={`row__poster ${isLargeRow && "row__posterLarge"}`}
								key={movie.id}
								src={`${base_url}${
									isLargeRow ? movie.poster_path : movie.backdrop_path
								}`}
								alt={movie.name}
							/>
						)
				)}
			</div>
		</div>
	);
}

export default Row;
