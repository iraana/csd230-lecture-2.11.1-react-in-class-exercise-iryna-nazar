import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../provider/authProvider";

const Logout = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setToken(null); // Clears state and localStorage
        navigate("/login", { replace: true });
    }, [setToken, navigate]);

    return <div style={{textAlign:'center', marginTop:'100px'}}>Logging out...</div>;
};

export default Logout;