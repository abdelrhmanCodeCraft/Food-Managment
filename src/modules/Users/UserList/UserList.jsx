import React, { Fragment } from 'react'
import Header from '../../shared/Header/Header';
import another from "../../../assets/images/another.png";


const UserList = () => {
  return (
    <Fragment>
      <Header
        title={"hello users"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        img={another}
      />
    </Fragment>
  );
}

export default UserList
