import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import MedicineContract from "../contracts/Medicine.json";
import RawMaterialContract from "../contracts/Rawmaterial.json";
import "../styles/others.scss";
import history from "./history";

class RawToMed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            medID: '',
            rawID: '',
            isLoading: true,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    getMedicine(address) {
        const instance = new this.props.web3.eth.Contract(MedicineContract.abi, address);
        return instance;
    }

    getRawMaterial(address) {
        const instance = new this.props.web3.eth.Contract(RawMaterialContract.abi, address);
        return instance;
    }

    storeMedicines() {
        let p = [];
        let raw = []

        this.props.contract.methods.returnRawmaterialsSpecifictoManufacturer(this.props.accounts[0]).call().then((rawMaterialsX) => {
            rawMaterialsX.forEach((address) => {
                const rawMatInst = this.getRawMaterial(address);
                rawMatInst.methods.getRawMaterialDetails().call().then((data) => {
                    data.address = address;
                    raw.push(data);
                });
            });
        })
        this.props.contract.methods.returnMedicinesprovidedbyManufacturer(this.props.accounts[0]).call().then((medicinesX) => {
            medicinesX.forEach((address) => {
                const medInst = this.getMedicine(address);
                medInst.methods.getMedicineDetails().call().then((data) => {
                    p.push(data);
                });
            });
            setTimeout(() => {
                this.setState({
                    medicines: p,
                    rawmaterials: raw,
                    isLoading: false
                });
            }, 100);
        });
    }

    componentDidMount() {
        this.storeMedicines();
    }
    componentDidUpdate() {
        this.storeMedicines();
    }

    handleSubmit(event) {
        this.props.contract.methods.rawmaterialstoMedicine(this.state.medID, this.state.rawID).send({ from: this.props.accounts[0] });
        event.preventDefault();
    }

    // handleValidation() {
    //     let flag1 = false
    //     let flag2 = false
    //     for (const i in this.state.medicines) {
    //         if (this.state.medicines[i].Medicine_id === this.state.medID) {
    //             flag1 = true;
    //             return;
    //         }
    //     }
    //     for (const i in this.state.rawmaterials) {
    //         if (this.state.rawmaterials[i].Rawmaterial_id === this.state.rawID) {
    //             flag2 = true;
    //             return;
    //         }
    //     }
       
    //     if (flag1 === false && flag2 === false) {
    //         alert("RawMaterial or Medicine is not available!")
    //     }

    //     alert(flag1)
    //     alert(flag2)
    //     return (flag1 && flag2);
    // }

    
    render() {
        const displayMedicines = this.state.isLoading === false ? (
            this.state.medicines !== null ? (this.state.medicines.map((k) => {
                return (
                    <Container className="hover-decoration3">
                        <Row class="col-xs-6">
                            <Col className="box1">
                                <p>Name: {k.Medicine_name}, Id: {k.Medicine_id}</p>
                            </Col>
                        </Row>
                    </Container>
                );
            }
            )) : console.log(this.state.medicines.length)) : (<div>Medicines Loading...</div>)

        const displayRawMaterials = this.state.isLoading === false ? (
            this.state.rawmaterials !== null ? (this.state.rawmaterials.map((k) => {
                return (
                    <Container className="hover-decoration2">
                        <Row class="col-xs-6">
                            <Col className="box1">
                                <p>Supplier of Raw Material: {k.Supplier}</p>
                                <p>Raw Material Name: {k.Rawmaterial_name}</p>
                                <p>Raw Material Id: {k.Rawmaterial_id}</p>
                                <p>Raw Material Price: {k.Rawmaterial_price}</p>
                                <p>Raw Material Description: {k.Description}</p>
                            </Col>
                        </Row>

                    </Container>
                );
            }
            )) : console.log(this.state.rawmaterials.length)) : (<div></div>)


        return (
            <div>
                <div className="icon2">
                    <button onClick={() => history.push('/manufacturer')} type="button" class="btn btn-default">
                        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    </button>
                </div>
                <Container className="form-setup link-setup">
                    <Row>
                        <Col max-width="400px" margin="auto" padding="100px">
                            {/* <Col xs="12" md="6"> */}
                            <article-left>
                                <form className="form1" onSubmit={this.handleSubmit} max-width="400px" margin="auto" padding="100px">
                                    <h3><b>Raw Materials Used for Medicine</b></h3>

                                    <div className="form-group">
                                        <label>Medicine Id</label>
                                        <input type="number" name="medID" value={this.state.medID} onChange={this.handleChange}
                                            className="form-control" placeholder="Medicine Id" />
                                    </div>

                                    <div className="form-group">
                                        <label>Raw Material Id</label>
                                        <input type="number" name="rawID" value={this.state.rawID} onChange={this.handleChange}
                                            className="form-control" placeholder="Raw Material Id" />
                                    </div>
                                    <button type="submit" class="btn btn-primary">Publish</button>
                                </form>
                            </article-left>
                        </Col>
                        <article-middle>
                            <h3><b>Raw Materials available with Manufacturer</b></h3>
                            {displayRawMaterials}
                            <hr className="hhr" />
                            <h3><b>Display Medicines</b></h3>
                            {displayMedicines}
                        </article-middle>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default RawToMed;