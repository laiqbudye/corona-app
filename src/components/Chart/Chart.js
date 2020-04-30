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
        data ?.total_cases >= 0 || data?.confirmed >= 0 ?
            <Bar 
                data={{   // two braces, one for using JS code in JSX and second for object
                    labels: ['Total Cases', 'Recovered', 'Deaths', 'Active Cases'],
                    datasets: [{
                        data: [data.total_cases ? data.total_cases : data.confirmed, 
                               data.total_recovered ? data.total_recovered : data.recovered, 
                               data.total_deaths ? data.total_deaths : data.deaths || data.deceased, 
                               data.total_active_cases ? data.total_active_cases : data.active],
                        label: 'People',
                        backgroundColor: ['rgba(0,0,255,0.5)', 'rgba(0,255,0,0.5)', 'rgba(255,0,0,0.5)', 'rgba(239,255,0,0.5)']
                    }]
                }}
                options={{
                    legend: {display: false},
                    title: {display: true, text: `Current status of ${data?.title ? data.title : data.state || data.district}`}
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
            options={{
                legend: {display: false},
                title: {display: true, text: `Daywise Global status`}
            }}
        /> : <i className="fas fa-spinner fa-spin fa-fw fa-5x"></i> 
    );


    return (
        <div className={styles.container}>
            {data?.title || data?.confirmed ? barChart : lineChart}
        </div>
    )
}

export default Chart;