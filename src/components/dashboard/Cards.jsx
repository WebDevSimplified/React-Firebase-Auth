import React from 'react';
import blood from '../images/blood3.png'
import bp from '../images/bp.png'
import ht from '../images/height.png'
import wt from '../images/wt.png'
import '../css/style.css'
const DashCard = () => {
   
    return (
        <div class="container " >
            <div class="card-deck col-lg-7 col-md-7">
                <div class=" card text-center shadow bg-white rounded">
                    <img class="center cardstyle"  src={blood} width="60" height="60"/>
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold" >Blood</h5>
                        <h6> -- </h6>
                    </div>
                </div>
                <div class="card text-center shadow bg-white rounded">
                    <img class="center cardstyle" src={bp} width="60" height="60" />
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">Pressure</h5>
                        <h6>120/80</h6>
                    </div>
                    
                </div>
                <div class="card text-center shadow bg-white rounded">
                    <img class="center cardstyle" src={ht} width="60" height="60" />
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">Height</h5>
                        <h6>158</h6>
                    </div>
                   
                </div>
                <div class="card text-center shadow bg-white rounded">
                    <img class="center cardstyle" src={wt} width="60" height="60"/>
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">Weight</h5>
                        <h6>120 kg</h6>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default DashCard;
