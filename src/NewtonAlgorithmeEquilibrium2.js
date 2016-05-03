/**
 * Created by loicstrauch on 27.04.16.
 */
"use strict";
/**
 * Created by loicstrauch on 15.04.16.
 */

module.exports= {
    JacobianStar: function(matrixModel, equilibriumModel, VectorTotalConcentration)
    {
        var mlMatrix=require("ml").Matrix;
        var Matrix = require("./Matrix");
        var numberSpecies = equilibriumModel.species.length;
        var numberComponent=numberSpecies+equilibriumModel.components.length;
        var jacobianStar = new mlMatrix(numberSpecies, numberSpecies);
        for (var i = 0; i < numberSpecies; i++) {
            for (var j = 0; j < numberSpecies; j++) {
                var rowiModel = Matrix.extractRow(matrixModel, i, numberComponent);
                var rowjModel = Matrix.extractRow(matrixModel, j, numberComponent);
                var multiModel = Matrix.multiVector(rowiModel, rowjModel);
                
                var multiConcentration = Matrix.multiVector(multiModel, VectorTotalConcentration);
                jacobianStar.set(i, j, Matrix.sumVector(multiConcentration));
            }
        }
        return jacobianStar;
    },

    /**
     * @return {number}
     */
    NewTonRaphsonAlgorithme: function(matrixModel, equilibriumModel,totalCalcConcentration) {
        
        var mlMatrix = require("ml").Matrix;
        var Matrix= require("./Matrix");
        var Concentration=require("./ConcentrationCalculationEquilibrium2");
        var Newton = require("./NewtonAlgorithmeEquilibrium2");
        var guessVector= Concentration.vectorSpeciesConcentration(equilibriumModel);
        var totalRealConcentrationSpecies=Concentration.vectorRealTotalConcentration(equilibriumModel);
        var numberSpecies= equilibriumModel.species.length;
        var jacobianStar = new mlMatrix(numberSpecies,numberSpecies);
        jacobianStar = Newton.JacobianStar(matrixModel, equilibriumModel, totalCalcConcentration);
        
        var inverseJacobianStar = Matrix.inverseMatrix(jacobianStar,numberSpecies);
        var matriceDiag = Matrix.diagonalMatrix(guessVector);
        var jacobianStarDiag = Matrix.multiplicationMatrix(matriceDiag, inverseJacobianStar,numberSpecies, numberSpecies,numberSpecies);
        var totalSpeciesCalculate=Concentration.TotalConcentrationSpecies(equilibriumModel,matrixModel,totalCalcConcentration);
        var diffCalculateReal = Matrix.SubstractVector(totalRealConcentrationSpecies, totalSpeciesCalculate);
        var deltaConcentration = Matrix.multiVectorToMatrix(diffCalculateReal, jacobianStarDiag, numberSpecies);

        var newConcentration = Matrix.sumVectors(guessVector, deltaConcentration);
        var v=0;
       
        while(Matrix.testComponentNeg(newConcentration))
        {
            newConcentration=Matrix.SubstractVector(newConcentration,deltaConcentration);
            for(var i=0; i<numberSpecies; i++)
            {
                deltaConcentration[i]=0.5*deltaConcentration[i];
            }
            newConcentration = Matrix.sumVectors(guessVector, deltaConcentration);
        }
        
        Concentration.setConcentrationSpecies(newConcentration,equilibriumModel);
    }
};



