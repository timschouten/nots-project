import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

const rows = [
    {
        name: "ML.NET",
        csharp: true,
        cplus: true,
        java: false,
        javascript: false,
        python: false
    },
    {
        name: "PyTorch",
        csharp: false,
        cplus: false,
        java: false,
        javascript: false,
        python: true
    },
    {
        name: "Tensorflow",
        csharp: false,
        cplus: true,
        java: true,
        javascript: true,
        python: true
    },
    {
        name: "VanillaJS",
        csharp: false,
        cplus: false,
        java: false,
        javascript: true,
        python: false
    }
];

function FrameworkTable() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Framework</TableCell>
            <TableCell align="right">C#</TableCell>
            <TableCell align="right">C++</TableCell>
            <TableCell align="right">Java</TableCell>
            <TableCell align="right">Javascript</TableCell>
            <TableCell align="right">Python</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.csharp ? "✓" : "✖"}</TableCell>
              <TableCell align="right">{row.cplus ? "✓" : "✖"}</TableCell>
              <TableCell align="right">{row.java ? "✓" : "✖"}</TableCell>
              <TableCell align="right">{row.javascript ? "✓" : "✖"}</TableCell>
              <TableCell align="right">{row.python ? "✓" : "✖"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default FrameworkTable;