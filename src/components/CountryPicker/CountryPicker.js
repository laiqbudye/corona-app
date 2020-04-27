import React from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './CountryPicker.module.css';

const CountryPicker = ({ countries, handleCountryChange }) => {

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue='' onChange = {(event) => handleCountryChange(event.target.value)} >
                <option value="global">Global</option>
                {countries.length} ? {countries.map((country, index) => <option value={country.code} key={index}>{country.title}</option>)} : null
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;