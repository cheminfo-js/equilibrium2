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
            for(var j=0;j<numberSpecies;j++)
            {
                productOfSolubility[i]=precipitate[i].species[j]*species[j].atEquilibrium;
            }
        }
        return productOfSolubility;
        
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
    CalculPrecipitateFormation: function(equilibriumModel, productOfSolubility, modelSolubility) {
        var precipitate = equilibriumModel.precipitate;
        var numberPrecipitate = equilibriumModel.precipitate.length;
        var numberSpecies= equilibriumModel.species.length;
        var species= equilibriumModel.species;
        for (var i = 0; i < numberPrecipitate; i++) {
            if (productOfSolubility[i] > precipitate[i].solubility) {
                for(var j=0;j<numberSpecies;j++)
                {
                    if(modelSolubility[i][j]!=0)precipitate[i].atEquilibrium=species[j].atEquilibrium-modelSolubility[i][j]*precipitate[i].solubility;
                    species[j].atEquilibrium=modelSolubility[i][j]*precipitate[i].solubility;
                }
            }
        }
    }
};