import React from 'react'

const Header = ({ title, description, img }) => {
  return (
    <div
      className="container-fliid mb-3 mt-3"
      style={{ width: "95%", margin: "auto" }}
    >
      <div
        className="row d-flex align-items-center "
        style={{
          borderRadius: "1rem",
          justifyContent: "space-between",
          margin: "auto",
          background: "#009247",
        }}
      >
        <div className="col-md-8">
          <div className="caption " style={{ padding: "5rem" }}>
            <h2
              style={{ color: "white", fontWeight: "bold", fontSize: "3rem" }}
            >
              {title}
            </h2>
            <p style={{ color: "white" }}>{description}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="img-container">
            <img src={img} alt="image" style={{ marginTop: "1em" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header
