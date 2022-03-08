import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import history from "./history";
import "../styles/others.scss";

class MedicineForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            MedicineName: '',
            price: '',
            quantity: '',
            description: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleValidation() {
        let name = this.state.MedicineName;
        let price= this.state.price;
        let quan = this.state.quantity;
        let formIsValid = true;

        //Name
        if (typeof name !== "undefined") {
            if (!name.match(/^[a-zA-Z0-9 ]+$/)) {
                formIsValid = false;
                alert("Only letters and numbers are allowed in Name Field.");
            }
        }

        //Price
        if (typeof price !== "undefined") {
            if (price === 0) {
                formIsValid = false;
                alert("Price cannot be 0.");
            }
        }

        //Quantity
        if (typeof quan !== "undefined") {
            if (quan === 0) {
                formIsValid = false;
                alert("Quantity cannot be 0.");
            }
        }
        return formIsValid;
    }

    handleSubmit(event) {
        if (this.handleValidation()) {
            this.props.contract.methods.addMedicine(this.state.MedicineName, this.state.price, this.state.quantity, this.state.description).send({ from: this.props.accounts[0] });
        }
        event.preventDefault();
    }

    render() {
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
                            <form onSubmit={this.handleSubmit} max-width="400px" margin="auto" padding="100px">
                                <h3><b>Medicine Details</b></h3>

                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" name="MedicineName" value={this.state.MedicineName} onChange={this.handleChange}
                                        className="form-control" placeholder="Name" required/>
                                </div>

                                <div className="form-group">
                                    <label>Price per unit</label>
                                    <input type="number" name="price" value={this.state.price} onChange={this.handleChange}
                                        className="form-control" placeholder="Price(in Rs)" required/>
                                </div>

                                <div className="form-group">
                                    <label>Quantity</label>
                                    <input type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange}
                                        className="form-control" placeholder="Quantity" required/>
                                </div>

                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text" name="description" value={this.state.description} onChange={this.handleChange}
                                        className="form-control" placeholder="Description" />
                                </div>

                                <button type="submit" class="btn btn-primary">Add</button>
                            </form>

                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default MedicineForm;