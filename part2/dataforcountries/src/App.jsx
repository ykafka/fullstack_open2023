import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([])
    const [newFilter, setNewFilter] = useState("")

    useEffect(() => {
      axios.get("https://restcountries.com/v3.1/all").then(response => {
        setCountries(response.data)
      })
    }, [])

    const filterCountries = (event) => {
        setNewFilter(event.target.value);
    }

    const CountryInfo = ({ name, countries }) => {
        const country = countries.find(n => n.name.common === name)
        const languages = Object.keys(country.languages)

        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>The capital of {country.name.common} is {country.capital[0]}</p>
                <p>The population of {country.name.common} is {country.population}</p>
                <h3>Languages:</h3>
                <ul>
                    {languages.map(n => (
                        <li key={n}>{country.languages[n]}</li>
                    ))}
                </ul>
                <img src={country.flags.png} alt='flag' height='10%' width='10%' /> 
            </div>
        )
    }

    const DisplayCountries = ({countries, newfilter}) => {
        const filtered = countries.filter(country =>
            country.name.common.toUpperCase().includes(newfilter.toUpperCase())
        )
        const length = filtered.length;
        
        if (newfilter.length == 0) {
            return (
                <div></div>
            )
        }

        if (length >= 10) {
            return <div>Too many matches, specify another filter</div>
        }

        if (length > 1) {
            return (
                filtered.map(country => (
                    <div key = {country.name.common}>
                        {country.name.common}
                    </div>
                ))
            )
        }

        if (length === 1) {
            const country = filtered[0]
            return (
                <CountryInfo name={country.name.common} countries={countries} />
            )
        }
    }

    return (
        <div>
            <h2>find countries</h2>
            <input value={newFilter} onChange={filterCountries} />
            <DisplayCountries countries={countries} newfilter={newFilter}/>
        </div>
    )

}



export default App