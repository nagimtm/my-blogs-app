import React from "react";
import classes from "./footer.module.css";
import Link from "next/link";
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
            geographic location.
          </p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>Phone: +49123456789</span>
          <span>
            YouTube:{" "}
            <Link href={"https://www.youtube.com/@QuantumTech"}>
              https://www.youtube.com/@QuantumTech
            </Link>
          </span>
          <span>GitHub: <Link href={https://github.com/nagimtm}>https://github.com/nagimtm</Link></span>
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
