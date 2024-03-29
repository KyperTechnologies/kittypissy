import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-kit-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          {/*<List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.creative-tim.com/presentation?ref=mkr-footer"
                className={classes.block}
              >
                About us
              </a>
            </ListItem>
          </List>*/}
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} , made by{" "}
            KyperTech
          {" "}
          for a better web.
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
