import React, { Fragment } from 'react';
import styles from './App.module.css';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import { fetchData, fetchDataByDates } from './api/index';
import coronaImage from './image/image.png'
import Map from './components/Map/Map';

class App extends React.Component {
  state = {
    data: [],
    countryData: [],
    countryDataForMap: {
      countryIsoCode: null,
      countryName: null,
      cntryDataNotAvailable: false
    },
    covidGlobalDataByDates: [],
    countryDataByDates: []
  }


  async componentDidMount() {
    const fetchedData = await fetchData();  // api is giving data in object
    this.setState({ data: fetchedData });

    const countryData = this.state.data.filter(country => country[0].location === 'World')
    this.setState({ countryData: countryData[0] });

    const globaldataByDates = await fetchDataByDates();
    this.setState({ covidGlobalDataByDates: globaldataByDates });

    const countryDataByDates = this.state.covidGlobalDataByDates.filter(country => country[0].location === 'World')
    this.setState({ countryDataByDates: countryDataByDates[0][0]['data'] });
  }

  handleCountryChange = async (countryName, countryCode) => {
    this.setState({
      countryDataForMap: {
        ...this.state.countryDataForMap,
        countryName: null,
        countryIsoCode: null,
        cntryDataNotAvailable: false,
        countryDataByDates: []
      }
    })

    const countryData = this.state.data.filter(country => country[0].location === countryName)

    const countryDataByDates = this.state.covidGlobalDataByDates.filter(country => country[0].location === countryName);
    
    if (countryData.length) {
      this.setState({
        countryData: countryData[0],
        countryDataForMap: {
          ...this.state.countryDataForMap,
          countryName: countryName,
          countryIsoCode: countryCode,
          cntryDataNotAvailable: false
        }
      })

      if(countryDataByDates.length){
        this.setState({countryDataByDates: countryDataByDates[0][0]['data']})
      }
    } else {
      this.setState({
        countryDataForMap: {
          ...this.state.countryDataForMap,
          countryName: countryName,
          countryIsoCode: countryCode,
          cntryDataNotAvailable: true
        },
        countryDataByDates: []
      })
    }
  }



  render() {
    return (
      <Fragment>
        <div className={styles.container}>
          <img className={styles.image} src={coronaImage} alt='logo' />
          <Cards countryData={this.state.countryData} />
          <CountryPicker countriesData={this.state.data} handleCountryChange={this.handleCountryChange} />
          <div className={styles.wrapper}>
            <Chart
              countryData={this.state.countryData}
              countryDataByDates={this.state.countryDataByDates}
            />

            <Map
              countryData={this.state.countryData}
              handleCountryChange={this.handleCountryChange}
              countryDataForMap={this.state.countryDataForMap}
            />
          </div>
        </div>
      </Fragment>
    )
  };
}

export default App;
