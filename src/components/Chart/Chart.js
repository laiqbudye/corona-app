import React, {useState, useEffect} from 'react';
import { fetchDailyData } from '../../api/index';
import styles from './Chart.module.css';
import { Bar, Line } from 'react-chartjs-2';


const Chart = () => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            setDailyData(await fetchDailyData());
        }
        fetchData();
    },[])

    console.log(dailyData)
    const lineChart = (
        dailyData.length ?
        <Line 
            data={{
                labels: dailyData.map((data) => data.reportDate),
                datasets: [{
                    data: dailyData.map((data) => data.confirmed.total),
                    label: 'Infected',
                    borderColor: 'blue',
                    fill: true
                },
                {
                    data: dailyData.map((data) => data.deaths.total),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true
                }]
            }}
        /> : null
    );


    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    )
}

export default Chart;