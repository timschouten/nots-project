import React, {Component} from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

class PredictForm extends Component {
    constructor(props) {
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

    makePrediction() {
        axios.post('http://localhost:5000/api/pytorch/predict', this.state).then(function (response) {
            console.log(response)
            if (response.data.prediction) {
                alert("U wordt rijk")
            } else {
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
            <Grid>
                <form>
                    <Grid item xs={12}>
                        <TextField
                            label="Leeftijd"
                            value={this.state.age}
                            onChange={this.handleAgeChange}
                            margin="normal"
                            variant="outlined"
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            label="Geslacht"
                            value={this.state.sex}
                            onChange={this.handleSexChange}
                            margin="normal"
                            variant="outlined"
                        >
                            <MenuItem value={0}>Man</MenuItem>
                            <MenuItem value={1}>Vrouw</MenuItem>
                        </TextField>

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            label="Diploma"
                            value={this.state.study}
                            onChange={this.handleStudyChange}
                            margin="normal"
                            variant="outlined"
                        >
                            <MenuItem value={9}>Voortgezet Onderwijs (MAVO/HAVO/VWO)</MenuItem>
                            <MenuItem value={11}>MBO-4</MenuItem>
                            <MenuItem value={12}>Associate degree</MenuItem>
                            <MenuItem value={13}>Bachelor</MenuItem>
                            <MenuItem value={14}>Master</MenuItem>
                            <MenuItem value={16}>Doctorate</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Gain"
                            value={this.state.capitalGain}
                            onChange={this.handleGainChange}
                            margin="normal"
                            variant="outlined"
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Loss"
                            value={this.state.capitalLoss}
                            onChange={this.handleLossChange}
                            margin="normal"
                            variant="outlined"
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>

                        <TextField
                            label="Uren per week"
                            value={this.state.status}
                            onChange={this.handleStatusChange}
                            margin="normal"
                            variant="outlined"
                            type="number"
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            label="In een relatie"
                            value={this.state.status}
                            onChange={this.handleStatusChange}
                            margin="normal"
                            variant="outlined"
                        >
                            <MenuItem value={0}>Nee</MenuItem>
                            <MenuItem value={1}>Ja</MenuItem>
                        </TextField>

                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={() => {
                            this.makePrediction()
                        }}>
                            Voorspel
                        </Button>
                    </Grid>
                </form>
            </Grid>
        );
    }
}

export default PredictForm;
