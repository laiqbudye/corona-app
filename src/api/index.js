import axios from 'axios';

const url = "https://covid19.mathdro.id/api";  // api to fetch global covid data (daily stats)
const newUrl = "https://api.thevirustracker.com";  //api to fetch data of all countries 
const baseUrl = "https://api.covid19india.org";   //api to fetch dataof all states of India

export const fetchData= async () => {

    try {
        const { data } = await axios.get(`${newUrl}/free-api?global=stats`);   // destructuring data field only from response

        return data.results[0];
    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData= async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);   // destructuring data field only from response

        return data;        
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries= async () => {
    try {
        const {data}   = await axios.get(`${newUrl}/free-api?countryTotals=ALL`);   // destructuring data field only from response
       
        return Object.values(data.countryitems[0]);     // we are getting countries in objects.. so to convert in into an array
    } catch (error) {
        console.log(error);
    }
}

export const fetchStates= async () => {
    try {
        const { data }   = await axios.get(`${baseUrl}/data.json`);   // destructuring data field only from response
        
        return data;    
    } catch (error) {
        console.log(error);
    }
}

export const fetchDistrictWiseData= async () => {
    try {
        const { data }   = await axios.get(`${baseUrl}/v2/state_district_wise.json`);   // destructuring data field only from response
        console.log(data);
        
        return data;    
    } catch (error) {
        console.log(error);
    }
}
