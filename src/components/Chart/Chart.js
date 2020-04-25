import React, {useState, useEffect} from 'react';
import { fetchDailyData } from '../../api/index';
import styles from './Chart.module.css';
import { Bar, Line } from 'react-chartjs-2';


const Chart = ({ data, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            setDailyData(await fetchDailyData());
        }
        fetchData();
    },[])

    const barChart = (
        data.confirmed ?
            <Bar 
                data={{   // two braces, one for using JS code in JSX and second for object
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        data: [data.confirmed.value, data.recovered.value, data.deaths.value],
                        label: 'People',
                        backgroundColor: ['rgba(0,0,255,0.5)', 'rgba(0,255,0,0.5)', 'rgba(255,0,0,0.5)']
                    }]
                }}
                options={{
                    legend: {display: false},
                    title: {display: true, text: `Current status of ${country}`}
                }}
            /> : null
           
    )

    const lineChart = (
        dailyData.length ?
        <Line 
            data={{    // two braces, one for using JS code in JSX and second for object 
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
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;