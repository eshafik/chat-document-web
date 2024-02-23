import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-top text-center small text-muted py-3">
      <p className="m-0">
        Copyright &copy; {new Date().getFullYear()}
        <a
          href="https://www.linkedin.com/in/shafikte/"
          className="text-muted"
          target="_blank"
        >
          {" "}
          Md. Shafikul Islam [CSE202301021]
        </a>
        . All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
