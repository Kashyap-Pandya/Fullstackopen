import { useState, useEffect } from "react";
import axios from "axios";

const api_key = import.meta.env.VITE_OPEN_WEATHER;

const App = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [countries, setCountries] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const [selectedCountry, setSelectedCountry] = useState(null);
	const [weather, setWeather] = useState(null);

	const fetchCountries = async () => {
		// Fetching all countries
		try {
			const response = await axios.get(
				"https://studies.cs.helsinki.fi/restcountries/api/all"
			);
			setCountries(response.data);
			setErrorMessage("");
		} catch (error) {
			console.error("Error fetching countries:", error);
			setCountries([]);
			setErrorMessage("Failed to fetch countries");
		}
	};

	const fetchWeather = async (lat, lon) => {
		//fetching weather of selected country's capital
		try {
			const response = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
			);
			setWeather(response.data);
		} catch (error) {
			console.error("Error fetching weather data:", error);
		}
	};

	useEffect(() => {
		fetchCountries();
	}, []);

	const handleInputChange = (event) => {
		setSearchQuery(event.target.value);
		setSelectedCountry(null); // Reset selected country when input changes
		setWeather(null); // Reset weather data when input changes
	};

	const handleCountryClick = (country) => {
		//handle show button
		setSelectedCountry(country);
		if (country.capitalInfo && country.capitalInfo.latlng) {
			const [lat, lon] = country.capitalInfo.latlng;
			fetchWeather(lat, lon);
		}
	};

	const renderCountryDetails = (country) => (
		<div>
			<h2>{country.name.common}</h2>
			<p>Capital: {country.capital[0]}</p>
			<p>Area: {country.area} sq km</p>
			<p>Languages: {Object.values(country.languages).join(", ")}</p>
			<p>
				Capital Coordinates:{" "}
				{country.capitalInfo?.latlng
					? `Latitude: ${country.capitalInfo.latlng[0]}, Longitude: ${country.capitalInfo.latlng[1]}`
					: "N/A"}
			</p>
			<img src={country.flags.png} alt={`${country.name.common} flag`} />
			{weather && (
				<div>
					<h3>Weather in {country.capital[0]}</h3>
					<p>Temperature: {weather.main.temp}°C</p>
					<p>Weather: {weather.weather[0].description}</p>
					<p>Wind Speed: {weather.wind.speed} m/s</p>
					<p>Wind Direction: {weather.wind.deg}°</p>
					<img
						src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
						alt='Weather icon'
					/>
				</div>
			)}
		</div>
	);

	const renderCountries = () => {
		const filteredCountries = countries.filter((country) =>
			country.name.common
				.toLowerCase()
				.includes(searchQuery.toLowerCase())
		);

		if (filteredCountries.length === 0) {
			return <p>No countries found.</p>;
		} else if (filteredCountries.length > 10) {
			return <p>Please be more specific with your search query.</p>;
		} else if (
			//if only one country matches fetch weather and country's detail directly
			filteredCountries.length === 1 &&
			filteredCountries[0].name.common.toLowerCase() ===
				searchQuery.toLowerCase()
		) {
			const country = filteredCountries[0];
			if (!weather && country.capitalInfo && country.capitalInfo.latlng) {
				const [lat, lon] = country.capitalInfo.latlng;
				fetchWeather(lat, lon);
			}
			return renderCountryDetails(country);
		} else {
			return (
				<ul>

					{filteredCountries.map((country) => (
						<li key={country.cca3}>
							<span>{country.name.common}</span>
							<button onClick={() => handleCountryClick(country)}>
								Show
							</button>
						</li>
					))}
				</ul>
			);
		}
	};

	return (
		<div>
			<h1>Country Information</h1>
			<input
				type='text'
				value={searchQuery}
				onChange={handleInputChange}
				placeholder='Enter country name'
			/>
			{errorMessage && <p>{errorMessage}</p>}
			{selectedCountry && (
				<div>
					<button onClick={() => setSelectedCountry(null)}>
						Back
					</button>
					{renderCountryDetails(selectedCountry)}
				</div>
			)}
			{renderCountries()}
		</div>
	);
};

export default App;
