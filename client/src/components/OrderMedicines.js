import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import MedicineContract from "../contracts/Medicine.json";
import "../App.css";
import "../styles/others.scss";
import history from "./history";

class OrderMedicines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isOpen: false,
            medicineId: '',
            medicineQuantity: ''
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
        // let med=[]
        // for(const i in this.state.medicines){
        //     if(this.state.medicines[i].Medicine_id===this.state.medicineId){
        //         med.push(this.state.medicines[i])
        //     }
        // }

        this.props.contract.methods.checkMedicinequantity(this.state.medicineId, this.state.medicineQuantity).call().then((x) => {
            if (x) {
                this.props.contract.methods.returnmedicineprice(this.state.medicineId).call().then((x) => {
                    let pricee = x * this.state.medicineQuantity
                    // alert(pricee)
                    this.props.contract.methods.orderMedicines(this.state.medicineId, this.state.medicineQuantity).send({
                        from: this.props.accounts[0],
                        value: this.props.web3.utils.toHex(this.props.web3.utils.toWei(pricee.toString(), "milliether"))
                    });
                })
            }
            else {
                alert("Ordered medicine or required quantity is not available!")
            }
        })
        event.preventDefault();
    }

    getMedicine(address) {
        const instance = new this.props.web3.eth.Contract(MedicineContract.abi, address);
        return instance;
    }

    storeMedicines() {
        let p = [];
        this.props.contract.methods.returnAllMedicines().call().then((medicinesX) => {
            medicinesX.forEach((address) => {
                const rawMatInst = this.getMedicine(address);
                rawMatInst.methods.getMedicineDetails().call().then((data) => {
                    this.props.contract.methods.returnMedicinequantity(data.Medicine_id).call().then((x) => {
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

    render() {
        //console.log((this.state.projects));
        const displayMedicines = this.state.isLoading === false ? (
            this.state.medicines !== null ? (this.state.medicines.map((k) => {
                return (
                    <Container className="hover-decoration4">
                        <Row className="align-items-center">
                            <Col className="box4">
                                <p>Manufacturer Address: {k.Manufacturer}</p>
                                <p>Name: {k.Medicine_name}</p>
                                <p>Id: {k.Medicine_id}</p>
                                <p>Price: {k.Medicine_price}</p>
                                <p>Description: {k.Description}</p>
                                <p>Status: {k.status}</p>
                            </Col>
                        </Row>
                        <hr className="hhr" />
                    </Container>
                );
            }
            )) : console.log(this.state.medicines.length)) : (<div>Medicines Loading...</div>)

        return (
            <div>
                <div className="icon2">
                    <button onClick={() => history.push('/pharma')} type="button" class="btn btn-default">
                        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    </button>
                </div>
                <Container className="form-setup link-setup">
                    <article-right>
                        <Row>
                            <h3><b>Display Medicines from Manufacturers</b></h3>
                            {displayMedicines}
                        </Row>
                    </article-right>
                    <article-left>
                        <h3><b>Order Medicines</b></h3>
                        <Row>
                            <form onSubmit={this.handleSubmit} max-width="400px" margin="auto" padding="100px">
                                <div className="form-group">
                                    <label>Medicine Id</label>
                                    <input type="number" name="medicineId" value={this.state.medicineId} onChange={this.handleChange}
                                        className="form-control" placeholder="Medicine Id" />
                                </div>
                                <div className="form-group">
                                    <label>Medicine Quantity</label>
                                    <input type="number" name="medicineQuantity" value={this.state.medicineQuantity} onChange={this.handleChange}
                                        className="form-control" placeholder="Medicine Quantity" />
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

export default OrderMedicines;