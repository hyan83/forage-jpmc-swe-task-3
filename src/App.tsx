import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

interface IState {
  data: ServerRespond[],
  showGraph: boolean,
  fetchingData: boolean,
}

class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      showGraph: false,
      fetchingData: true,
    };
  }

  stopDataStreaming() {
    // Set the component state to stop fetching data
    this.setState({ fetchingData: false })
  }

  renderGraph() {
    if (this.state.showGraph) {
      return (<Graph data={this.state.data}/>)
    }
  }

  getDataFromServer() {
       // Boolean to control fetchData
       this.setState({ fetchingData: true })
       // Function to fetch data from server
       const fetchData = () => {
           if (!this.state.fetchingData) {
                return; // Stop fetching data if fetchingData is False
           }
           DataStreamer.getData((serverResponds: ServerRespond[]) => {
                this.setState({
                data: serverResponds,
                showGraph: true,
           });
           // Call fetchData again after 100ms
           setTimeout(fetchData, 100);
          });
       };

       // Call fetchData for the first time
          fetchData();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank Merge & Co Task 3
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button" onClick={() => {this.getDataFromServer()}}>Start Streaming Data</button>
          <button className="btn btn-danger Stop-button" onClick={() => {this.stopDataStreaming()}}>Stop Streaming Data</button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
