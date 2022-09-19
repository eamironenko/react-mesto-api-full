import React from "react";

export const useInputData =()=>{
    const [values, setValues] = React.useState({});
    const handleChange=(e) => {
        const {name, value} = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value 
        }))
    }
    return [values, setValues, handleChange];
}
export default useInputData;