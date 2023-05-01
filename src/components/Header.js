import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const title = pathname === "/" ? "User Form" : "Users";
  const toggleHead = pathname === "/" ? "View users" : "Add user";
  const toggleLink = pathname === "/" ? "/users" : "/";
  return (
    <div className="header">
      <h1 className="w-100">{title}</h1>
      <div className="d-flex-center">
        <h3 onClick={() => navigate(toggleLink)}>{toggleHead}</h3>
      </div>
    </div>
  );
};

export default Header;
