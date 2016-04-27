"user strict";



function DataUser(totalConcentration, listComponentBeta, listSpecies)
{
    this.totalConcentration = totalConcentration;
    this.listComponentBeta = listComponentBeta;
    this.listspecies = listSpecies;
}
const Matrix = require("./Matrix");
const Algorithme= require("../src/AlgorithmeDeltaConcentration");
const monte = require("../src/TotalAlgorithme");
const Concentration = require("../src/TotalConcentrationCalculation");
const mlMatrix = require("ml").Matrix;
var listSpecies=["X", "Y", "Z"];
var listComponentBeta=[["X", 1], ["Y", 1], ["Z", 1], ["XY", 1], ["XZ2", 30], ["YZ", 1], ["XYZ", 1]];

var guessConcentration=[1,1,1];
var totalConcentration=[2,2,2];

var dataUser= new DataUser(totalConcentration,listComponentBeta,listSpecies);
var model= Concentration.CreateModel(dataUser);
var matriceJac =[[7, 3, 7],[3, 6, 3],[7, 3, 16]];
var DeltaNewtonRaphton=[-7/33, -13/33, -1/3];
var numberSpecies=dataUser.listspecies.length;
var numberComponent= dataUser.listComponentBeta.length;
var differenceRelatifAccepted=0.005*numberSpecies;

var essaiMonteCarlo=6000;
var differenceanterior=0;
var vectorMonteCarloChoose=[];
var guessConcentration=[];
// Monte Carlo part







/*
var pH=[1];
if(pH.length!=0) console.log("hello");


/*
do {
    var guess = monte.totalNewtonRaphtonAlgorithme(dataUser);

}while(guess===0);
console.log(guess);

/**
 * Created by loicstrauch on 24.04.16.
 */
