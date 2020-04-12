/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import appsettings from 'appsettings.json';
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
        <ListItem className={classes.listItem}>
        <Tooltip
          id="twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href={appsettings.socialLinks.twitter}
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href={appsettings.socialLinks.facebook}
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href={appsettings.socialLinks.instagram}
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
      {/*<ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText=""
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              Dashboard
            </Link>,
            <a
              href="https://firebasestorage.googleapis.com/v0/b/cs-institute.appspot.com/o/Production%2Fresources%2FWhy%20financial%20education%20should%20be%20compulsory%20for%20all%20students.pdf?alt=media&token=a7eeb771-b800-4550-a549-8b6bd9ab3e20"
              target="_blank"
              className={classes.dropdownLink}
            >
              Download Introduction
            </a>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
            color="transparent"
            href="/login"
            className={classes.navLink}
          >
            <AccountCircle className={classes.icons} /> Sign in
        </Button>
      </ListItem>
        */}
        <ListItem className={classes.listItem}>
        <Button
            color="transparent"
            target="_blank"
            href="https://firebasestorage.googleapis.com/v0/b/cs-institute.appspot.com/o/Production%2Fresources%2FWhy%20financial%20education%20should%20be%20compulsory%20for%20all%20students.pdf?alt=media&token=a7eeb771-b800-4550-a549-8b6bd9ab3e20"
            className={classes.navLink}
          >
            <CloudDownload className={classes.icons} /> Introduction
        </Button>
      </ListItem>
    </List>
  );
}
