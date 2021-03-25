import React from 'react';
import blood from '../images/blood3.png'
import bp from '../images/bp.png'
import ht from '../images/height.png'
import wt from '../images/wt.png'
import '../css/style.css'
const DashCard = () => {
   
    return (
        <div className="container " >
            <div className="card-deck col-lg-7 col-md-7">
                <div className=" card text-center shadow bg-white rounded2">
                    <img className="center cardstyle"  src={blood} width="60" height="60"/>
                    <div className="card-body">
                        <h5 className="card-title font-weight-bold" >Blood</h5>
                        <h6> -- </h6>
                    </div>
                </div>
                <div className="card text-center shadow bg-white rounded2">
                    <img className="center cardstyle" src={bp} width="60" height="60" />
                    <div className="card-body">
                        <h5 className="card-title font-weight-bold">Pressure</h5>
                        <h6>120/80</h6>
                    </div>
                    
                </div>
                <div className="card text-center shadow bg-white rounded2">
                    <img className="center cardstyle" src={ht} width="60" height="60" />
                    <div className="card-body">
                        <h5 className="card-title font-weight-bold">Height</h5>
                        <h6>158</h6>
                    </div>
                   
                </div>
                <div className="card text-center shadow bg-white rounded2">
                    <img className="center cardstyle" src={wt} width="60" height="60"/>
                    <div className="card-body">
                        <h5 className="card-title font-weight-bold">Weight</h5>
                        <h6>120 kg</h6>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default DashCard;
