import React from 'react';
import styles from './App.module.css';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import { fetchData } from './api/index';

class App extends React.Component {
  state = {
    data: {}
  }


  async componentDidMount(){  // we can write aync in fron of this function as this is already async function
    const fetchedData = await fetchData();

    this.setState({data: fetchedData})
  }

  render() {
    return (
      <div className={styles.container}>
        <Cards data={this.state.data}/>             {/* sending fetched data to cards component usning props*/}
        <CountryPicker />
        <Chart />
      </div>
    )
  };
}

export default App;
