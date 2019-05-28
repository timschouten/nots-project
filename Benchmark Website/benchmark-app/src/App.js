import React from 'react';
import Header from './components/Header';
import { makeStyles } from '@material-ui/core/styles';
import Home from './components/Home';
import MLNET from './components/MLNET';
import PyTorch from './components/PyTorch';
import Tensorflow from './components/Tensorflow';
import TensorflowJS from './components/TensorflowJS';
import VanillaJS from './components/VanillaJS';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: "24px 4em 24px 8em",
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
    <Router>
        <Header/>
        <main className={classes.content}>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/ml-net" component={MLNET}/>
                <Route path="/pytorch" component={PyTorch}/>
                <Route path="/tensorflow" component={Tensorflow}/>
                <Route path="/tensorflowjs" component={TensorflowJS}/>
                <Route path="/vanillajs" component={VanillaJS}/>
              </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
