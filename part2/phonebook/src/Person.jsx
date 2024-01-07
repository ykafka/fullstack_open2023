const Person = ({ person, filter, deletePerson }) => {
    if (person.name.toUpperCase().includes(filter.toUpperCase())) {
        return (
            <div key={person.name}>{person.name} {person.number} 
            <button onClick = {deletePerson}>delete</button></div>
            
        )
    }
}

export default Person