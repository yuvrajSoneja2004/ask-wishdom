import React from 'react'
import './Loader.css'
function Loader() {

    let loaderDiv = {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    return (
        <div style={loaderDiv}>
            <span className="loader"></span>
        </div>
    )
}

export default Loader