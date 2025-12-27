import { useNavigate } from "react-router-dom";
import "./AboutMeFooter.css"

export default function AboutMeFooter(){

    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem("accessToken");
    if(!isLoggedIn){
        return null;
    }

    const handleEdit = () => {
        const updatePath = `/about_me/update`;
        console.log("Navigating to:", updatePath);
        navigate(updatePath);
    };

    return(
        <div className="aboutme-action-button-container">
            <button className="aboutme-action-button edit-button" onClick={handleEdit}>Edit</button>
        </div>
    )
}