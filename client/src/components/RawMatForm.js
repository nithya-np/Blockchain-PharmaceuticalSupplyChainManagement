import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';

class RawMatForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            RawMatName: '',
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
        let name = this.state.RawMatName;
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
            this.props.contract.methods.addRawmaterial(this.state.RawMatName, this.state.price, this.state.quantity, this.state.description).send({ from: this.props.accounts[0] });
            // alert("Form submitted");
        }
        // else {
        //     alert("Form has errors.");
        // }
        event.preventDefault();
    }


    render() {
        return (
            <Container className="form-setup link-setup">
                <Row>
                    <Col max-width="400px" margin="auto" padding="100px">
                        {/* <Col xs="12" md="6"> */}
                        <form onSubmit={this.handleSubmit} max-width="400px" margin="auto" padding="100px">
                            <h3><center><b>Raw Material Details</b></center></h3>

                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="RawMatName" value={this.state.RawMatName} onChange={this.handleChange}
                                    className="form-control" placeholder="Name" required />
                            </div>

                            <div className="form-group">
                                <label>Price per unit</label>
                                <input type="number" name="price" value={this.state.price} onChange={this.handleChange}
                                    className="form-control" placeholder="Price(in Rs)" required />
                            </div>

                            <div className="form-group">
                                <label>Quantity</label>
                                <input type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange}
                                    className="form-control" placeholder="Quantity" required />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <input type="text" name="description" value={this.state.description} onChange={this.handleChange}
                                    className="form-control" placeholder="Description" />
                            </div>

                            <button type="submit" class="btn btn-primary">Publish</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default RawMatForm;
