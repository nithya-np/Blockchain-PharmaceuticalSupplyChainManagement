import React, { Component } from "react";
import history from "./history";
import "../styles/others.scss";

class Pharma extends Component {
    render() {
        return (
            <div>

                <header>
                    Pharmacy Page &nbsp; | &nbsp; Current Metamask Address: {this.props.accounts[0]}
                    <div className="icon1">
                        <button onClick={() => history.push('/')} type="button" class="btn btn-default">
                            <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
                        </button>
                    </div>
                </header>

                {console.log("WEB3:  " + this.props.web3)}
                {console.log("CONTRACT: " + this.props.contract)}
                {console.log("ACCOUNTS: " + this.props.accounts)}

                <br />
                <br />
                <br />
                <form>
                    <b><input className="button2" onClick={() => history.push('/pharma/order_medicines')} type="submit" value="Order Medicines from Manufacturers" /></b>
                    <br />
                    <br />
                    <b><input className="button2" onClick={() => history.push('/pharma/display_medicine_details')} type="submit" value="Display Medicine Details" /></b>
                </form>

            </div>
        );
    }


}

export default Pharma;