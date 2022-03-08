import React from "react";
import "../styles/style.scss";
import loginImg from "../styles/icon2.png";
import history from "./history";

class Login extends React.Component {
   constructor(props) {
      super(props);
      this.setSupplier = this.setSupplier.bind(this);
      this.setManufacturer = this.setManufacturer.bind(this);
      this.setPharma = this.setPharma.bind(this);
  }

   setSupplier() {
      console.log("setSupplier")
      this.props.contract.methods.checkSupplier(this.props.accounts[0]).call().then((x)=>{
          if(x){
              history.push('/supplier')
          }
          else{
              alert("Register and choose your role correctly!")
          }
        }) 
   }

   setManufacturer() {
      console.log("setManufacturer")
      this.props.contract.methods.checkManufacturer(this.props.accounts[0]).call().then((x)=>{
        if(x){
            history.push('/manufacturer')
        }
        else{
            alert("Register and choose your role correctly!")
        }
      }) 
   }

   setPharma() {
      console.log("setPharma")
      this.props.contract.methods.checkPharmacy(this.props.accounts[0]).call().then((x)=>{
        if(x){
            history.push('/pharma')
        }
        else{
            alert("Register and choose your role correctly!")
        }
      }) 
   }


    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Login</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg} />
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

export default Login;