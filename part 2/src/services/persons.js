import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = async () => {
	try {
		const response = await axios.get(baseURL);
		return response.data;
	} catch (error) {
		console.error("Failed to fetch persons", error);
	}
};

const create = async (newObject) => {
	try {
		const response = await axios.post(baseURL, newObject);
		return response.data;
	} catch (error) {
		console.error("Failed to create person", error);
	}
};

const deletePerson = async (id) => {
	try {
		await axios.delete(`${baseURL}/${id}`);
		return id;
	} catch (error) {
		console.error("Failed to delete person", error);
	}
};

const updatePerson = async (id, updatedObject) => {
	try {
		const response = await axios.put(`${baseURL}/${id}`, updatedObject);
		return response.data;
	} catch (error) {
		if (error.response && error.response.status === 404) {
			return null;
		} else {
			console.error("Failed to update person", error);
			throw error;
		}
	}
};

export default { getAll, create, deletePerson, updatePerson };
