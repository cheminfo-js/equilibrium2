/**
 * Created by loicstrauch on 24.04.16.
 */

"use strict";

module.exports=
{
    
    pHConstant: function(Data)
    {
        
        var Matrix = require("../src/Matrix");
        var pH= Data.pH;
        var species=Data.listSpecies;
        var numberSpecies= species.length;
        var numberComponent=Data.listComponentBeta.length;
        var component= Data.listComponentBeta;
        var salt= Data.listSalt;
        var newData=Data;
        if(pH>=0 && pH<=14)
        {
            var concentrationH= ["H",Math.pow(10,-pH)];
            var concentrationOH=["O",Math.pow(10,-(14-pH))];
            Data.listConstant.push(concentrationH);
            Data.listConstant.push(concentrationOH);
            
            var unPushSymbole=["H","O"];
            
            var newSpecies=Matrix.unpush(unPushSymbole,species);

            
            for(var i=numberSpecies; i<numberComponent; i++)
            {
                for(var k=0; k<component[i].length; k++) {
                    if (component[i][0].charAt(k) === 'H')component[i][1] = component[i][1] / concentrationH[1];
                    if (component[i][0].charAt(k) === 'O')component[i][1] = component[i][1] / concentrationOH[1];
                }
            }
            for(var i=0; i<salt.length; i++)
            {
                for(var k=0; k<salt[i].length; k++) {
                    if (salt[i][0].charAt(k) === 'H')salt[i][1] = salt[i][1] / concentrationH[1];
                    if (salt[i][0].charAt(k) === 'O')salt[i][1] = salt[i][1] / concentrationOH[1];
                }
            }
            newData.listComponentBeta=component;
            newData.listSalt=salt;
            newData.listSpecies=newSpecies;
          
        }
        
    }
    
};