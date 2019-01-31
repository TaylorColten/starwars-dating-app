import React, { Component } from 'react';
import logo from './logo.svg';
import { Button } from 'reactstrap';
import head from 'lodash/head'
import './App.css';
import Matches from './Matches'

class App extends Component {

  urlForStarWarsChrctrs = (swapiCharURL) => {
    return `https://swapi.co/api/people/${swapiCharURL}/`
  }

  constructor(props) {
    super(props);

    this.state = {
      // Create an iterator. Each time the no or no buttons are hit
      // Set state of swapiCharURL to current+1 > render > new API call
      // Populates the center column with new SW character
      swapiCharURL: 1,
      name: 'default',
      yesArray: [],
      noArray: [],
      fetchResults: [],
      isFetching: false,
      requestFailed: false,
      error: '',
    };

    
  }

 
  fetchStarWarsCharacters = () => {
    this.setState({
      isFetching: true,
    })
    return fetch(this.urlForStarWarsChrctrs(this.state.swapiCharURL))
    // Check API response is ok
    .then((response) => {
      if (!response.ok) {
        throw Error("Network request failed"); // Throw error
      }
      return response
    })
    // Format the results with JSON
    .then(response => response.json())
    // Pass the JSON formatted response
    // Update this.state with the queried SW character name
    .then((res) => {
      return this.setState({
        ...this.state,
        isFetching: false,
        fetchResults: [
          ...this.state.fetchResults,
          res
        ],
      })

    })
    .catch((err) => {
      this.setState({
        isFetching: false,
        requestFailed: true, //Catch errors
        error: err,
      })
    });
}

componentDidMount() {
  // Using the above const, call the StarWars API for a character
  this.fetchStarWarsCharacters();
  this.setState({
    swapiCharURL: this.state.swapiCharURL + 1,
  })
}

handleClick = (e) => {
  e.preventDefault();

  const firstResult = head(this.state.fetchResults);          // Luke

  const newFetchResults = this.state.fetchResults.slice(1);   // Empty array

  // Create a characterCard object to hold info
  if (e.target.innerHTML === 'who is your best match') {

    console.log(firstResult);
    this.setState({
      yesArray: [
        ...this.state.yesArray,
        firstResult,
      ],
      fetchResults: newFetchResults,
      swapiCharURL: this.state.swapiCharURL + 1,
    });
    this.fetchStarWarsCharacters();
  }
  else {
    this.setState({
      noArray: [
        ...this.state.noArray,
        firstResult,
      ],
      fetchResults: newFetchResults,
      swapiCharURL: this.state.swapiCharURL + 1,
    });
    this.fetchStarWarsCharacters();
  }

};

render() {
  const {
    fetchResults,
  } = this.state
  return (
    <div className="App">

      <div className="App-header">
        <h1>the right could be out of this world!</h1>
        <h2>Click the button to find out</h2>
      </div>
      <div>
        <h1>{fetchResults && fetchResults.length > 0 ? fetchResults[0].name : ''}</h1>
        <Button
          label="its a match"
          onClick={this.handleClick}
        />
        <Button
          backgroundColor='grey'
          labelColor='#fff'
          label="no thank you"
          onClick={this.handleClick}
        />
      </div>

    <div className="d-flex justify-content-around">
      <div>
        <Matches
          matches={this.state.yesArray}
          type="match"
        />
      </div>

      <div>
        <Matches
          matches={this.state.noArray}
          type="pass"
        />
      </div>
    </div>

      

    </div>
  );
}
}

export default App;
