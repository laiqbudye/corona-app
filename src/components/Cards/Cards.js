import React from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import styles from './Cards.module.css';
import CountUp from 'react-countup';
import Moment from 'react-moment';
import moment from 'moment';
import cx from 'classnames';   // this is to apply two or more classes to div

const Cards = ({ data }) => {

    if(!data.confirmed){
        return null
    }
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify='center'>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>
                            Infected
                        </Typography>
                        <Typography variant='h5'>
                            <CountUp 
                                start = {0}
                                end = {data.confirmed.value}
                                separator = ','
                                duration = {2.1}  // seconds
                            />    
                        </Typography>
                        <Typography color='textSecondary'>
                            LastUpdate: <Moment format='DD/MM/YYYY hh:mm A'>{moment.utc(data.lastUpdate).local()}</Moment>
                        </Typography>
                        <Typography variant='body2'>
                            Number of active cases of COVID-19
                        </Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>
                            Recovered
                        </Typography>
                        <Typography variant='h5'>
                            <CountUp 
                                start = {0}
                                end = {data.recovered.value}
                                separator = ','
                                duration = {2.1}  // seconds
                            />        
                        </Typography>
                        <Typography color='textSecondary'>
                            LastUpdate: <Moment format='DD/MM/YYYY hh:mm A'>{moment.utc(data.lastUpdate).local()}</Moment>
                        </Typography>
                        <Typography variant='body2'>
                            Number of recoveries from COVID-19
                        </Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>
                            Deaths
                        </Typography>
                        <Typography variant='h5'>
                            <CountUp 
                                start = {0}
                                end = {data.deaths.value}
                                separator = ','
                                duration = {2.1}  // seconds
                            />      
                        </Typography>
                        <Typography color='textSecondary'>
                            LastUpdate: <Moment format='DD/MM/YYYY hh:mm A'>{moment.utc(data.lastUpdate).local()}</Moment>
                        </Typography>
                        <Typography variant='body2'>
                            Number of deaths caused by COVID-19
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;