import { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { IoSearch } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import ellipes from "../../../assets/images/Ellipse 234.svg";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";


function NavBar({ loginData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-gray"
        style={{
          background: "#f3f3f3",
          width: "97%",
          margin: "auto",
          borderRadius: "0.7rem",
          marginTop: "2rem",
        }}
      >
        <Container fluid>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              background: "white",
              padding: "0.4rem 2rem",
              borderRadius: "2rem",
              width: "70%",
            }}
          >
            <IoSearch />
            <input
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "black",
              }}
              type="text"
              placeholder="Search here"
            />
          </label>
          <Navbar.Toggle aria-controls="navbarScroll" className="ms-auto" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto mb-2 my-lg-0 d-flex gap-3 align-items-center"
              navbarScroll
            >
              <div className="avatar d-flex gap-1 align-items-center">
                <img src={ellipes} alt="avatar" />
                <Nav.Link
                  style={{ fontSize: "0.8rem", fontWeight: "500" }}
                  href="#action2"
                >
                  {loginData?.userName}
                </Nav.Link>
              </div>

              <div
                className="position-relative d-inline-block"
                ref={dropdownRef}
              >
                <button
                  className="btn border-0"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-expanded={isOpen}
                >
                  <FaChevronDown
                    className={`fs-5 transition ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="dropdown-menu-custom show">
                    <Link
                      to="/change-pass"
                      onClick={() => setShowChangePassword(true)}
                      style={{ cursor: "pointer", color:"black", textDecoration:"none" }}
                    >
                      Change Password
                    </Link>
                  </div>
                )}
              </div>

              <div className="icon">
                <IoIosNotifications style={{ fontSize: "1.5rem" }} />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showChangePassword && (
        <ChangePass
          show={showChangePassword}
          handleClose={() => setShowChangePassword(false)}
        />
      )}
    </>
  );
}

export default NavBar;
