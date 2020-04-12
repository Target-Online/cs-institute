import "./index.css";

import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

import FormControlLabel from "@material-ui/core/FormControlLabel";

import GoogleMaps from "./google-maps.js";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

// eslint-disable-next-line react/prop-types
const CustomControlLabel = ({ icon, label }) => (
  <FormControlLabel
    className={"formControlLabel"}
    control={<Icon className={icon} color="primary" />}
    label={label}
  />
);

const LocationDetails = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} md={3}>
          <CustomControlLabel
            icon={"fa fa-envelope"}
            label={"info@csinvestment.co.za"}
          />

          <CustomControlLabel
            icon={"fa fa-phone"}
            label={<span>{"Cell & WhatsApp: 0710773795"}</span>}
          />

          <CustomControlLabel
            icon={"fa fa-home"}
            label={"Rosebank, Cape Town, Western Cape, 7700"}
          />
        </Grid>
        <Grid item xs={12} sm={9} md={9}>
          <Paper className={classes.paper}>
            <GoogleMaps />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
export default LocationDetails;
