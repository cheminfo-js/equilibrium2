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
do {
    var guess = monte.totalNewtonRaphtonAlgorithme(dataUser);
    
}while(guess===0);
console.log(guess);

/*

for(var i=0;i<essaiMonteCarlo;i++) {
    var randomguess = Algorithme.MonteCarlo(dataUser.totalConcentration);
    var calculComponentConcentration = Concentration.ConcentrationCalculation(dataUser, randomguess, model);
    var totalGuessCalculation = Concentration.TotalConcentrationSpecies(dataUser, model, calculComponentConcentration);
    var difference = 0;
    for (var j = 0; j < numberSpecies; j++) {
        difference = difference + (Math.abs(totalGuessCalculation[j] - dataUser.totalConcentration[j])) / dataUser.totalConcentration[j];
    }

    if (i != 0) {
        if (difference < differenceanterior) {
            differenceanterior=difference;
            vectorMonteCarloChoose = randomguess;
        }

    }
    else{
        differenceanterior = difference;
        vectorMonteCarloChoose = randomguess;
        
    }

}
 guessConcentration=vectorMonteCarloChoose;

do {
    var componentConcentration = Concentration.ConcentrationCalculation(dataUser,guessConcentration,model);
    var totalSpeciesCalculate=Concentration.TotalConcentrationSpecies(dataUser,model,componentConcentration);
    var DifferenceRealCalc= Matrix.SubstractVector(dataUser.totalConcentration,totalSpeciesCalculate);
    var differenceRelatif = 0;
    for (var j = 0; j < numberSpecies; j++) {
        differenceRelatif = differenceRelatif + (Math.abs(totalSpeciesCalculate[j] - dataUser.totalConcentration[j])) / dataUser.totalConcentration[j];
    }
    if(differenceRelatif<differenceRelatifAccepted)break;
    else
        {
            console.log("utilisation de l'algorithme");
            guessConcentration = Algorithme.algoSpiderWeb(model, dataUser, guessConcentration, componentConcentration);
            console.log(guessConcentration);
            console.log(differenceRelatif);
        }

    
}while(true);

console.log(guessConcentration);


*/