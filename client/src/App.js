import React, { Component } from "react";
import Supplychain from './contracts/Supplychain.json'
import getWeb3 from "./getWeb3";
import "./App.css";
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from "./components/router";

class App extends Component {
  state = { storagevalue: null, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log(networkId);
      const deployedNetwork = Supplychain.networks[networkId];
      const instance = new web3.eth.Contract(
        Supplychain.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      //this.setState({ web3, accounts, contract: instance }, this.runExample);
      this.setState({ web3, accounts, contract: instance }); //, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  // runExample = async () => {
  //   const { accounts, contract } = this.state;
  //   const response = await contract.getPastEvents("allEvents");
  //   this.setState({ storageValue: response });
  //   console.log(this.state.storageValue)
  // };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <Router>
        <div className="App">
          <AppRouter contract={this.state.contract} accounts={this.state.accounts} web3={this.state.web3}/>
        </div>
      </Router>
    );
  }
}

export default App;