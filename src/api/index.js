import axios from 'axios';

const url = "https://covid19.mathdro.id/api" // api to fetch global covid data
const newUrl = "https://api.thevirustracker.com"

export const fetchData= async (countrycode) => {

    if (countrycode) { 
        try {
            const {data}  = await axios.get(`${newUrl}/free-api?countryTotal=${countrycode}`);
            
            return data.countrydata[0];
        } catch (error) {
            console.log(error);
        }
    }else{
    try {
        const { data } = await axios.get(`${newUrl}/free-api?global=stats`);   // destructuring data field only from response

        return data.results[0];
    } catch (error) {
        console.log(error);
    }
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