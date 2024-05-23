import React from "react";
import Notification from "./Notification";

const Filter = ({ filter, setFilter, message }) => {
	return (
		<div>
			<Notification message={message} />
			<p>
				Filter shown with{" "}
				<input
					type='text'
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				/>
			</p>
		</div>
	);
};

export default Filter;
