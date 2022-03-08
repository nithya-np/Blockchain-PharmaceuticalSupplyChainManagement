import React, {Component} from "react"
import { Route, Router, Switch } from "react-router-dom"
import Home from "./Home";
import Supplier from "./Supplier";
import Manufacturer from "./Manufacturer";
import Pharma from "./Pharma";
import OrderRawMaterials from "./OrderRawMaterials";
import MedicineForm from "./MedicineForm";
import RawToMed from "./RawToMed";
import DisplayMedicine from "./DisplayMedicine";
import OrderMedicines from "./OrderMedicines";
import Supplychain from "./Supplychain";

export default class AppRouter extends Component {

    constructor(props){
        super(props);
    }

    render() {    
        return ( 
                <Switch>
                    <Route path="/" exact render={() => <Home contract={this.props.contract} accounts={this.props.accounts} web3={this.props.web3}/> }/>

                    <Route path="/supplier" exact render={
                        () => <Supplier contract={this.props.contract} accounts={this.props.accounts} web3={this.props.web3}/>
                    }/>

                    <Route path="/manufacturer" exact render={
                        () => <Manufacturer contract={this.props.contract} accounts={this.props.accounts} web3={this.props.web3}/>
                    }/>

                    <Route path="/manufacturer/order_raw_materials" exact render={
                        () => <OrderRawMaterials contract={this.props.contract} accounts={this.props.accounts} web3={this.props.web3}/>
                    }/>

                    <Route path="/manufacturer/add_medicines" exact render={
                        () => <MedicineForm contract={this.props.contract} accounts={this.props.accounts} web3={this.props.web3}/>
                    }/>

                    <Route path="/manufacturer/raw_mat_for_medicine" exact render={
                        () => <RawToMed contract={this.props.contract} accounts={this.props.accounts} web3={this.props.web3}/>
                    }/>

                    <Route path="/manufacturer/display_medicines" exact render={
                        () => <DisplayMedicine contract={this.props.contract} accounts={this.props.accounts} web3={this.props.web3}/>
                    }/>

                    <Route path="/pharma" exact render={
                        () => <Pharma contract={this.props.contract} accounts={this.props.accounts} web3={this.props.web3}/>
                    }/>

                    <Route path="/pharma/order_medicines" exact render={
                        () => <OrderMedicines contract={this.props.contract} accounts={this.props.accounts} web3={this.props.web3}/>
                    }/>

                    <Route path="/pharma/display_medicine_details" exact render={
                        () => <Supplychain contract={this.props.contract} accounts={this.props.accounts} web3={this.props.web3}/>
                    }/>
                    
                </Switch>
            
        )
    }
}