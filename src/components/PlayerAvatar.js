import React from 'react';
import { Avatar } from '@mui/material';
import human from "../img/human.png"
import robot from "../img/robot.png"
import "./PlayerAvatar.css"
const PlayerAvatar = ({ type }) => {
    return (
        <div>
            <div className='player-avatar'>
                <div>
                    <Avatar src={type === "human" ? human : robot} /> 
                </div>
                <div>
                    {type === "human" ? "Human" : "Robot"}
                </div>
            </div>
            
        </div>
        
    );
};

export default PlayerAvatar;
