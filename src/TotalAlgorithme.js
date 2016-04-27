/**
 * Created by loicstrauch on 22.04.16.
 */
"user strict";

module.exports= {
    totalNewtonRaphtonAlgorithme: function (dataUser){
        

const Algorithme = require("../src/AlgorithmeDeltaConcentration");
const Concentration = require("../src/TotalConcentrationCalculation");
const MonteCarlo= require("../src/TotalAlgorithme");        
var model = Concentration.CreateModel(dataUser);
var numberSpecies = dataUser.listspecies.length;
var differenceRelatifAccepted = 0.01 * numberSpecies;
var totalConcentration= dataUser.totalConcentration;
var iteration =10;

do {
var guessConcentration = MonteCarlo.SuperMonteCarloMethod(dataUser);
}while(!guessConcentration[0]);
        
for(var i=0; i<iteration; i++){
    var componentConcentration = Concentration.ConcentrationCalculation(dataUser, guessConcentration, model);
    var totalSpeciesCalculate = Concentration.TotalConcentrationSpecies(dataUser, model, componentConcentration);
    var differenceRelatif = 0;
    for (var j = 0; j < numberSpecies; j++) {
        differenceRelatif = differenceRelatif + (Math.abs(totalSpeciesCalculate[j] - totalConcentration[j])) / totalConcentration[j];
    }
    if (differenceRelatif < differenceRelatifAccepted) {
        return componentConcentration;
    }
    else {
        guessConcentration = Algorithme.NewTonRaphsonAlgorithme(model, dataUser, guessConcentration, componentConcentration);
       console.log("Vecteur venant de Newton "+guessConcentration);  
        console.log("total Species"+ totalSpeciesCalculate);
    }
}
return 0;
},
    SuperMonteCarloMethod :function(dataUser){
    const Algorithme = require("../src/AlgorithmeDeltaConcentration");
    const Concentration = require("../src/TotalConcentrationCalculation");
    var model = Concentration.CreateModel(dataUser);
    var numberSpecies = dataUser.listspecies.length;
    var differenceRelatifAccepted = 0.8 * numberSpecies;
    var essaiMonteCarlo = 100000000;
    var differenceanterior = 0;
    var vectorMonteCarloChoose = [];
        
// boucle number of space reduction
 
      //creation of list of vector ans relative difference that will be save to know the new range of the next reduction
      for (var i = 0; i < essaiMonteCarlo; i++) {
          //creation of random vector, calculation of total calculation from them and the relative difference compare to the real one
        var randomguess = Algorithme.MonteCarloBroad(dataUser.totalConcentration);

        var calculComponentConcentration = Concentration.ConcentrationCalculation(dataUser, randomguess, model);
        var totalGuessCalculation = Concentration.TotalConcentrationSpecies(dataUser, model, calculComponentConcentration);
        var difference = 0;
        for (var j = 0; j < numberSpecies; j++) {
            difference = difference + (Math.abs(totalGuessCalculation[j] - dataUser.totalConcentration[j])) / dataUser.totalConcentration[j];
        }
          
          //if the relative difference is very small one can use this vector
        if(difference<differenceRelatifAccepted) {
            console.log(difference);
            vectorMonteCarloChoose=randomguess;
            return vectorMonteCarloChoose;
        }
         // the list of reduction vector has to be filled with the first random vector
         // if it's the first random vector one can choose this one like a guess
            if(i==0) {
                vectorMonteCarloChoose = randomguess;
                differenceanterior=difference;
               }
       if(difference<differenceanterior) {
              differenceanterior = difference;
              vectorMonteCarloChoose = randomguess;
          }
      }
        return 0;
    }
};
