import React from "react";
import "../styles/style.scss";
import RegisterImg from "../styles/icon2.png";


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.setSupplier = this.setSupplier.bind(this);
        this.setManufacturer = this.setManufacturer.bind(this);
        this.setPharma = this.setPharma.bind(this);
    }

    setSupplier() {
        console.log("registerSupplier")
        this.props.contract.methods.checkManufacturer(this.props.accounts[0]).call().then((x)=>{
            if(!x){
                this.props.contract.methods.checkPharmacy(this.props.accounts[0]).call().then((y)=>{
                    if(!y){
                        this.props.contract.methods.checkSupplier(this.props.accounts[0]).call().then((z) => {
                            if(z) {
                                alert("You have already set your role as Supplier")
                            }
                            else {
                                this.props.contract.methods.registerSupplier().send({ from: this.props.accounts[0] });
                            }
                        })
                    }
                    else{
                        alert("You have already set your role")
                    }
                })
            }
            else{
                alert("You have already set your role")
            }
        })
    }

    setManufacturer() {
        console.log("registerManufacturer")
        this.props.contract.methods.checkSupplier(this.props.accounts[0]).call().then((x)=>{
            if(!x){
                this.props.contract.methods.checkPharmacy(this.props.accounts[0]).call().then((y)=>{
                    if(!y){
                        this.props.contract.methods.checkManufacturer(this.props.accounts[0]).call().then((z) => {
                            if(z) {
                                alert("You have already set your role as Manufacturer")
                            }
                            else {
                                this.props.contract.methods.registerManufacturer().send({ from: this.props.accounts[0] });
                            }
                        })
                    }
                    else{
                        alert("You have already set your role")
                    }
                })
            }
            else{
                alert("You have already set your role")
            }
        })
    }

    setPharma() {
        console.log("registerPharma")
        this.props.contract.methods.checkSupplier(this.props.accounts[0]).call().then((x)=>{
            if(!x){
                this.props.contract.methods.checkManufacturer(this.props.accounts[0]).call().then((y)=>{
                    if(!y){
                        this.props.contract.methods.checkPharmacy(this.props.accounts[0]).call().then((z) => {
                            if (z) {
                                alert("You have already set your role as Pharmacy")
                            }
                            else {
                                this.props.contract.methods.registerPharmacy().send({ from: this.props.accounts[0] });
                            }
                        })
                    }
                    else{
                        alert("You have already set your role")
                    }
                })
            }
            else{
                alert("You have already set your role")
            }
        })    
    }

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Register</div>
                <div className="content">
                    <div className="image">
                        <img src={RegisterImg} />
                    </div>
                    <div className="form">
                        <div>
                            <div>
                                <button className="button1" onClick={this.setSupplier}>Supplier</button>
                            </div>
                            <br />

                            <div>
                                <button className="button1" onClick={this.setManufacturer}>Manufacturer</button>
                            </div>
                            <br />

                            <div>
                                <button className="button1" onClick={this.setPharma}>Pharma</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;