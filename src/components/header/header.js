
import { useEffect } from "react";
import FirstMenu from "./firstMenu";
import MainMenu from "./mainMenu";
import { useSelector } from "react-redux";

function Header() {

    const user = useSelector(state => state.user.user) 
    return (<>
        <h1 className="hhh">with appetite!</h1>
    
        <div className="container">
            {user ? <MainMenu /> : <FirstMenu />}            
        </div>
       


    </>
    )
}
export default Header;