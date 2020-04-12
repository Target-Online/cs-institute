import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

import LocationDetails from "./Location Details/LocationDetails";
import * as api from "api/index.js";

const useStyles = makeStyles(styles);

export const WorkSection = () => {
  const [email, setEmail] = useState({});
  const classes = useStyles();

  return (
    <div>
      <GridItem cs={12} sm={12} md={12} className={classes.locationdetails}>
        <h2 className={classes.title}>Visit us</h2>
        <LocationDetails />
      </GridItem>
      <GridContainer justify="center" className={classes.section}>
        <GridItem cs={12} sm={12} md={9}>
          <h2 className={classes.title}>Get in touch</h2>
          <h4 className={classes.description}>
            Building wealth through Making thoughtful and informed decisions
            about your finances is more important than ever, Enquire NOW about
            our services!
          </h4>
        </GridItem>
        <GridItem cs={12} sm={12} md={8}>
          <form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Name"
                  id="name"
                  value={email.name}
                  onChangeValue={name => setEmail({ ...email, name: name })}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Email"
                  id="email"
                  value={email.email}
                  onChangeValue={mail => setEmail({ ...email, email: mail })}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <CustomInput
                labelText="Your Message"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                value={email.message}
                onChangeValue={message =>
                  setEmail({ ...email, message: message })
                }
                inputProps={{
                  multiline: true,
                  rows: 5
                }}
              />
              <GridItem xs={12} sm={12} md={4}>
                <Button
                  color="primary"
                  onClick={() => {
                    api.sendEmail(email);
                    toast.success("Emai sent.");
                    setEmail({ name: "", email: "", message: "" });
                  }}
                >
                  Send Message
                </Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default WorkSection;
