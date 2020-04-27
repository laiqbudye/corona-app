import React from 'react'
import Spinner from '../Spinner/Spinner';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import styles from './Cards.module.css';
import CountUp from 'react-countup';
import Moment from 'react-moment';
import moment from 'moment';
import cx from 'classnames';   // this is to apply two or more classes to div

const Cards = ({ data }) => {

    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify='center'>
                <Grid item component={Card} xs={12} md={2} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>
                            <i style={{color: "rgba(0,0,255,0.5)", width: '25px'}} class="fas fa-clinic-medical"></i> {' '}Total Cases
                        </Typography>
                        <Typography variant='h5'>
                            {data?.total_cases >= 0 ?
                                <CountUp
                                    start={0}
                                    end={data.total_cases ? data.total_cases : 0}
                                    separator=','
                                    duration={2.1}  // seconds
                                /> : <Spinner /> }  
                        </Typography>
                        <Typography color='textSecondary'>
                            LastUpdate: <Moment format='DD/MM/YYYY hh:mm A'>{moment.utc(Date.now()).local()}</Moment>
                        </Typography>
                        <Typography variant='body2'>
                            Total number of cases of COVID-19
                        </Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={2} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>
                            <i style={{color: "rgba(0,255,0,0.5)", width: '25px'}} class="fas fa-hospital-user"></i>{' '}Recovered
                        </Typography>
                        <Typography variant='h5'>
                        {data?.total_recovered >= 0 ?
                            <CountUp 
                                start = {0}
                                end = {data.total_recovered ? data.total_recovered : 0}
                                separator = ','
                                duration = {2.1}  // seconds
                            /> : <Spinner /> }         
                        </Typography>
                        <Typography color='textSecondary'>
                            LastUpdate: <Moment format='DD/MM/YYYY hh:mm A'>{moment.utc(Date.now()).local()}</Moment>
                        </Typography>
                        <Typography variant='body2'>
                            Number of recoveries from COVID-19
                        </Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={2} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>
                        <i style={{color: "rgba(255,0,0.5)", width: '25px'}} class="fas fa-skull-crossbones"></i>{' '}Deaths
                        </Typography>
                        <Typography variant='h5'>
                        {data?.total_deaths >= 0 ?
                            <CountUp 
                                start = {0}
                                end = {data.total_deaths ? data.total_deaths : 0}
                                separator = ','
                                duration = {2.1}  // seconds
                            /> : <Spinner /> }       
                        </Typography>
                        <Typography color='textSecondary'>
                            LastUpdate: <Moment format='DD/MM/YYYY hh:mm A'>{moment.utc(Date.now()).local()}</Moment>
                        </Typography>
                        <Typography variant='body2'>
                            Number of deaths caused by COVID-19
                        </Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={2} className={cx(styles.card, styles.active)}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>
                            <i style={{color: "rgba(239,255,0,0.5)", width: '25px'}} class="fas fa-procedures"></i>{' '}Active Cases
                        </Typography>
                        <Typography variant='h5'>
                        {data?.total_active_cases >= 0 ?
                            <CountUp 
                                start = {0}
                                end = {data.total_active_cases ? data.total_active_cases : 0}
                                separator = ','
                                duration = {2.1}  // seconds
                            /> : <Spinner /> }        
                        </Typography>
                        <Typography color='textSecondary'>
                            LastUpdate: <Moment format='DD/MM/YYYY hh:mm A'>{moment.utc(Date.now()).local()}</Moment>
                        </Typography>
                        <Typography variant='body2'>
                            Number of active cases of COVID-19
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;