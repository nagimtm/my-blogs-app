import React from "react";
import classes from "./footer.module.css";
const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the App</h2>
          <p>
            the build using react-scripts will error out with the message Cannot
            find module: . Make sure this package is installed.. this happens
            before though. I am still using node 14 as usual
          </p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>Phone: +49123456789</span>
          <span>YouTube: myblog</span>
          <span>GitHub: mygithub </span>
        </div>
        <div className={classes.col}>
          <h2>Location</h2>
          <span>Continent: Europe</span>
          <span>Country: Germany</span>
          <span>Current Location: Germany</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
