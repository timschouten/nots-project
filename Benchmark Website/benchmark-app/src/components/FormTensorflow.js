import React, {Component} from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

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
        <Grid>
        <form>
            <Grid item xs={12}>
                <TextField
                    label="Leeftijd"
                    value={this.state.age}
                    onChange={(e) => this.setState({age: e.target.value})}
                    margin="normal"
                    variant="outlined"
                    type="number"
                />
            </Grid>
            <Grid item xs={12}>
                        <TextField
                            select
                            label="Workclass"
                            value={this.state.workclass}
                            onChange={(e) => this.setState({workclass: e.target.value})}
                            margin="normal"
                            variant="outlined"
                        >
                <MenuItem value={"State-gov"}>State-gov</MenuItem>
                <MenuItem value={"Self-emp-inc"}>Self-emp-inc</MenuItem>
                <MenuItem value={"Self-emp-not-inc"}>Self-emp-not-inc</MenuItem>
                <MenuItem value={"Private"}>Private</MenuItem>
                <MenuItem value={"Federal-gov"}>Federal-gov</MenuItem>
                <MenuItem value={"Local-gov"}>Local-gov</MenuItem>
                <MenuItem value={"State-gov"}>State-gov</MenuItem>
                </TextField>
        </Grid>
        <Grid item xs={12}>
                        <TextField
                            select
                            label="Diploma"
                            value={this.state.education_num}
                            onChange={(e) => this.setState({education_num: e.target.value})}
                            margin="normal"
                            variant="outlined">
                <MenuItem value={"1"}>Preschool</MenuItem>
                <MenuItem value={"2"}>1st-4th</MenuItem>
                <MenuItem value={"3"}>5th-6th</MenuItem>
                <MenuItem value={"4"}>7th-8th</MenuItem>
                <MenuItem value={"5"}>9th</MenuItem>
                <MenuItem value={"6"}>10th</MenuItem>
                <MenuItem value={"7"}>11th</MenuItem>
                <MenuItem value={"8"}>12th</MenuItem>
                <MenuItem value={"9"}>HS-grad</MenuItem>
                <MenuItem value={"10"}>Some-college</MenuItem>
                <MenuItem value={"11"}>Assoc-voc</MenuItem>
                <MenuItem value={"12"}>Assoc-acdm</MenuItem>
                <MenuItem value={"13"}>Bachelors</MenuItem>
                <MenuItem value={"14"}>Masters</MenuItem>
                <MenuItem value={"15"}>Prof-school</MenuItem>
                <MenuItem value={"16"}>Doctorate</MenuItem>
            </TextField>
        </Grid>
        
        <Grid item xs={12}>
                        <TextField
                            select
                            label="Marital status"
                            value={this.state.marital_status}
                            onChange={(e) => this.setState({marital_status: e.target.value})}
                            margin="normal"
                            variant="outlined"
                        >
                <MenuItem value={"Never-married"}>Never-married</MenuItem>
                <MenuItem value={"Divorced"}>Divorced</MenuItem>
                <MenuItem value={"Married-civ-spouse"}>Married-civ-spouse</MenuItem>
                <MenuItem value={"Married-spouse-absent"}>Married-spouse-absent</MenuItem>
                <MenuItem value={"Separated"}>Separated</MenuItem>
                <MenuItem value={"Widowed"}>Widowed</MenuItem>
</TextField>
</Grid>
<Grid item xs={12}>
                        <TextField
                            label="Occupation"
                            value={this.state.occupation}
                            onChange={(e) => this.setState({occupation: e.target.value})}
                            margin="normal"
                            variant="outlined"
                            type="text"
                        />
                    </Grid>
        
                    <Grid item xs={12}>
                        <TextField
                            select
                            label="Relationship"
                            value={this.state.relationship}
                            onChange={(e) => this.setState({relationship: e.target.value})}
                            margin="normal"
                            variant="outlined"
                        >
                <MenuItem value={"Husband"}>Husband</MenuItem>
                <MenuItem value={"Wife"}>Wife</MenuItem>
                <MenuItem value={"Unmarried"}>Unmarried</MenuItem>
                <MenuItem value={"Own-child"}>Own-child</MenuItem>
                <MenuItem value={"Not-in-family"}>Not-in-family</MenuItem>
                <MenuItem value={"Other-relative"}>Other-relative</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={12}>
                        <TextField
                            select
                            label="Sex"
                            value={this.state.sex}
                            onChange={(e) => this.setState({sex: e.target.value})}
                            margin="normal"
                            variant="outlined"
                        >
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                        </TextField>

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Capital gain"
                            value={this.state.capital_gain}
                            onChange={(e) => this.setState({capital_gain: e.target.value})}
                            margin="normal"
                            variant="outlined"
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Capital loss"
                            value={this.state.capital_loss}
                            onChange={(e) => this.setState({capital_loss: e.target.value})}
                            margin="normal"
                            variant="outlined"
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Hours per week"
                            value={this.state.hours_per_week}
                            onChange={(e) => this.setState({hours_per_week: e.target.value})}
                            margin="normal"
                            variant="outlined"
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Native country"
                            value={this.state.native_country}
                            onChange={(e) => this.setState({native_country: e.target.value})}
                            margin="normal"
                            variant="outlined"
                            type="text"
                        />
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

export default PredictFormCoen;
