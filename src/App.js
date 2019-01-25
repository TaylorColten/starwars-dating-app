import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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

    // this.handleClick = this.handleClick(bind).this;
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


  // Display each character on the list, one by one,
  // in the center of the screen, starting at the beginning,
  // with the most easily identifiable as Light or Dark Side

  // User clicks on one of two buttons below the name (or image) >
  // This pops the center displayed name >
  // Adds the characterCard name to the Light or Dark array
  handleClick = (e) => {
    e.preventDefault();

    const firstResult = head(this.state.fetchResults);          // Luke

    const newFetchResults = this.state.fetchResults.slice(1);   // Empty array

    // Create a characterCard object to hold info
    if (e.target.innerHTML === 'Seek only the Light') {

      console.log(firstResult);
      this.setState({
        lightArray: [
          ...this.state.lightArray,
          firstResult,
        ],
        fetchResults: newFetchResults,
        swapiCharURL: this.state.swapiCharURL + 1,
      });
      this.fetchStarWarsCharacters();
    }
    else {
      this.setState({
        darkArray: [
          ...this.state.darkArray,
          firstResult,
        ],
        fetchResults: newFetchResults,
        swapiCharURL: this.state.swapiCharURL + 1,
      });
      this.fetchStarWarsCharacters();
    }

  };
  

  render() {
    return (
      <div className="App">
        
      </div>
    );
    }
  }
    

export default App;
