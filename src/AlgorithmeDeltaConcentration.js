"use strict";
/**
 * Created by loicstrauch on 15.04.16.
 */

module.exports= {
    JacobianStar: function(model, Data, VectorConcentration)
{
    var mlMatrix=require("ml").Matrix;
    var Matrix = require("./Matrix");
    var numberSpecies = Data.listspecies.length;
    var numberComponent=Data.listComponentBeta.length;
    var jacobianStar = new mlMatrix(numberSpecies, numberSpecies);
    for (var i = 0; i < numberSpecies; i++) {
        for (var j = 0; j < numberSpecies; j++) {
            var rowiModel = Matrix.extractRow(model, i, numberComponent);
            var rowjModel = Matrix.extractRow(model, j, numberComponent);
            var multiModel = Matrix.multiVector(rowiModel, rowjModel);
            var multiConcentration = Matrix.multiVector(multiModel, VectorConcentration);

            jacobianStar.set(i, j, Matrix.sumVector(multiConcentration));
        }
    }
    return jacobianStar;
},

NewTonRaphsonAlgorithme: function(model, Data, guessVector,totalCalcConcentration) {
    console.log("Newton algorithme");
    console.log("guess vector :"+guessVector);
    var mlMatrix = require("ml").Matrix;
    var Matrix= require("./Matrix");
    var Concentration=require("./TotalConcentrationCalculation");
    var jacobian = require("./AlgorithmeDeltaConcentration");
    var numberSpecies= Data.listspecies.length;
    var jacobianStar = new mlMatrix(numberSpecies,numberSpecies);
    jacobianStar = jacobian.JacobianStar(model, Data, totalCalcConcentration);
    var inverseJacobianStar = Matrix.inverseMatrix(jacobianStar,numberSpecies);
    var matriceDiag = Matrix.diagonalMatrix(guessVector);
    

    var jacobianStarDiag = Matrix.multiplicationMatrix(matriceDiag, inverseJacobianStar,numberSpecies, numberSpecies,numberSpecies);
    var totalSpeciesCalculate=Concentration.TotalConcentrationSpecies(Data,model,totalCalcConcentration);
    var diffCalculateReal = Matrix.SubstractVector(Data.totalConcentration, totalSpeciesCalculate);
    var deltaConcentration = Matrix.multiVectorToMatrix(diffCalculateReal, jacobianStarDiag, numberSpecies);
    var newConcentration = Matrix.sumVectors(guessVector, deltaConcentration);
    while(Matrix.testComponentNeg(newConcentration))
    {
        console.log("problème nég conc= :"+newConcentration);
        newConcentration=Matrix.SubstractVector(newConcentration,deltaConcentration);
        for(var i=0; i<numberSpecies; i++)
        {
            deltaConcentration[i]=0.1*deltaConcentration[i];
        }
        newConcentration = Matrix.sumVectors(guessVector, deltaConcentration);
    }
    
    
    return newConcentration;
},
    MonteCarlo: function(vector)
    {
        var newVector=[];
        for(var i=0;i<vector.length;i++) {
            newVector[i]=Math.random()*vector[i];
        }
       return newVector;
        
    },
    MonteCarloBroad: function(vector)
    {
        var newVector=[];
        for(var i=0;i<vector.length;i++)
        {
            newVector[i]=Math.pow(vector[i]*Math.random(),10);
        }
        return newVector;
    },
    algoSpiderWeb: function(model,Data, vectorConcentration,totalCalcConcentration)
    {
        var Matrix = require("./Matrix");
        var distance = Matrix.distanceVectors(Data.totalConcentration,totalCalcConcentration);
        var DeltaVector= [];
        var NewConcentrationVector=[];
        var signe=1;
        for(var i=0;i<totalCalcConcentration.length;i++) {
            DeltaVector[i]=Data.totalConcentration[i]-totalCalcConcentration[i];
        }
        for(var i=0;i<vectorConcentration.length;i++) {
            if(Math.random()<0.5)signe=-signe;

            if(i==0)NewConcentrationVector[0]=signe*Math.random()*DeltaVector[0];
            else if(i!=0)
            {
                var summSquare=0;
                var restDistance=0;
                for(var j=0;j<i;j++) {
                    summSquare = summSquare+(NewConcentrationVector[j]*NewConcentrationVector[j]);
                }
                restDistance=Math.sqrt(distance*distance-summSquare);
                var randomComponent=Math.random()*DeltaVector[i];
                while(randomComponent>restDistance)
                {
                    
                    randomComponent=Math.random()*DeltaVector[i];
                }
               NewConcentrationVector[i]=signe*randomComponent;
            }
        }
       return NewConcentrationVector;
    }
};







