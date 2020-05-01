import React,{Fragment} from 'react';
import styles from './App.module.css';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import { fetchData, fetchCountries, fetchStates, fetchDistrictWiseData } from './api/index';
import coronaImage from './image/image.png'
import Map from './components/Map/Map';

class App extends React.Component {
  state = {
    data: {},
    countries: [],
    stateswisedata:[],
    districtwisedata:[],
    dailystatusindia: [],
    country: '',
    errorWhileFetching: false
  }


  async componentDidMount(){  // we can write aync in fron of this function as this is already async function
    const fetchedData = await fetchData();
    const fetchedCountries = await fetchCountries();
    const fetchedStates = await fetchStates();
    const fetchedDistrictWiseData = await fetchDistrictWiseData();
    this.setState({data: fetchedData});
    this.setState({countries: fetchedCountries});
    this.setState({stateswisedata: fetchedStates?.statewise});
    this.setState({dailystatusindia: fetchedStates?.cases_time_series});
    this.setState({districtwisedata: fetchedDistrictWiseData});
  }

  handleCountryChange = async( countrycode, statename, districtname) => {

    if(countrycode === 'global'){
       const fetchedData = await fetchData();
       this.setState({data: fetchedData});
       return;
    } 
    if(!countrycode && statename){  // finding state data
      
      if(statename === 'JAMMU & KASHMIR'){
        statename = 'Jammu and Kashmir'
      }

      if(districtname){ // if state is open and user is watching districts
        let currentState = this.state.districtwisedata.filter(state => state.state === statename);
        let fetchedData = currentState[0].districtData.filter(district => district.district === districtname);

        if(fetchedData.length === 0){   // if distric not found in data, then it must be clean district (no one infected there)
          fetchedData = [{
            active: 0,
            confirmed: 0,
            deceased: 0,
            district: districtname,
            recovered: 0
          }]
        }

        this.setState({data: fetchedData[0]})
        return;
      }

      const fetchedData = this.state.stateswisedata.filter(state => state.state === statename)
      this.setState({data: fetchedData[0]})
    }else{
      const fetchedData = this.state.countries.filter(country => country.code === countrycode)
      this.setState({data: fetchedData[0]})  
    }
  }



  render() {
    return (
      <Fragment>
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt='logo' />
        <Cards data={this.state.data}/>             {/* sending fetched data to cards component usning props*/}
        <CountryPicker countries={this.state.countries} handleCountryChange={this.handleCountryChange} />
        <div className={styles.wrapper}>
        <Chart data={this.state.data} country={this.state.country}/>
      
        <Map
          countries={this.state.countries}
          stateswisedata={this.state.stateswisedata}
          districtwisedata={this.state.districtwisedata}
          handleCountryChange={this.handleCountryChange}
          errorWhileFetching={this.state.errorWhileFetching}
        />
        </div>
        </div>
      </Fragment>
    )
  };
}

export default App;
