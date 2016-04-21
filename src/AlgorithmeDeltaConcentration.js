"use strict";
/**
 * Created by loicstrauch on 15.04.16.
 */
module.exports= {
    JacobianStar: function(model, Data, VectorConcentration)
{
   
    var Matrix = require("ml").Matrix;
    var JacobianS = new Matrix(Data.listspecies.length, Data.listspecies.length);
    for (var i = 0; i < Data.listspecies.length; i++) {
        for (var j = 0; j < Data.listspecies.length; j++) {
            var rowiModel = require("./Matrix.js").extractRow(model, i, Data.listComponentBeta.length);
            var rowjModel = require("./Matrix.js").extractRow(model, j, Data.listComponentBeta.length);
            var multiModel = require("./Matrix.js").multiVector(rowiModel, rowjModel);
            var multiConcentration = require("./Matrix.js").multiVector(multiModel, VectorConcentration);

            JacobianS.set(i, j, require("./Matrix.js").sumVector(multiConcentration));
        }
    }

    return JacobianS;
},

NewTonRaphsonAlgorithme: function(model, Data, vectorConcentration,totalCalcConcentration) {
    
    var vectorSpeciesConcentration = [];
    for (var i = 0; i < Data.listspecies.length; i++) {
        vectorSpeciesConcentration[i] = vectorConcentration[i];
    }

    var Matrix = require("ml").Matrix;
    var jacobianStar = new Matrix(Data.listspecies,Data.listspecies);
    jacobianStar = require("./AlgorithmeDeltaConcentration").JacobianStar(model, Data, vectorConcentration);
    var inverseJacobianStar = jacobianStar.inverse();
    var matriceDiag = require("./Matrix.js").diagMatrix(vectorSpeciesConcentration);
    var arrayInverseJacobianStar=inverseJacobianStar.to2DArray();
    var arraymatriceDiag = matriceDiag.to2DArray();
    var jacobianStarDiag = require("./Matrix.js").multiplicationMatrix(arraymatriceDiag, arrayInverseJacobianStar, Data.listspecies.length, Data.listspecies.length, Data.listspecies.length);
    var DiffCalculateReal = require("./Matrix.js").SubstractVector(Data.Totalconcentration, totalCalcConcentration);
    var deltaConcentration = require("./Matrix.js").multiVectorToMatrix(DiffCalculateReal, jacobianStarDiag, Data.listspecies.length);
    var NewConcentration = require("./Matrix.js").sumVectors(vectorSpeciesConcentration, deltaConcentration);
    if(require("./Matrix.js").testComponentNeg(NewConcentration))
    {
    for(var i=0;i<Data.listspecies.length;i++)
     {

        NewConcentration[i]=Math.abs(NewConcentration[i]);
     }
    }
  
    return NewConcentration;
},
    MonteCarlo: function(vector)
    {
        var newVector=[];
        for(var i=0;i<vector.length;i++)
        {
            newVector[i]=Math.random()*vector[i];
        }
       return newVector;
        
    },
    algoSpiderWeb: function(model,Data, vectorConcentration,totalCalcConcentration)
    {

        var distance = require("./Matrix.js").distanceVectors(Data.Totalconcentration,totalCalcConcentration);
        console.log("distance = "+distance);
        var DeltaVector= [];
        var NewConcentrationVector=[];
        var signe=1;
        for(var i=0;i<totalCalcConcentration.length;i++)
        {
            DeltaVector[i]=Data.Totalconcentration[i]-totalCalcConcentration[i];
        }
        for(var i=0;i<totalCalcConcentration.length;i++)
        {
            if(Math.random()<0.5)signe=-signe;

            if(i==0)NewConcentrationVector[0]=signe*Math.random()*DeltaVector[0];
            else if(i!=0)
            {
                var summSquare=0;
                var restDistance=0;
                for(var j=0;j<i;j++)
                {
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
{

};




