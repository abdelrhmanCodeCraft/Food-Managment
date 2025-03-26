import React, { Fragment } from 'react'
import Header from '../shared/Header/Header'
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import dash from '../../assets/images/dash.png'


const Dashboard = ({loginData}) => {
    return (
        <Fragment>

            <Header title = {`welcom ${loginData?.userName}`} description = {'This is a welcoming screen for the entry of the application , you can now see the options'}
            img={dash} />

            <div className="title back" style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"3rem", width:"97%", margin:"auto", borderRadius:"2rem", flexWrap:"wrap", gap:"3rem"}}>
                <div className="left">
                    <h3>Fill the <span className='text-success'>Recipes</span> !</h3>
                    <span style={{fontSize:"1rem", color:"gray"}}>you can now fill the meals easily using the table and form , <br />click here and sill it with the table !</span>
                </div>
                <div className="right">
                    <Link to='/dashboard/recipe-list' className="btn btn-success " style={{padding:"1em 3rem", display:"flex", alignItems:"center", gap:"1.4rem"}}>fill Recipes <FaArrowRightLong /></Link>
                </div>
            </div>
        </Fragment>
    )
}

export default Dashboard;
