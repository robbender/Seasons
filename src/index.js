import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from './SeasonsDisplay';
import "semantic-ui-css/semantic.min.css";
import Spinner from './Spinner';
import './SeasonDisplay.css';
class App extends React.Component {
  state = { lat: null, errorMessage: '' };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      // success callback 1
      (postition) => this.setState({ lat: postition.coords.latitude }),
      // failure callback 2
      (err) => this.setState({ errorMessage: err.message })
    );
  }

  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div className="error-message">Error: {this.state.errorMessage}
      <br/> 
      <br/>Please set default location or allow browser to detect your location.</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={ this.state.lat } />;
    }
    return (
      <Spinner />
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
