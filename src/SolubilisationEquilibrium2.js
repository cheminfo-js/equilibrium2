/**
 * Created by loicstrauch on 29.04.16.
 */
"use strict";

module.exports={
    
    productOfSolubility: function(equilibriumModel){
        var productOfSolubility=[];
        var precipitate = equilibriumModel.precipitate;
        var species = equilibriumModel.species;
        var numberSpecies = species.length;
        var numberPrecipitate= equilibriumModel.precipitate.length;
        for(var i=0; i<numberPrecipitate; i++)
        {
            productOfSolubility[i]=1;
            for(var j=0;j<numberSpecies;j++)
            {
                if(precipitate[i].species[j]!=0) {
                    if(precipitate[i].species[j]>0)
                    {
                    productOfSolubility[i] = productOfSolubility[i] * precipitate[i].species[j] * species[j].atEquilibrium;
                    }
                    else productOfSolubility[i] = productOfSolubility[i] * Math.abs(precipitate[i].species[j]) * (Math.pow(10,-14)/species[j].atEquilibrium);
                }
            }
            precipitate[i].productOfSolubility=productOfSolubility[i];
        }
        
    },
    CalculSolubility: function(equilibriumModel,modelSolubility){
        const Matrix= require("./Matrix");
        var precipitate= equilibriumModel.precipitate;
        var numberPrecipitate= equilibriumModel.precipitate.length;
        var coefficientMutiplicator= Matrix.sumColomnMatrix(modelSolubility);
        var coefficientPow=Matrix.powColomnMatrix(modelSolubility);
     
        for(var i=0; i<numberPrecipitate;i++)
        {
            precipitate[i].solubility= Math.pow((Math.pow(10,-precipitate[i].constant)/coefficientPow[i]),(1/coefficientMutiplicator[i]));
        }
        
    },
    CalculPrecipitateFormation: function(equilibriumModel, modelSolubility) {
        var precipitate = equilibriumModel.precipitate;
        var numberPrecipitate = equilibriumModel.precipitate.length;
        var numberSpecies= equilibriumModel.species.length;
        var species= equilibriumModel.species;
        for (var i = 0; i < numberPrecipitate; i++) {
            if (precipitate[i].productOfSolubility > precipitate[i].solubility) {
                precipitate[i].atEquilibrium=precipitate[i].solubility;
                
                for(var j=0;j<numberSpecies;j++)
                {
                    if(modelSolubility[j][i]!=0){
                    species[j].atEquilibrium=modelSolubility[j][i]*precipitate[i].solubility;
                    }
                    
                }
            }
        }
        console.log(equilibriumModel);
    }
};