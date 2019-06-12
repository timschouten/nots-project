import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Form from './PredictForm';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  }
}))

function PyTorch() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.toolbar} />
        <h1>PyTorch</h1>
        <Typography paragraph>
            PyTorch is a Machine Learning framework, it is primarily developed by Facebook's artificial-intelligence research group.
            PyTorch only supports Python as a program language.
        </Typography>
        <h2>Introdution</h2>
        <Typography paragraph>
          For making this benchmark, we used the <a href="https://www.kaggle.com/overload10/income-prediction-on-uci-adult-dataset" rel="noopener noreferrer" target="_blank">Adult dataset</a> from Kaggle.
          We wanted to make a prediction about the income of a single person.
        </Typography>
        
        <h2>Neural Network</h2>
        <Typography paragraph>
            For solving this problem we used the linear neural network.<br/>
            Our problem isn't that complex, we only need to know if someone is earning more than 50.000 dollars a year or less, so a linear neural network would be enough to make a prediction.
        </Typography>
        <Form/>
    </div>
  );
}
export default PyTorch;
