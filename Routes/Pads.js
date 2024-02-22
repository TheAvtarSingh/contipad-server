const express = require('express');

const PadRoutes = express.Router();

PadRoutes.get('/:userId/:padNumber',(req,res)=>{
    const {userId,padNumber} = req.params;
    res.json({
        "userId":userId,
        "padNumber":padNumber,
    });
});

module.exports = PadRoutes;