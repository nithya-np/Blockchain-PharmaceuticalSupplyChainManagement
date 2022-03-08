import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import MedicineContract from "../contracts/Medicine.json";
import RawMaterialContract from "../contracts/Rawmaterial.json";
import "../App.css";
import "../styles/others.scss";
import history from "./history";

class Supplychain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            status: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount() {
        this.storeMedicines();
    }
    componentDidUpdate() {
        this.storeMedicines();
    }

    getMedicine(address) {
        const instance = new this.props.web3.eth.Contract(MedicineContract.abi, address);
        return instance;
    }

    storeMedicines() {
        let m = [];
        this.props.contract.methods.returnMedicinesSpecifictoPharmacy(this.props.accounts[0]).call().then((x) => {
            x.forEach((address) => {
                const medInst = this.getMedicine(address);
                medInst.methods.getMedicineDetails().call().then((data) => {
                    this.props.contract.methods.returnMedicineQuantityinPharmacy(this.props.accounts[0], data.Medicine_id).call().then((x) => {
                        data.AvlQuantity = x;
                    })
                    data.address = address;
                    m.push(data);
                });
            });
        })

        setTimeout(() => {
            this.setState({
                medicines: m,
                isLoading: false
            });
        }, 100);
    }

    getRawMaterial(address) {
        const instance = new this.props.web3.eth.Contract(RawMaterialContract.abi, address);
        return instance;
    }

    handleSubmit(event) {
        let med = []
        for (const i in this.state.medicines) {
            if (this.state.medicines[i].Medicine_id === this.state.medicineId) {
                med.push(this.state.medicines[i])
            }
        }
        let raw = [];
        this.props.contract.methods.returnRawmaterialsforMedicines(this.state.medicineId).call().then((x) => {
            // alert(typeof x)
            // console.log(x)
            // alert(x)
            for (const i in x) {
                const rawMatInst = this.getRawMaterial(x[i]);
                rawMatInst.methods.getRawMaterialDetails().call().then((data) => {
                    raw.push(data);
                    // console.log(data)
                });
            }
        })
        setTimeout(() => {
            this.setState({
                rawmaterials: raw,
                ParticularMed: med,
                isSet: false
            });
        }, 100);
        event.preventDefault();
    }

    render() {

        const displayMedicines = this.state.isLoading === false ? (
            this.state.medicines !== undefined ? (this.state.medicines.map((k) => {
                // console.log(this.state.medicines)
                return (
                    <Container className="hover-decoration">
                        <Row className="align-items-center">
                            <Col>
                                <p>Name: {k.Medicine_name} , Id: {k.Medicine_id}</p>
                            </Col>
                        </Row>
                    </Container>
                );
            }
            )) : console.log(this.state.medicines)) : (<div>Medicines Loading...</div>)

        const displayParticularMed = this.state.isSet === false ? (
            this.state.ParticularMed !== undefined ? (this.state.ParticularMed.map((k) => {
                // console.log(this.state.medicines)
                return (
                    <Container className="hover-decoration">
                        <Row className="align-items-center">
                            <Col>
                                <p>Manufacturer of Medicine:{k.Manufacturer}</p>
                                <p>Medicine Name: {k.Medicine_name}</p>
                                <p>Medicine Id: {k.Medicine_id}</p>
                                <p>Medicine Price: {k.Medicine_price}</p>
                                <p>Medicine Quantity: {k.AvlQuantity}</p>
                                <p>Medicine Description: {k.Description}</p>
                            </Col>
                        </Row>
                    </Container>
                );
            }
            )) : console.log(this.state.ParticularMed)) : (<div></div>)

        const displayDetails = this.state.isSet === false ? (
            this.state.rawmaterials !== null ? (
                this.state.rawmaterials.map((k) => {
                    return (
                        <Container className="hover-decoration">
                            <Row className="align-items-center">
                                <hr className="hhr" />
                                <Col>
                                    <p>Supplier of Raw Material:{k.Supplier}</p>
                                    <p>Raw Material Name: {k.Rawmaterial_name}</p>
                                    <p>Raw Material Id: {k.Rawmaterial_id}</p>
                                    <p>Raw Material Price: {k.Rawmaterial_price}</p>
                                    <p>Raw Material Description: {k.Description}</p>
                                </Col>
                            </Row>
                            <hr className="hhr"></hr>
                        </Container>
                    );
                }
                )) : console.log("No raw materials")) : (<div></div>)

        return (
            <div>
                <div className="icon2">
                    <button onClick={() => history.push('/pharma')} type="button" class="btn btn-default">
                        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    </button>
                </div>
                <Container className="form-setup link-setup">
                    <Row>
                        <h3><b>Display Medicine Details</b></h3>
                        <form onSubmit={this.handleSubmit} max-width="400px" margin="auto" padding="100px">
                            <div className="form-group">
                                <label>Medicine Id</label>
                                <input type="number" name="medicineId" value={this.state.medicineId} onChange={this.handleChange}
                                    className="form-control" placeholder="Medicine Id" />
                            </div>
                            <button type="submit" class="btn btn-primary">Medicine Details</button>
                        </form>
                        <p>{displayParticularMed}</p>
                        <p>{displayDetails}</p>
                    </Row>
                    <hr className="horizontalRow" />

                    <Row>
                        <h3><b>Medicines Available in Pharma</b></h3>
                        {displayMedicines}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Supplychain;