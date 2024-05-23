import { useEffect, useRef, useState } from "react";
import axios from "axios";

const App = () => {
	const [country, setCountry] = useState("finland");
	const [viewCountry, setViewCountry] = useState({});
	const [search, setSearch] = useState("");
	const [allCountries, setAllCountries] = useState("");
  
	// Check if it's the first render
	const checkFirstRender = useRef(true);

	useEffect(() => {
		if (checkFirstRender.current) {
			checkFirstRender.current = false;
			return;
		}
		let URL = "https://studies.cs.helsinki.fi/restcountries/api/name/";
		axios.get(`${URL}${country}`).then((response) => {
			console.log(response.data);
			const data = response.data;
			const countryData = {
				name: data.name.common,
				capital: data.capital[0],
				currency: Object.values(data.currencies)[0].name,
				languages: Object.values(data.languages).join(", "),
				flag: data.flags.svg,
			};
			setViewCountry(countryData);
		});
	}, [country]);

	console.log(viewCountry, "Data");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(country);
		setSearch(country);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor='country'>Find Countries </label>
				<input
					type='search'
					name='country'
					id=''
					value={country}
					onChange={(e) => setCountry(e.target.value)}
				/>
			</form>
			<div>
				{viewCountry.name && (
					<div>
						<h1>{viewCountry.name}</h1>
						<p>Capital: {viewCountry.capital}</p>
						<p>Currency: {viewCountry.currency}</p>
						<p>Languages: {viewCountry.languages}</p>
						<img
							src={viewCountry.flag}
							alt={`Flag of ${viewCountry.name}`}
							width='100'
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
