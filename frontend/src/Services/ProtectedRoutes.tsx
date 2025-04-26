import { jwtDecode } from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: JSX.Element;
    allowedRoles: string[];
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const token = useSelector((state: any) => state.jwt); 
    if (!token) {
        return <Navigate to="/login" />; 
    }
    
    const decoded: any = jwtDecode(token);
    console.log("Decoded token:", decoded); // Add this for debugging
    console.log("Checking role:", decoded.accountType); // Check the actual field
    console.log("Allowed roles:", allowedRoles);
    

    const userRole = decoded.accountType;
    const isAllowed = allowedRoles.includes(userRole);
    console.log(`User role: ${userRole}, Allowed: ${isAllowed}`);

    if (!isAllowed) {
        return <Navigate to="/unauthorized" />;
    }

    // Change this line to use accountType instead of applicantType
    // if (allowedRoles && !allowedRoles.includes(decoded.accountType)) {
    //     return <Navigate to="/unauthorized" />; 
    // }
    console.log("Protection passed, rendering children");
return children;
}

export default ProtectedRoutes;