import React from 'react';
import blood from '../images/blood3.png'
import bp from '../images/bp.png'
import ht from '../images/height.png'
import wt from '../images/wt.png'
const DashCard = () => {
    const css = {
            "padding":"4px",
            "display": "block",
            "margin-left": "auto",
            "margin-right": "auto",
            "width": "50%",
            
      }
    return (
        <div class="container " >
            <div class="card-deck col-lg-7 col-md-7">
                <div class=" card text-center shadow bg-white rounded">
                    <img class="center"  src={blood} style={css} width="60" height="60"/>
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold" >Blood</h5>
                        <h6> -- </h6>
                    </div>
                </div>
                <div class="card text-center shadow bg-white rounded">
                    <img class="center" src={bp} style={css} width="60" height="60" />
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">Pressure</h5>
                        <h6>120/80</h6>
                    </div>
                    
                </div>
                <div class="card text-center shadow bg-white rounded">
                    <img class="center" src={ht} style={css} width="60" height="60" />
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">Height</h5>
                        <h6>158</h6>
                    </div>
                   
                </div>
                <div class="card text-center shadow bg-white rounded">
                    <img class="center" src={wt} style={css} width="60" height="60"/>
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
