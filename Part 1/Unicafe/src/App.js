import { useState } from "react";

const Button = ({ handleClick, text }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	);
};

const Statistics = ({ good, neutral, bad }) => {
	const total = good + neutral + bad;
	const average = ((good + neutral + bad) / 3).toFixed(2);
	const positive = ((good / total) * 100).toFixed(2);

	return (
		<div>
			<h1>Statistics</h1>
			{total > 0 ? (
				<table>
					<tbody>
						<StatisticLine text='Good' value={good} />
						<StatisticLine text='Neutral' value={neutral} />
						<StatisticLine text='Bad' value={bad} />
						<StatisticLine text='Average' value={average} />
						<StatisticLine text='Positive' value={`${positive}%`} />
					</tbody>
				</table>
			) : (
				<p>No feedback given</p>
			)}
		</div>
	);
};

function App() {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<h1>Give Feedback</h1>
			<Button handleClick={() => setGood(good + 1)} text='Good'>
				{good}
			</Button>
			<Button handleClick={() => setNeutral(neutral + 1)} text='Neutral'>
				{neutral}
			</Button>
			<Button handleClick={() => setBad(bad + 1)} text='Bad'>
				{bad}
			</Button>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
}

export default App;
