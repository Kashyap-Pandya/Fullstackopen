import Part from "./Part";

const Content = (props) => {
	const { part1, exercises1, part2, exercises2, part3, exercises3 } = props;
	console.log("content", props);
	return (
		<>
			<Part part1={part1} exercises1={exercises1} />
			<Part part2={part2} exercises2={exercises2} />
			<Part part3={part3} exercises3={exercises3} />
		</>
	);
};
export default Content;
