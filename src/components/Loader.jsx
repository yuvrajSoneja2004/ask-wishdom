import React from 'react'
import './Loader.css'
import { motion } from 'framer-motion'
function Loader() {

    let loaderDiv = {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    // 
    return (
        <motion.div style={loaderDiv} initial={{scale: 0}} animate={{scale: 1}} transition={{duration: .2}} >
            <span className="loader"></span>
        </motion.div>
    )
}

export default Loader