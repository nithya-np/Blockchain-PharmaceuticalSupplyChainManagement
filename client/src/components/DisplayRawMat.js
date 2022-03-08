import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import RawMaterialContract from "../contracts/Rawmaterial.json";

class DisplayRawMat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    getRawMaterial(address) {
        const instance = new this.props.web3.eth.Contract(RawMaterialContract.abi, address);
        return instance;
    }

    storeRawMaterials() {
        let p = [];
        this.props.contract.methods.returnRawmaterialsprovidedbySupplier(this.props.accounts[0]).call().then((rawMaterialsX) => {
            rawMaterialsX.forEach((address) => {
                const rawMatInst = this.getRawMaterial(address);
                rawMatInst.methods.getRawMaterialDetails().call().then((data) => {
                    data.manufacturers = []
                    this.props.contract.methods.returnRawmaterialquantity(data.Rawmaterial_id).call().then((x) => {
                        data.AvlQuantity = x
                    })
                    this.props.contract.methods.returnRawmaterialsOrderedbyManufacturer(data.Rawmaterial_id).call().then((y) => {
                       y.forEach((value) => {
                            data.manufacturers.push(value + " ")
                        }) 
                    })
                    data.address = address;
                    p.push(data);
                });
            });

            setTimeout(() => {
                this.setState({
                    rawmaterials: p,
                    isLoading: false
                });
            }, 100);
        });
    }
    componentDidMount() {
        this.storeRawMaterials();
    }
    componentDidUpdate() {
        this.storeRawMaterials();
    }

    render() {
        const displayRawMaterials = this.state.isLoading === false ? (
            this.state.rawmaterials !== null ? (this.state.rawmaterials.map((k) => {
                return (
                    <Container className="hover-decoration">
                        <Row className="align-items-center">
                            <Col className="box">
                                <p>Name: {k.Rawmaterial_name}</p>
                                <p>Id: {k.Rawmaterial_id}</p>
                                <p>Price per unit: {k.Rawmaterial_price}</p>
                                <p>Description: {k.Description}</p>
                                <p>Available Quantity: {k.AvlQuantity}</p>
                                <p><b>Ordered By Manufacturers </b> {k.manufacturers.map((man) => {
                                    return (<p> {man} </p>);
                                })}
                                </p>
                            </Col>
                        </Row>
                    </Container>
                );
            }
            )) : console.log(this.state.rawmaterials.length)) : (<div>Raw Materials Loading...</div>)


        return (
            <Container className="form-setup link-setup">
                <Row>
                    <hr className="horizontalRow"/>
                    <h3><b>Available Raw Materials</b></h3>
                    {displayRawMaterials}
                </Row>
            </Container>
        );
    }
}

export default DisplayRawMat;
