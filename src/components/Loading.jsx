import React from "react";

const Loading = ({loading, error, children}) => {
    
    const buttonHandler = () => {
        if (children?.type?.render?.displayName === 'Button') {
            const buttonClone = React.cloneElement(children, {disabled: true}, 'Loading...');
            return(
                <>
                {loading ? (
                    buttonClone
                )
                : error ? 
                    (
                    <>
                    {children}
                    
                    <p><br/>Somethig wrong happened: {error}</p>
                    </>
                    )
                : children}
            </>
            );
        };
        return (
            <>
                {loading ? 
                    <p>Loading, please wait...</p>
                : error ? 
                    <p>Somethig wrong happened: {error}</p>
                : children}
            </>
        )
        
    }
    return buttonHandler();
};

export default Loading;