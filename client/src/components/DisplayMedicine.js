import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import MedicineContract from "../contracts/Medicine.json";
import RawMaterialContract from "../contracts/Rawmaterial.json";
import "../App.css";
import history from "./history";
import "../styles/others.scss";

class DisplayMedicine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isOpen: false,
            medicineId: '',
            isSet: true,
            status: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    openModal() {
        this.setState({
            isOpen: true
        });
    }

    closeModal() {
        this.setState({
            isOpen: false
        });
    }

    getMedicine(address) {
        const instance = new this.props.web3.eth.Contract(MedicineContract.abi, address);
        return instance;
    }

    storeMedicines() {
        let p = [];
        this.props.contract.methods.returnMedicinesprovidedbyManufacturer(this.props.accounts[0]).call().then((medicinesX) => {
            medicinesX.forEach((address) => {
                const medInst = this.getMedicine(address);
                medInst.methods.getMedicineDetails().call().then((data) => {
                    data.pharmacies = []
                    this.props.contract.methods.returnMedicinequantity(data.Medicine_id).call().then((x) => {
                        data.AvlQuantity = x
                    })
                    this.props.contract.methods.returnMedicinesOrderedbyPharmacies(data.Medicine_id).call().then((y) => {
                        y.forEach((value) => {
                            data.pharmacies.push(value + " ")
                        })
                    })
                    data.address = address;
                    p.push(data);
                });
            });
            setTimeout(() => {
                this.setState({
                    medicines: p,
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
            console.log(x)
            // alert(x)
            for (const i in x) {
                const rawMatInst = this.getRawMaterial(x[i]);
                rawMatInst.methods.getRawMaterialDetails().call().then((data) => {
                    raw.push(data);
                    console.log(data)
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
            this.state.medicines !== null ? (this.state.medicines.map((k) => {
                return (
                    <Container className="hover-decoration">
                        <Row className="align-items-center">
                            <Col>
                                <p>Name: {k.Medicine_name}, Id: {k.Medicine_id}</p>
                            </Col>
                        </Row>
                    </Container>
                );
            }
            )) : console.log(this.state.medicines.length)) : (<div>Medicines Loading...</div>)


        const displayParticularMed = this.state.isSet === false ? (
            this.state.ParticularMed !== undefined ? (this.state.ParticularMed.map((k) => {
                return (
                    <Container>
                        <Row className="align-items-center">
                            <Col class="col-md-6">
                                <p>Medicine Name: {k.Medicine_name}</p>
                                <p>Medicine Id: {k.Medicine_id}</p>
                                <p>Medicine Price: {k.Medicine_price}</p>
                                <p>Medicine Description: {k.Description}</p>
                                <p>Available Quantity: {k.AvlQuantity}</p>
                                <p><b>Ordered By Pharmacies </b> {k.pharmacies.map((ph) => {
                                    return (<p> {ph} </p>);
                                })}
                                </p>
                            </Col>
                        </Row>
                    </Container>
                );
            }
            )) : console.log(this.state.ParticularMed)) : (<div></div>)

        const displayRawMaterials = this.state.isSet === false ? (
            this.state.rawmaterials !== null ? (this.state.rawmaterials.map((k) => {
                return (
                    <Container>
                        <Row className="align-items-center">
                            <hr className="hhr" />
                            <Col class="col-md-6">
                                <p>Supplier of Raw Material:{k.Supplier}</p>
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
                    <h3><b>Display Medicine Details</b></h3>
                    <Row>
                        <form onSubmit={this.handleSubmit} max-width="400px" margin="auto" padding="100px">
                            <div className="form-group">
                                <label>Medicine Id</label>
                                <input type="number" name="medicineId" value={this.state.medicineId} onChange={this.handleChange}
                                    className="form-control" placeholder="Medicine Id" />
                            </div>
                            <button type="submit" class="btn btn-primary">Medicine Details</button>
                        </form>
                        <p>{displayParticularMed}</p>
                        <p>{displayRawMaterials}</p>
                    </Row>
                    <hr className="horizontalRow" />
                    <Row>
                        <h3><b>Display Medicines Available with Manufacturer</b></h3>
                        {displayMedicines}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default DisplayMedicine;