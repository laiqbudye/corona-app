import React from 'react';
import styles from './App.module.css';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import { fetchData } from './api/index';
import coronaImage from './image/image.png'

class App extends React.Component {
  state = {
    data: {},
    country: ''
  }


  async componentDidMount(){  // we can write aync in fron of this function as this is already async function
    const fetchedData = await fetchData();

    this.setState({data: fetchedData})
  }

  handleCountryChange = async( country ) => {
    const fetchedData = await fetchData(country);

    this.setState({data: fetchedData, country: country})  
  }



  render() {
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} />
        <Cards data={this.state.data}/>             {/* sending fetched data to cards component usning props*/}
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={this.state.data} country={this.state.country}/>
      </div>
    )
  };
}

export default App;
