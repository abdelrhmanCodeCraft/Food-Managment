import React from 'react'
import group from "../../../assets/images/Group 48102290.png";


const NoData = () => {
  return (
    <td colSpan="4" className="text-center">
      <img style={{ marginTop: "6rem" }} src={group} alt="not found" />
      <h4>no data</h4>
      <p style={{ color: "gray", marginTop: "-1rem" }}>
        are you sure you want to delete this item ? if you are sure just <br />{" "}
        click on delete it
      </p>
    </td>
  );
}

export default NoData
