
import { Link } from "react-router-dom";
import React from 'react'


const MainMenu = () => {
  
  return (
    
    <div className="menu">
      
      <Link to="/home" className="link">דף הבית
      </Link>
      <Link to="/recipes" className="link">
        מתכונים
      </Link>
      <Link to="/myRecipes" className="link">
        המתכונים שלי
      </Link>

      <Link to="/buying" className="link">
        רשימת קניות
      </Link>
      <Link to="/addRcipe" className="link">
        הוספת מתכון
      </Link>
      <Link to="/addCategory" className="link">
        הוספת קטגוריה
      </Link>
      <Link to="/login" className="link"  >
        החלף משתמש
      </Link>
    </div> 
            
  )
}


export default MainMenu;