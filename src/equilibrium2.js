/**
 * Created by loicstrauch on 27.04.16.
 */

var equilibriumModel={
    volume:1,
    species: [
        {
            label:"Na+",
            charge:1,
            total:2.2,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label:"CO3--",
            charge:-2,
            total:1,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label:"NH3",
            charge:1,
            total:2,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label:"Ag+",
            charge:1,
            total:1,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label:"H+",
            charge:1,
            total:-0.2,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        }
    ],
    components:[
        {
            label:"HCO3-",
            species: [0, 1, 0, 0, 1],
            constant:-6,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label:"H2CO3",
            species: [0, 1, 0, 0, 2],
            constant:-9,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label:"Ag(NH3)2",
            species: [0, 0, 2, 1, 0],
            constant:-6,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label:"OH-",
            species: [0, 0, 0, 0, -1],
            constant:14,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        }
    ],
    precipitate: [
        
       {
            label:"AgOH",
            species: [0, 0, 0, 1, -1],
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
 
    MonteCarlo.MonteCarloLogarithmique(equilibriumModel);
    var j = 0;
    

    do {
     
        ConcentrationCalculation.ConcentrationCalculation(equilibriumModel, model);
        var totalSpeciesConcentration=ConcentrationCalculation.calculateTotalConcentrationSpecies(equilibriumModel, model, modelSolubility);
        boolean = ConcentrationCalculation.compareRealAndCalcTotalConcentration(equilibriumModel, totalSpeciesConcentration);
        if(boolean==false) {
            var vectorComponentConcentration = ConcentrationCalculation.VectorConcentrationAllComponent(equilibriumModel);
            var error = Newton.applyAlgorithm(model, equilibriumModel, vectorComponentConcentration);
            if (error === 43)break;
            var productSolubility = Solubility.productOfSolubility(equilibriumModel);
            //Solubility.CalculPrecipitateFormation(equilibriumModel, modelSolubility);
            //console.log(equilibriumModel);
            if (boolean)k++;
            j = j + 1;
        }
    } while (j<15 && boolean==false);
    if(boolean)break;
    
}

console.log(equilibriumModel);