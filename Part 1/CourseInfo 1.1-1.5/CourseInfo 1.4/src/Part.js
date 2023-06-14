
const Part = (props) => {
    const {part} = props
	return (
		<div>
			<p>
				{part.name} {part.exercises}
			</p>
		</div>
	);
};

export default Part;