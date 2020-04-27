import React,{Fragment} from 'react';
import styles from './App.module.css';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import { fetchData, fetchCountries } from './api/index';
import coronaImage from './image/image.png'
import Map from './components/Map/Map';

class App extends React.Component {
  state = {
    data: {},
    countries: [],
    country: '',
    errorWhileFetching: false
  }


  async componentDidMount(){  // we can write aync in fron of this function as this is already async function
    const fetchedData = await fetchData();
    const fetchedCountries = await fetchCountries();
    this.setState({data: fetchedData});
    this.setState({countries: fetchedCountries});
  }

  handleCountryChange = async( countrycode ) => {

    if(countrycode === 'global'){
       const fetchedData = await fetchData();
       this.setState({data: fetchedData})
    }else{
      const fetchedData = this.state.countries.filter(country => country.code === countrycode)
      this.setState({data: fetchedData[0]})  
    }
  }



  render() {
    return (
      <Fragment>
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} />
        <Cards data={this.state.data}/>             {/* sending fetched data to cards component usning props*/}
        <CountryPicker countries={this.state.countries} handleCountryChange={this.handleCountryChange} />
        <Chart data={this.state.data} country={this.state.country}/>
      </div>
        <Map
          countries={this.state.countries}
          handleCountryChange={this.handleCountryChange}
          errorWhileFetching={this.state.errorWhileFetching}
        />
      </Fragment>
    )
  };
}

export default App;
