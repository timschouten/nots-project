import React from 'react';
import axios from 'axios';
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";

function getData() {
   axios.get('http://localhost:5000/api/test/model').then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log("Error " + error);
  });
}

let value = 13;

const style = {
    marginTop: 50,
    paddingBottom: 50,
    paddingTop: 25,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
};

const handleChange = (event, index, newValue) => {
    value = newValue;
};

export const Home = () => {
    return <section>
                <div className="container text-center">
                    <h1>Hello</h1>
                    <p>test</p>
                     <div className="col-md-6 col-md-offset-3">
                <Paper style={style}>
                    <form role="form">
                        <div className="text-center">

                            <div className="col-md-12">
                                <TextField
                                  hintText="Leeftijd   "
                                  floatingLabelText="Leeftijd"
                                  type="number"
                                />
                            </div>
                            <div className="col-md-12 left">
                                 <SelectField
                                      floatingLabelText="Diploma"
                                      value={value}
                                      onChange={handleChange}
                                    >
                                      <MenuItem value={9} primaryText="Voortgezet onderwijs" />
                                      <MenuItem value={11} primaryText="MBO-4" />
                                      <MenuItem value={12} primaryText="Associate degree" />
                                      <MenuItem value={13} primaryText="Bachelors" />
                                      <MenuItem value={14} primaryText="Masters" />
                                      <MenuItem value={16} primaryText="Doctorate" />
                                    </SelectField>
                            </div>
                            <div className="col-md-12">
                                <TextField
                                  hintText="Password"
                                  floatingLabelText="Password"
                                  type="password"
                                />
                            </div>

                            <RaisedButton
                              style={{ marginTop: 50 }}
                              label="Submit"
                            />

                        </div>
                    </form>
                </Paper>

            </div>
                </div>
            </section>
}
