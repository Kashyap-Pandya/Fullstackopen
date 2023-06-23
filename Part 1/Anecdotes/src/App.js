import { useState } from "react";

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"The only way to go fast, is to go well.",
	];

	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0)); // filling the array with 0 and the length is same of anecdotes
	console.log(votes);

	const handleClick = () => {
		const randomAnecdotes = Math.floor(Math.random() * anecdotes.length); //getting the random index from array
		setSelected(randomAnecdotes);
	};

	const handleVote = () => {
		const updatedVotes = [...votes]; //copy the existing votes so we don't override
		updatedVotes[selected] += 1; //increase the vote by 1 on whatever anecdotes is selected
		setVotes(updatedVotes);
	};

	const maxVotesIndex = votes.indexOf(Math.max(...votes)); //giving the index of max vote from array
	const mostVotedAnecdote = anecdotes[maxVotesIndex]; // displaying the most voted anecdotes

	return (
		<>
			<div>
				<h1>Anecdote of the day</h1>
				<div>{anecdotes[selected]}</div>
				<div className='buttons' style={{ marginTop: "1rem" }}>
					<button
						type='button'
						onClick={handleVote}
						style={{ padding: ".5rem", marginRight: ".5rem" }}
					>
						Vote
					</button>
					<button
						type='button'
						onClick={handleClick}
						style={{ padding: ".5rem" }}
					>
						Next Anecdotes
					</button>
				</div>
				<p>
					has {votes[selected]}{" "}
					{votes[selected] <= 1 ? "vote" : "votes"}{" "}
					{/* displaying the vote or votes based on the vote value */}
				</p>
				<h1>Anecdote with most votes is</h1>
				<p>{mostVotedAnecdote}</p>
				<p>
					This anecdotes has {votes[maxVotesIndex]}{" "}
					{votes[maxVotesIndex] <= 1 ? "vote" : "votes"}
				</p>
			</div>
		</>
	);
};

export default App;
