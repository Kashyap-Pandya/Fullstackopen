import React, { useEffect, useState, useRef } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import Notification from "./Components/Notification";
import personService from "./services/persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [notification, setNotification] = useState({
		message: null,
		type: "",
	});
	const timeoutRef = useRef(null);

	useEffect(() => {
		personService.getAll().then((response) => {
			setPersons(response);
		});
	}, []);

	const addName = (e) => {
		e.preventDefault();
		if (newName.length === 0 || newNumber.length === 0) return;

		const existingPerson = persons.find((person) => {
			const existingName = person?.name
				.toLowerCase()
				.split(" ")
				.sort()
				.join(" ");
			const newNameSorted = newName
				.toLowerCase()
				.split(" ")
				.sort()
				.join(" ");
			return existingName === newNameSorted;
		});

		if (existingPerson) {
			if (
				window.confirm(
					`${newName} is already added to the phonebook, replace the old number with a new one?`
				)
			) {
				const updatedPerson = { ...existingPerson, number: newNumber };

				personService
					.updatePerson(existingPerson.id, updatedPerson)
					.then((response) => {
						if (response === null) {
							showNotification(
								` ${existingPerson.name} has already been removed`,
								"error"
							);
							setPersons(
								persons.filter(
									(person) => person.id !== existingPerson.id
								)
							);
						} else {
							setPersons(
								persons.map((person) =>
									person.id !== existingPerson.id
										? person
										: response
								)
							);
							setNewName("");
							setNewNumber("");
							showNotification(
								`Updated ${newName}'s number`,
								"success"
							);
						}
					})
					.catch((error) => {
						showNotification("Failed to update person", "error");
					});
			}
		} else {
			const nameObj = {
				name: newName,
				number: newNumber,
				id: persons?.length
					? String(Math.max(...persons.map((p) => p?.id || 0)) + 1)
					: "1",
			};

			personService
				.create(nameObj)
				.then((response) => {
					setPersons(persons.concat(response));
					setNewName("");
					setNewNumber("");
					showNotification(
						`${nameObj.name} added to the phonebook`,
						"success"
					);
				})
				.catch((error) => {
					showNotification("Failed to create person", "error");
				});
		}
	};

	const showNotification = (message, type) => {
		setNotification({ message, type });
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => {
			setNotification({ message: null, type: "" });
		}, 5000);
	};

	const handleName = (e) => {
		setNewName(e.target.value);
	};

	const handleNumber = (e) => {
		setNewNumber(e.target.value);
	};

	const handleDelete = (id) => {
		const person = persons.find((p) => p.id === id);
		if (!person) return;

		if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
			personService
				.deletePerson(id)
				.then(() => {
					setPersons(persons.filter((p) => p.id !== id));
					showNotification(
						`${person.name} deleted from phonebook`,
						"success"
					);
				})
				.catch((error) => {
					showNotification("Failed to delete person", "error");
				});
		}
	};

	const filteredPersons = filter
		? persons?.filter((person) =>
				person?.name?.toLowerCase().includes(filter.toLowerCase())
		  )
		: persons;

	return (
		<div>
			<h2>PhoneBook</h2>
			{notification.message && (
				<Notification
					message={notification.message}
					type={notification.type}
				/>
			)}
			<Filter filter={filter} setFilter={setFilter} />

			<h3>Add a new</h3>
			<PersonForm
				newName={newName}
				newNumber={newNumber}
				addName={addName}
				handleName={handleName}
				handleNumber={handleNumber}
			/>

			<h3>Phone Numbers</h3>
			<Persons persons={filteredPersons} handleDelete={handleDelete} />
		</div>
	);
};

export default App;
