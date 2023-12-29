const Person = ({ person, filter }) => {
    if (person.name.toUpperCase().includes(filter.toUpperCase())) {
        return (
            <div key={person.name}>{person.name} {person.number}</div>
        )
    }
}

const Content = ({ persons, newFilter }) => {
    return (
        <div>
            {persons.map(person =>
                <Person key={person.name} person={person} filter={newFilter} />
            )}
        </div>
    )
}

export default Content