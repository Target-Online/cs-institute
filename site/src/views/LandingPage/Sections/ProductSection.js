import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Landscape from "@material-ui/icons/Landscape";
import GraphicEq from "@material-ui/icons/GraphicEq";
import Fingerprint from "@material-ui/icons/CastForEducation";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Financial Education</h2>
          <h5 className={classes.description}>
            CS Institute is a company that provides financial education based on
            statistics and research but not a registered broker, financial
            advisor or financial service provider. So when we give financial
            education to people we don’t give them personal investment advice.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Property Training"
              description="We understand that trading is not for everyone however we believe
              that everyone can be a property investor but before we start giving financial education
              on properties, we believe that it is very crucial to understand why you have to start
              investing in properties?"
              icon={Landscape}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Forex Trading"
              description="Currencies trade in pairs i.e USDZAR. 
              So all Forex trading is, is buying and selling currencies. 
              Since they trade in pairs, that means that when one currency rises the other currency is falling."
              icon={GraphicEq}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Education Service"
              description="The CS Institue financial education service covers the tops:
              Financial Planning, Types of Investment Vehicle, How to build Investment portfolios
              ,Good and Bad Credit and Building good credit score."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
