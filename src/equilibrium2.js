/**
 * Created by loicstrauch on 27.04.16.
 */

'use strict';

const MonteCarlo = require('./monteCarlo');
const ConcentrationCalculation = require('./concentrationCalculation');
const Model = require('./model');
const Newton = require('./newtonAlgorithme');
const Solubility = require('./solubilisation');
const deepcopy = require('deepcopy');
const essaiMonteCarlo = 1000000;

module.exports = function (equilibriumModel) {
    equilibriumModel = deepcopy(equilibriumModel);
    var boolean = false;
    var model = Model.CreateModel(equilibriumModel);
    var modelSolubility = Model.CreateModelPrecipitate(equilibriumModel);
    Solubility.CalculSolubility(equilibriumModel, modelSolubility);
    var k = 0;
    for (var i = 0; i < essaiMonteCarlo; i++) {

        MonteCarlo.MonteCarloLogarithmique(equilibriumModel);
        var j = 0;

        do {

            ConcentrationCalculation.ConcentrationCalculation(equilibriumModel, model);
            var totalSpeciesConcentration = ConcentrationCalculation.calculateTotalConcentrationSpecies(equilibriumModel, model, modelSolubility);
            boolean = ConcentrationCalculation.compareRealAndCalcTotalConcentration(equilibriumModel, totalSpeciesConcentration);
            if (boolean == false) {
                var vectorComponentConcentration = ConcentrationCalculation.VectorConcentrationAllComponent(equilibriumModel);
                Newton.applyAlgorithm(model, equilibriumModel, vectorComponentConcentration);
                var productSolubility = Solubility.productOfSolubility(equilibriumModel);
                //Solubility.CalculPrecipitateFormation(equilibriumModel, modelSolubility);
                if (boolean)k++;
                j = j + 1;
            }
        } while (j < 15 && boolean == false);
        if (boolean) break;
    }

    console.log(equilibriumModel);
};
