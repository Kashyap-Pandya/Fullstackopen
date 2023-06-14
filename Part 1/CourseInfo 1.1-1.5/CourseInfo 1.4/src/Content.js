import Part from "./Part";

const Content = (props) => {
	const { parts } = props;
	return (
		<>
			<Part part={parts[0]} />
			<Part part={parts[1]} />
			<Part part={parts[2]} />
		</>
	);
};

export default Content;
