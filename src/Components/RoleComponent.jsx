import React from "react";


let RoleComponent = (props) => {
    if(props.user?.role == props.role){
        return(
            <>
           {/* <h1>role component</h1> */}
            {props.children}    
        </>

        )
    }
    else{
    return ( null
    );
    }
}
export default RoleComponent;