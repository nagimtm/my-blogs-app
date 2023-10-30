import React from "react";
import classes from "./footer.module.css";
const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the App</h2>
          <p>
            Much like social media platforms, blogs allow people to share their
            thoughts and experiences with others. Given the active comment
            sections, they enable people to interact with one another and build
            relationships based on shared interests that are not limited by
            geographic location. They are an impactful form of information
            exchange. Essentially, blogs have become a social platform unto
            themselves and a central part of online community building.
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
