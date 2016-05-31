/**
 * Created by loicstrauch on 12.05.16.
 */
'use strict';

var equilibriumModel = {
    volume:1,
    species: [
        {
            label:'Na+',
            charge:1,
            total:2.2,
           
        },
        {
            label:'CO3--',
            charge:-2,
            total:1,
          
        },
        {
            label:'NH3',
            charge:1,
            total:2,
        },
        {
            label:'Ag+',
            charge:1,
            total:1
        },
        {
            label:'H+',
            charge:1,
            total:-0.2,
            atEquilibrium: 0.0000001
        }
    ],
    components:[
        {
            label:'HCO3-',
            species: [0, 1, 0, 0, 1],
            Keq:-6
        },
        {
            label:'H2CO3',
            species: [0, 1, 0, 0, 2],
            Keq:-9
        },
        {
            label:'Ag(NH3)2',
            species: [0, 0, 2, 1, 0],
            Keq:-6
        },
        {
            label:'OH-',
            species: [0, 0, 0, 0, -1],
            Keq:0
        }
    ],
    precipitate: [

        {
            label:'AgOH',
            species: [0, 0, 0, 1, -1],
            Keq:7,
            atEquilibrium:0,
        }
    ],
    constant: [
    ]
};
const MonteCarlo = require('./../src/monteCarlo');
const ConcentrationCalculation = require('../src/concentrationCalculation');
const Model = require('../src/model');
const newton = require('../src/newton');
//const Solubility = require('./../src/solubilisation');
const fixesEquilibrium = require('../src/fixesEquilibirumQuantity');
const essaiMonteCarlo=100;

ConcentrationCalculation.moleToConcentrationModel(equilibriumModel);
fixesEquilibrium.changeConstantComponentsHydroxy(equilibriumModel);
fixesEquilibrium.createNewEquilibriumModel(equilibriumModel);
var model = Model.createModel(equilibriumModel);
var modelSolubility = Model.createModelPrecipitate(equilibriumModel);
//Solubility.calculSolubility(equilibriumModel, modelSolubility);

    for (var i = 0; i < essaiMonteCarlo; i++) {

        MonteCarlo.logarithmic(equilibriumModel);
        var j = 0;

        do {
            //Solubility.productOfSolubility(equilibriumModel);
            //Solubility.CalculPrecipitateFormation(equilibriumModel, modelSolubility);
            ConcentrationCalculation.concentrationCalculation(equilibriumModel, model);
            var totalSpeciesConcentration = ConcentrationCalculation.calculateTotalConcentrationSpecies(equilibriumModel, model, modelSolubility);
            var hasConverged = ConcentrationCalculation.compareRealAndCalcTotalConcentration(equilibriumModel, totalSpeciesConcentration);
            if (!hasConverged) {
                var vectorComponentConcentration = ConcentrationCalculation.vectorConcentrationAllComponent(equilibriumModel);
                newton(model, equilibriumModel, vectorComponentConcentration);
                j = j + 1;
            }
        } while (j < 15 && hasConverged == false);
        if (hasConverged) break;
    }
    console.log(equilibriumModel);
    console.log(ConcentrationCalculation.getVectorLabelAndConcentration(equilibriumModel));
    equilibriumModel.volume=equilibriumModel.volume+0.01;
    equilibriumModel.constant=equilibriumModel.constant+0.01;
