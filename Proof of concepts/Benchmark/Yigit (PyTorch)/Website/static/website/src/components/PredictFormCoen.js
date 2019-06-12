import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class PredictFormCoen extends Component {
    constructor(props){
        super(props);
        this.state = {
            age: 18,
            workclass: "",
            education_num: 0,
            marital_status: "",
            occupation: "",
            relationship: "",
            sex: "",
            capital_gain: 0,
            capital_loss: 0,
            hours_per_week: 0,
            native_country: ""
        };
    }

    makePrediction(){
        axios.post(this.props.predictUrl, this.state).then(function (response) {
            console.log(response);
            if (response.data.prediction){
                alert("U wordt rijk");
            }
            else{
                alert("Dat wordt minder dan 50k");
            }
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

  render() {
    return (
        <Form>
        <FormGroup>
            <Label>Leeftijd</Label>
            <Input value={this.state.age} onChange={(e) => this.setState({age: e.target.value})} type="number" name="age" placeholder="Leeftijd" />
        </FormGroup>
        <FormGroup>
            <Label for="Workclass">Workclass</Label>
            <Input value={this.state.workclass} onChange={(e) => this.setState({workclass: e.target.value})} type="select" name="Workclass">
                <option value={"State-gov"}>State-gov</option>
                <option value={"Self-emp-inc"}>Self-emp-inc</option>
                <option value={"Self-emp-not-inc"}>Self-emp-not-inc</option>
                <option value={"Private"}>Private</option>
                <option value={"Federal-gov"}>Federal-gov</option>
                <option value={"Local-gov"}>Local-gov</option>
                <option value={"State-gov"}>State-gov</option>
            </Input>
        </FormGroup>
        <FormGroup>
            <Label for="Workclass">Education</Label>
            <Input value={this.state.education_num} onChange={(e) => this.setState({education_num: e.target.value})} type="select" name="education_num">
                <option value={"1"}>Preschool</option>
                <option value={"2"}>1st-4th</option>
                <option value={"3"}>5th-6th</option>
                <option value={"4"}>7th-8th</option>
                <option value={"5"}>9th</option>
                <option value={"6"}>10th</option>
                <option value={"7"}>11th</option>
                <option value={"8"}>12th</option>
                <option value={"9"}>HS-grad</option>
                <option value={"10"}>Some-college</option>
                <option value={"11"}>Assoc-voc</option>
                <option value={"12"}>Assoc-acdm</option>
                <option value={"13"}>Bachelors</option>
                <option value={"14"}>Masters</option>
                <option value={"15"}>Prof-school</option>
                <option value={"16"}>Doctorate</option>
            </Input>
        </FormGroup>
        <FormGroup>
            <Label>Marital status</Label>
            <Input value={this.state.marital_status} onChange={(e) => this.setState({marital_status: e.target.value})} type="select" name="marital_status">
                <option value={"Never-married"}>Never-married</option>
                <option value={"Divorced"}>Divorced</option>
                <option value={"Married-civ-spouse"}>Married-civ-spouse</option>
                <option value={"Married-spouse-absent"}>Married-spouse-absent</option>
                <option value={"Separated"}>Separated</option>
                <option value={"Widowed"}>Widowed</option>
            </Input>
        </FormGroup>
        <FormGroup>
            <Label>Occupation</Label>
            <Input value={this.state.occupation} onChange={(e) => this.setState({occupation: e.target.value})} type="text" name="occupation" placeholder="Occupation" />
        </FormGroup>
        <FormGroup>
            <Label>Relationship</Label>
            <Input value={this.state.relationship} onChange={(e) => this.setState({relationship: e.target.value})} type="select" name="relationship">
                <option value={"Husband"}>Husband</option>
                <option value={"Wife"}>Wife</option>
                <option value={"Unmarried"}>Unmarried</option>
                <option value={"Own-child"}>Own-child</option>
                <option value={"Not-in-family"}>Not-in-family</option>
                <option value={"Other-relative"}>Other-relative</option>
            </Input>
        </FormGroup>
        <FormGroup>
            <Label>Sex</Label>
            <Input value={this.state.sex} onChange={(e) => this.setState({sex: e.target.value})} type="select" name="Sex">
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Wife</option>
            </Input>
        </FormGroup>
        <FormGroup>
            <Label>Capital gain</Label>
            <Input value={this.state.capital_gain} onChange={(e) => this.setState({capital_gain: e.target.value})} type="text" name="capital_gain" placeholder="Capital gain" />
        </FormGroup>
        <FormGroup>
            <Label>Capital loss</Label>
            <Input value={this.state.capital_loss} onChange={(e) => this.setState({capital_loss: e.target.value})} type="text" name="capital_loss" placeholder="Capital loss" />
        </FormGroup>
        <FormGroup>
            <Label>Hours per week</Label>
            <Input value={this.state.hours_per_week} onChange={(e) => this.setState({hours_per_week: e.target.value})} type="text" name="hours_per_week" placeholder="Hours per week" />
        </FormGroup>
        <FormGroup>
            <Label>Native country</Label>
            <Input value={this.state.native_country} onChange={(e) => this.setState({native_country: e.target.value})} type="text" name="native_country" placeholder="Native country<" />
        </FormGroup>
        <Button color="primary" onClick={() => {this.makePrediction()}} size="lg">Voorspel</Button>
      </Form>
    );
  }
}

export default PredictFormCoen;
