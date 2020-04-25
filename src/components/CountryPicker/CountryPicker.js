import React, {useState, useEffect} from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api/index';

const CountryPicker = ({ handleCountryChange }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setCountries(await fetchCountries())
        }

        fetchData();
    },[setCountries])

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue='' onChange = {(event) => handleCountryChange(event.target.value)} >
                <option value="">Global</option>
                {countries.length} ? {countries.map((country, index) => <option value={country.name} key={index}>{country.name}</option>)} : null
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;