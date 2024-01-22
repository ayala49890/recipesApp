import { Link } from "react-router-dom";
import React from 'react';
import FirstMenu from "./header/firstMenu";

export default function Entery() {
    return (
       
            <div className="entry">
                <FirstMenu />
                <h2 style={{ color: "wheat",position:"relative",fontSize:"100px",  fontStyle: "italic"}}>  Welcome!</h2>
              
                <Link to="/notFound" style={{ color: "coral", textDecoration: "none", position: "absolute", left: "10%", top: "80%" }}>
                    <p>💡Help ⚙️Setting</p>
                </Link>
            </div>
       
    );
}
