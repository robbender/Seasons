import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonsDisplay";
import "semantic-ui-css/semantic.min.css";
import Spinner from "./Spinner";
import "./SeasonDisplay.css";
class App extends React.Component {
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    if ("geolocation" in navigator) {
      console.log("%cGeolocation available.", "color:green");
      window.navigator.geolocation.getCurrentPosition(
        // success callback 1
        // (position) => console.log(position),
        (position) =>
          this.setState({
            lat: position.coords.latitude,
            city: position.coords.location,
          }),
        // failure callback 2
        (err) => this.setState({ errorMessage: err.message })
      );
    } else {
      console.log("%cGeolocation not available.", "color:red");
    }
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return (
        <div className="error-message">
          Error: {this.state.errorMessage}
          <br />
          <br />
          Please set default location or allow browser to detect your location.
        </div>
      );
    }
    if (!this.state.errorMessage && this.state.lat) {
      return (
        <div>
          {/* <h1>{this.state.city}</h1> */}
          <SeasonDisplay lat={this.state.lat} />
        </div>
      );
    }
    return <Spinner message="To continue please accept location request." />;
  }

  render() {
    return <div className="">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
