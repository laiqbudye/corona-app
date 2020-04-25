import axios from 'axios';

const url = "https://covid19.mathdro.id/api" // api to fetch global covid data

export const fetchData= async (country) => {
    let changableUrl = url;
    if(country){
        changableUrl = `${url}/countries/${country}`;
    }
    try {
        const { data } = await axios.get(changableUrl);   // destructuring data field only from response

        return data;
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
        const  { data }  = await axios.get(`${url}/countries`);   // destructuring data field only from response

        return data.countries;        
    } catch (error) {
        console.log(error);
    }
}