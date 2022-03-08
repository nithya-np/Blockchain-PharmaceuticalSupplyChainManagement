import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import RawMaterialContract from "../contracts/Rawmaterial.json";
import history from "./history";
import "../styles/others.scss"

class OrderRawMaterials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            medicineId: '',
            rawMaterialId: '',
            rawMaterialQuantity: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        // let rawMat = []
        // for (const i in this.state.rawmaterials) {
        //     if (this.state.rawmaterials[i].Rawmaterial_id === this.state.rawMaterialId) {
        //         rawMat.push(this.state.rawmaterials[i])
        //     }
        // }

        this.props.contract.methods.checkRawmaterialquantity(this.state.rawMaterialId, this.state.rawMaterialQuantity).call().then((x) => {
            if (x) {
                this.props.contract.methods.returnrawmaterialprice(this.state.rawMaterialId).call().then((x) => {
                    let pricee = x * this.state.rawMaterialQuantity
                    // alert(pricee)
                    this.props.contract.methods.orderRawmaterials(this.state.rawMaterialId, this.state.rawMaterialQuantity).send({
                        from: this.props.accounts[0],
                        value: this.props.web3.utils.toHex(this.props.web3.utils.toWei(pricee.toString(), "milliether"))
                    });
                })
            }
            else {
                alert("Ordered raw material or required quantity is not available!!")
            }
        })
        event.preventDefault();
    }

    getRawMaterial(address) {
        const instance = new this.props.web3.eth.Contract(RawMaterialContract.abi, address);
        return instance;
    }

    storeRawMaterials() {
        let p = [];
        this.props.contract.methods.returnAllRawMaterials().call().then((rawMaterialsX) => {
            rawMaterialsX.forEach((address) => {
                const rawMatInst = this.getRawMaterial(address);
                rawMatInst.methods.getRawMaterialDetails().call().then((data) => {
                    this.props.contract.methods.returnRawmaterialquantity(data.Rawmaterial_id).call().then((x) => {
                        if (x !== 0) {
                            data.status = "Available";
                        }
                        else {
                            data.status = "Out of stock";
                        }
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
                    <Container className="hover-decoration1">
                        <Row className="align-items-center">
                            <Col className="box">
                                <p>Supplier Address: {k.Supplier}</p>
                                <p>Name: {k.Rawmaterial_name}</p>
                                <p>Id: {k.Rawmaterial_id}</p>
                                <p>Price: {k.Rawmaterial_price}</p>
                                <p>Description: {k.Description}</p>
                                <p>Status: {k.status}</p>
                            </Col>
                        </Row>
                    </Container>
                );
            }
            )) : console.log(this.state.rawmaterials.length)) : (<div>Raw Materials Loading...</div>)

        return (
            <div>
                <div className="icon2">
                    <button onClick={() => history.push('/manufacturer')} type="button" class="btn btn-default">
                        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    </button>
                </div>
                <Container className="form-setup link-setup" >
                    <article-right>
                        <Row class="col-xs-6">
                            <h3><b>Raw Materials from Suppliers</b></h3>
                            {displayRawMaterials}
                        </Row>
                    </article-right>
                    <article-left>
                        <Row class="col-xs-6">
                            <form className="form1" onSubmit={this.handleSubmit} max-width="400px" margin="auto" padding="100px">
                                <h3><b>Order Raw Materials</b></h3>
                                <div className="form-group">
                                    <label>Raw Material Id</label>
                                    <input type="number" name="rawMaterialId" value={this.state.rawMaterialId} onChange={this.handleChange}
                                        className="form-control" placeholder="Raw Material Id" />
                                </div>
                                <div className="form-group">
                                    <label>Raw Material Quantity</label>
                                    <input type="number" name="rawMaterialQuantity" value={this.state.rawMaterialQuantity} onChange={this.handleChange}
                                        className="form-control" placeholder="Raw Material Quantity" />
                                </div>

                                <button type="submit" class="btn btn-primary">Order</button>
                            </form>
                        </Row>
                    </article-left>
                </Container>
            </div>
        );
    }
}

export default OrderRawMaterials;