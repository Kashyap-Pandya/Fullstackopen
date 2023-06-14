import Part from "./Part";

const Content = (props) => {
	const { part1, part2, part3 } = props
	return (
		<>
			<Part part={part1} />
			<Part part={part2} />
			<Part part={part3} />
		</>
	);
};

export default Content;
