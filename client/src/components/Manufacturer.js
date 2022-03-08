import React, { Component } from "react";
import history from "./history";
import "../styles/others.scss";

class Manufacturer extends Component {
    render() {
        return (
            <div>
                <header>
                    Manufacturer Page &nbsp; | &nbsp; Current Metamask Address: {this.props.accounts[0]}
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
                <form>
                    <b><input className="button2" onClick={() => history.push('/manufacturer/order_raw_materials')} type="submit" value="Order Raw Materials from Suppliers" /></b>
                    <br />
                    <br />
                    <b><input className="button2" onClick={() => history.push('/manufacturer/add_medicines')} type="submit" value="Add Medicines" /></b>
                    <br />
                    <br />
                    <b><input className="button2" onClick={() => history.push('/manufacturer/raw_mat_for_medicine')} type="submit" value="Raw Materials Used For Medicines" /></b>
                    <br />
                    <br />
                    <b><input className="button2" onClick={() => history.push('/manufacturer/display_medicines')} type="submit" value="Display Medicines" /></b>
                </form>

            </div>
        );
    }


}



//               <MedicineForm contract={this.props.contract} accounts={this.props.accounts} web3={this.props.web3}/>
//               <DisplayMedicine contract={this.props.contract} accounts={this.props.accounts} web3={this.props.web3}/>

export default Manufacturer;