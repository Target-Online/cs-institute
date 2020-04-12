import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import team1 from "assets/img/faces/team1.jpg";
import team2 from "assets/img/faces/team2.png";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Our team</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team1} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Chulumanco Sentile
                <br />
                <small className={classes.smallTitle}>
                  Chief Executive Officer of CS Institute
                </small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  He previously worked for Bankseta, First National Bank,
                  Standard bank and he is currently now working for Allan Gray.
                  Apart from being an active CEO at CS investment solutions,
                  Chulumanco is also responsible for Financial Education,
                  Property Education and Binary options trading in our business.
                  He holds Bcom degree in Economics, Finance and Investment. He
                  also holds NQ5 in Credit Risk Assessment and Management for
                  bankers. He is currently busy finalizing Bcom Honours in
                  Economics and also doing CFA level one. He is an aspiring
                  Charted Financial Analyst.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  target="_blank"
                  href="https://twitter.com/sen_tile"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  target="_blank"
                  href="https://web.facebook.com/profile.php?id=100009470519482"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-facebook"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  target="_blank"
                  href="https://www.instagram.com/chuma_sentile/?hl=en"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-instagram"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team2} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Monwabisi Zikolo
                <br />
                <small className={classes.smallTitle}>
                  Chief Financial Officer (CFO), Head Forex Trader
                </small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Final year in Bcom Accounting at UCT, currently in the process
                  of completing CFA level 1 and an aspiring Chartered Accountant
                  and Chartered Financial Analyst. He previously did Internships
                  at the big 4 Audit firms, He also owns an Investment company
                  “Smart Financial Investments”. Responsible for Forex trading
                  training as well as Financial Education
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  target="_blank"
                  href="https://wa.me/27629351058"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-whatsapp"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  target="_blank"
                  href="https://za.linkedin.com/in/monwabisizikolo"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-linkedin"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
