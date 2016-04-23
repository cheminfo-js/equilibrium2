/**
 * Created by loicstrauch on 22.04.16.
 */
"use strict";

function DataUser(totalConcentration, listComponentBeta, listSpecies)
{
    this.totalConcentration = totalConcentration;
    this.listComponentBeta = listComponentBeta;
    this.listspecies = listSpecies;
}

const Algorithme= require("../src/AlgorithmeDeltaConcentration");
const Concentration = require("../src/TotalConcentrationCalculation");
const mlMatrix = require("ml").Matrix;
var listSpecies=["X", "Y", "Z"];
var listComponentBeta=[["X", 1], ["Y", 1], ["Z", 1], ["XY", 2], ["XZ2", 3], ["YZ", 2], ["XYZ", 1]];
var guessConcentration=[1,1,1];
var TotalConcentration=[2,2,2];
var dataUser= new DataUser(TotalConcentration,listComponentBeta,listSpecies);
var model= Concentration.CreateModel(dataUser);
var componentConcentration = Concentration.ConcentrationCalculation(dataUser,guessConcentration,model);
var matriceJac =[[7, 3, 7],[3, 6, 3],[7, 3, 16]];
var NewtonRaphtonNewGuess=[78787, 60606, 66666];




describe('AlgorithmeDeltaConcentration', function () {
    it('Jacobian Star Calculation', function () {
        componentConcentration = Concentration.ConcentrationCalculation(dataUser,guessConcentration,model);
        var jacobienStar = Algorithme.JacobianStar(model, dataUser, componentConcentration);
        var arrayJacobienStar=jacobienStar.to2DArray();
        arrayJacobienStar.should.deepEqual(matriceJac);
    });
    it('Newton Raphton Algorithme', function() {
        var newVector = Algorithme.NewTonRaphsonAlgorithme(model,dataUser,guessConcentration,componentConcentration);
        var vectorarrondi=[];
        for(var i=0;i<newVector.length;i++)
        {
            vectorarrondi[i]= newVector[i]*100000;
            vectorarrondi[i]= Math.floor(vectorarrondi[i]);
        }
        vectorarrondi.should.deepEqual(NewtonRaphtonNewGuess);
       
    });
    
 
  
});