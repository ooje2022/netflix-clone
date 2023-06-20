import React from "react";
import Banner from "../Banner";
import Nav from "../Nav";
import Row from "../Row";
import requests from "../requests";
import "./HomeScreen.css";

function HomeScreen() {
	return (
		<div className="homeScreen">
			<Nav />

			<Banner />

			<Row
				title="Netflix Originals"
				fetchUrl={requests.fetchNetflixOriginals}
				isLargeRow
			/>
			<Row title="Trending Now" fetchUrl={requests.fetchActionMovies} />
			<Row title="Action Movies" fetchUrl={requests.fetchTrending} />
			<Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
			<Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />

			<Row title="Animations" fetchUrl={requests.fetchAnimation} />

			<Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
			<Row title="Scifi Movies" fetchUrl={requests.fetchSciFi} />

			<Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
			<Row title="Mystery Movies" fetchUrl={requests.fetchMystery} />

			<Row title="TV Series / Show" fetchUrl={requests.fetchTV} />
			<Row title="Western Movies" fetchUrl={requests.fetchWestern} />
			<Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
		</div>
	);
}

export default HomeScreen;
