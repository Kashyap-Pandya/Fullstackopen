import React from "react";

const PersonForm = ({
	handleName,
	handleNumber,
	newName,
	newNumber,
	addName,
}) => {
	return (
		<>
			<form onSubmit={addName}>
				<div>
					Name:{" "}
					<input type='text' value={newName} onChange={handleName} />
				</div>
				<div>
					Number:{" "}
					<input
						type='text'
						value={newNumber}
						onChange={handleNumber}
					/>
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
		</>
	);
};

export default PersonForm;
