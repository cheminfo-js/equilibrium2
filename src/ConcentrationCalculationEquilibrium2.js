/**
 * Created by loicstrauch on 27.04.16.
 */
"use strict";

module.exports={

    ConcentrationCalculation: function(equilibriumModel, matrixModel) {
    const Matrix=require("./Matrix");
    const Concentration = require("./ConcentrationCalculationEquilibrium2");
    var components= equilibriumModel.components;
    var species=equilibriumModel.species;
    var numberSpecies=equilibriumModel.species.length;
    var guessConcentration=Concentration.vectorSpeciesConcentration(equilibriumModel);
    var numberComponent=equilibriumModel.components.length+equilibriumModel.species.length;
    var guessMatrix = Matrix.rowToMatrix(guessConcentration, numberComponent,numberSpecies);
    var guessPowModel = Matrix.powMatrix(guessMatrix, matrixModel, numberSpecies, numberComponent);
    var ComponentConcentration = Matrix.matrixToRow(guessPowModel, numberComponent, numberSpecies);


    for (var i = 0; i < numberComponent; i++) {
       if(i<numberSpecies) species[i].atEquilibrium = ComponentConcentration[i];
       else components[i-numberSpecies].atEquilibrium = ComponentConcentration[i] * Math.pow(10,-components[i-numberSpecies].constant);
    }
   
    },

    TotalConcentrationSpecies: function(equilibriumModel, Matrixmodel) {
    var volume = equilibriumModel;
    var species = equilibriumModel.species;
    var components= equilibriumModel.components;
    var numberSpecies=equilibriumModel.species.length;
    var numberComponent=numberSpecies+equilibriumModel.components.length;
    const Matrix=require("./Matrix");
    var componentConcentration=[];
    for(var i=0; i<numberComponent; i++)
    {
        if(i<numberSpecies)componentConcentration[i]=species[i].atEquilibrium;
        else componentConcentration[i]=components[i-numberSpecies].atEquilibrium;
    }
    var matrixComponentConcentration = Matrix.transposeMatrix(Matrix.rowToMatrix(componentConcentration, numberComponent, numberSpecies), numberSpecies, numberComponent);
    var matrixConcentrationTotal = Matrix.multiMatrix(Matrixmodel, matrixComponentConcentration, numberSpecies, numberComponent);
    return Matrix.sumRowMatrix(matrixConcentrationTotal, numberSpecies, numberComponent);
    },
    VectorConcentrationAllComponent: function(equilibriumModel)
    {
        var species = equilibriumModel.species;
        var components= equilibriumModel.components;
        var numberSpecies=equilibriumModel.species.length;
        var numberComponent=numberSpecies+equilibriumModel.components.length;
        var vectorConcentration= [];

        for(var i=0; i<numberComponent;i++)
        {
            if(i<numberSpecies)vectorConcentration[i]=species[i].atEquilibrium;
            else vectorConcentration[i]=components[i-numberSpecies].atEquilibrium;
        }
        
        return vectorConcentration;
    },
    
    vectorRealTotalConcentration: function(equilibriumModel)
    {
        var vectorTotalConcentration=[];
        var numberSpecies= equilibriumModel.species.length;
        var species= equilibriumModel.species;
        for(var i=0;i<numberSpecies;i++)
        {
            vectorTotalConcentration[i]=species[i].total;
        }
        return vectorTotalConcentration;
    },
    vectorSpeciesConcentration: function(equilibriumModel)
    {
        var vectorSpecies=[];
        var species = equilibriumModel.species;
        for(var i=0; i<species.length; i++)
        {
           vectorSpecies[i]=species[i].atEquilibrium;
        }
        return vectorSpecies;
    },
    
    setConcentrationSpecies: function(vector,equilibriumModel)
    {
        var species = equilibriumModel.species;
        for(var i=0; i<vector.length; i++)
        {
           species[i].atEquilibrium=vector[i]; 
        }
    },
    
    compareRealAndCalcTotalConcentration: function(equilibriumModel, totalConcentrationSpeciesCalculate)
    {
        const Concentration= require("./ConcentrationCalculationEquilibrium2");
        var vectorTotalSpecies= Concentration.vectorRealTotalConcentration(equilibriumModel);
        var species= equilibriumModel.species;
        var differenceAccept = true;
        for(var i=0;i<species.length;i++)
        {
            var relativeError= Math.abs(Math.abs(vectorTotalSpecies[i]-totalConcentrationSpeciesCalculate[i])/vectorTotalSpecies[i]);
            if(relativeError>0.03){
                differenceAccept = false;
            }
            if(relativeError==NaN)
            {
                differenceAccept = -2;
            }
            if(relativeError==Infinity)
            {
                differenceAccept=-1;
            }
        }
        return differenceAccept;
    },
    moleToConcentrationModel: function(equilibriumModel)
    {
        var numberSpecies=equilibriumModel.species.length;
        var species = equilibriumModel.species;
        var volume = equilibriumModel.volume;
        for(var i=0;i<numberSpecies;i++){
            species[i]=species[i]/volume;
        }
    }
   
    };

