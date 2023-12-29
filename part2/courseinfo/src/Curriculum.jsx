const Curriculum = ({ courses }) => {
	return (
		<div>
			{courses.map(course =>
				<div key={course.id}>
					<h2>{course.name}</h2>
					<Content course={course} />
					<Total course={course} />
				</div>
			)}
		</div>
	)
}

const Content = ({ course }) => {
	return (
		course.parts.map(part =>
			<div key={part.id}>
				{part.name} {part.exercises}
			</div>
		)
	)
}

const Total = ({ course }) => {
	const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
	return (
		<div>
			<p>
				<b>total of {total} exercises</b>
			</p>
		</div>
	)
}

export default Curriculum