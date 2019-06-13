import React from 'react'
import LoaderIcon from 'react-loader-spinner'
import './Loader.scss'

const Loader = () => (
    <div className="loader" >
        <LoaderIcon type="TailSpin" color="#007BFF" height={80} width={80}/>
    </div>
)   

export default Loader 