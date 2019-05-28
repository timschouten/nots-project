import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  }
}))

function Tensorflow() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.toolbar} />
        <h1>Tensorflow</h1>
        <Typography paragraph>
          What framework shall I use for my project? 
          Don't we all have the same problem when starting a new project. 
          We already did the research for you and put every result on this website. You only need to choose what the best framework is that suits you.
        </Typography>
    </div>
  );
}
export default Tensorflow;
