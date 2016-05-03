/**
 * Created by loicstrauch on 27.04.16.
 */

var equilibriumModel={
    volume:1,
    species: [
        
        {
            label:"Ag+",
            charge:1,
            total:0.5,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label:"NH3",
            charge:0,
            total:1.0,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label:"H+",
            charge:1,
            total:0.0000001,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        }

    ],
    components:[
        {
            label:"Ag(NH3)2",
            species: [1, 2, 0],
            constant:-6,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label:"OH-",
            species: [0, 0, -1],
            constant:14,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        }
    ],
    precipitate: [
        
       {
            label:"AgOH",
            species: [],
            constant:7,
            atEquilibrium:0,
            fixesEquilibriumQuantity: false
        }
    ]
};
const MonteCarlo=require("./MonteCarloEquilibrium2");
const ConcentrationCalculation= require("../src/ConcentrationCalculationEquilibrium2");
const Model= require("../src/ModelEquilibrium2");
const Newton = require("../src/NewtonAlgorithmeEquilibrium2");
const Solubility = require("./SolubilisationEquilibrium2");
const Matrix = require("../src/Matrix");
const essaiMonteCarlo=1000000;
var boolean = false;
var model=Model.CreateModel(equilibriumModel);
var modelSolubility= Model.CreateModelPrecipitate(equilibriumModel);
Solubility.CalculSolubility(equilibriumModel,modelSolubility);
var k=0;
for(var i=0; i<essaiMonteCarlo; i++){
    console.log(i);
 
    MonteCarlo.MonteCarloLogarithmique(equilibriumModel);
  
   console.log(equilibriumModel);
    var j = 0;
  
    do {
        console.log(j);
        ConcentrationCalculation.ConcentrationCalculation(equilibriumModel, model);
        var totalSpeciesConcentration=ConcentrationCalculation.TotalConcentrationSpecies(equilibriumModel, model);
        boolean = ConcentrationCalculation.compareRealAndCalcTotalConcentration(equilibriumModel, totalSpeciesConcentration);
        console.log(boolean);
        var vectorComponentConcentration = ConcentrationCalculation.VectorConcentrationAllComponent(equilibriumModel);
        var error=Newton.NewTonRaphsonAlgorithme(model, equilibriumModel, vectorComponentConcentration);
        if(error===43)break;
        var productSolubility=Solubility.productOfSolubility(equilibriumModel);
        Solubility.CalculPrecipitateFormation(equilibriumModel,productSolubility,modelSolubility);
        if(boolean)k++;
        j=j+1;
        
    } while (j<5 && boolean==false);
    if(boolean)break;
    
}

console.log(equilibriumModel);