import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class PredictForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            age: 18,
            fnlwgt: 751342,
            study: 13,
            sex: 0,
            capitalGain: 0,
            capitalLoss: 0,
            hoursPerWeek: 16,
            status: 0
        }
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleSexChange = this.handleSexChange.bind(this);
        this.handleStudyChange = this.handleStudyChange.bind(this);
        this.handleGainChange = this.handleGainChange.bind(this);
        this.handleLossChange = this.handleLossChange.bind(this);
        this.handleHoursChange = this.handleHoursChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    handleAgeChange(event) {
        this.setState({age: Number(event.target.value)});
    }

    handleSexChange(event) {
        this.setState({sex: Number(event.target.value)});
    }

    handleStudyChange(event) {
        this.setState({study: Number(event.target.value)});
    }

    handleGainChange(event) {
        this.setState({capitalGain: Number(event.target.value)});
    }

    handleLossChange(event) {
        this.setState({capitalLoss: Number(event.target.value)});
    }

    handleHoursChange(event) {
        this.setState({hoursPerWeek: Number(event.target.value)});
    }

    handleStatusChange(event) {
        this.setState({status: Number(event.target.value)});
    }

    makePrediction(){
        axios.post('http://localhost:5000/api/predict', this.state).then(function (response) {
            console.log(response)
            if (response.data.prediction){
                alert("U wordt rijk")
            }
            else{
                alert("Dat wordt minder dan 50k")
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
            <Label for="exampleEmail">Leeftijd</Label>
            <Input value={this.state.age} onChange={this.handleAgeChange} type="number" name="age" id="exampleEmail" placeholder="Leeftijd" />
        </FormGroup>
        <FormGroup>
            <Label for="exampleSelect">Geslacht</Label>
            <Input value={this.state.sex} onChange={this.handleSexChange} type="select" name="select">
            <option value={0}>Man</option>
            <option value={1}>Vrouw</option>
            </Input>
        </FormGroup>
        <FormGroup>
            <Label for="exampleSelect">Diploma</Label>
            <Input value={this.state.study} onChange={this.handleStudyChange} type="select" name="select" id="exampleSelect">
            <option value={9}>Voortgezet Onderwijs (MAVO/HAVO/VWO)</option>
            <option value={11}>MBO-4</option>
            <option value={12}>Associate degree</option>
            <option value={13}>Bachelor</option>
            <option value={14}>Master</option>
            <option value={16}>Doctorate</option>
            </Input>
        </FormGroup>
        <FormGroup>
            <Label>Capital Gain</Label>
            <Input value={this.state.capitalGain} onChange={this.handleGainChange} type="number" name="gain" placeholder="Gain" />
        </FormGroup>
        <FormGroup>
            <Label>Capital Loss</Label>
            <Input value={this.state.capitalLoss} onChange={this.handleLossChange} type="number" name="loss" placeholder="Loss" />
        </FormGroup>
        <FormGroup>
            <Label>Werkuren per week</Label>
            <Input value={this.state.hoursPerWeek} onChange={this.handleHoursChange} type="number" name="perWeek" placeholder="Uren per week" />
        </FormGroup>
        <FormGroup>
            <Label for="exampleSelect">In een relatie</Label>
            <Input value={this.state.status} onChange={this.handleStatusChange} type="select" name="select">
            <option value={0}>Nee</option>
            <option value={1}>Ja</option>
            </Input>
        </FormGroup>
        <Button color="primary" onClick={() => {this.makePrediction()}} size="lg">Voorspel</Button>
      </Form>
    );
  }
}

export default PredictForm;
