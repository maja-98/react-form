import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const title = pathname === "/" ? "User Form" : "Users";
  return (
    <div className="header">
      <h1 onClick={() => navigate("/")}>{title}</h1>
    </div>
  );
};

export default Header;
