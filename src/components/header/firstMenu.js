import { Link } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";

export default function FirstMenu() {
    return (
        <div className="menu">
            <Link to="/login" className="link">
                התחברות
            </Link>
            <Link to="/signUp" className="link">
                הרשמה
            </Link>

        </div>)
}