import {useState} from 'react'
import './Fine.css'

function Fine ({fund, setFund}) {

    const handleClick = () => {
        setFund(prev => prev - 5000);
    }

    return (
        <>
            <button onClick={handleClick}>Oops... Didn't Study! –5,000</button>
        </>
    );
}

export default Fine