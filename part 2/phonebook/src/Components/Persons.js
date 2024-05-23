import React from "react";

const Persons = ({ persons, filter, handleDelete }) => {
	const filteredPersons = persons?.filter((person) =>
		person?.name?.toLowerCase().includes(filter?.toLowerCase() || "")
	);

	return (
		<>
			<ul>
				{filteredPersons?.map((person) => (
					<div key={person?.id} style={{ padding: "1rem" }}>
						<li>
							{person?.name} {person?.number}
						</li>

						<button onClick={() => handleDelete(person.id)}>
							Delete
						</button>
					</div>
				))}
			</ul>
		</>
	);
};

export default Persons;
