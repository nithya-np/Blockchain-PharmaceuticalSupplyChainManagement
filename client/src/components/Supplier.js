import React, { Component } from "react";
import RawMatForm from "./RawMatForm";
import DisplayRawMat from "./DisplayRawMat";
import "../styles/others.scss";
import history from "./history";

class Supplier extends Component {

    render() {
        return (
            <div>

                <header>   
                <p>Supplier Page &nbsp; | &nbsp; Current Metamask Address: {this.props.accounts[0]}</p>
                <div className="icon1">
                    <button onClick={() => history.push('/')} type="button" class="btn btn-default">
                        <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
                    </button>
                </div>
                </header>

                {console.log("WEB3:  " + this.props.web3)}
                {console.log("CONTRACT: " + this.props.contract)}
                {console.log("ACCOUNTS: " + this.props.accounts)}

                <br/>
                <RawMatForm contract={this.props.contract} accounts={this.props.accounts} web3={this.props.web3} />
                <DisplayRawMat contract={this.props.contract} accounts={this.props.accounts} web3={this.props.web3} />

            </div>
        );
    }
}

export default Supplier;

// <div class="header">
// <a href="#default" class="logo">CompanyLogo</a>
// <div class="header-right">
//     <a class="active" href="#home">Home</a>
//     <a href="#contact">Contact</a>
//     <a href="#about">About</a>
// </div>
// </div>

// <header>   
// <p>Supplier Page &nbsp; | &nbsp; 
// Current Metamask Address: {this.props.accounts[0]}</p>
// <div className="icon1">
//     <button type="button" class="btn btn-default">
//         <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
//     </button>
// </div>
// </header>