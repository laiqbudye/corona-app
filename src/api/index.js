import axios from 'axios';

const url = "https://covid19.mathdro.id/api" // api to fetch global covid data

export const fetchData= async () => {
    try {
        const { data } = await axios.get(url);   // destructuring data field only from response

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