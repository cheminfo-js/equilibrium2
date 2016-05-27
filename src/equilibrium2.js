/**
 * Created by loicstrauch on 27.04.16.
 */

'use strict';

const MonteCarlo = require('./monteCarlo');
const ConcentrationCalculation = require('./concentrationCalculation');
const Model = require('./model');
const newton = require('./newton');
const Solubility = require('./solubilisation');
const deepcopy = require('deepcopy');
const essaiMonteCarlo = 1000000;

module.exports = function (equilibriumModel) {
    equilibriumModel = deepcopy(equilibriumModel);
    var model = Model.createModel(equilibriumModel);
    var modelSolubility = Model.createModelPrecipitate(equilibriumModel);
    Solubility.calculSolubility(equilibriumModel, modelSolubility);
    for (var i = 0; i < essaiMonteCarlo; i++) {

        MonteCarlo.logarithmic(equilibriumModel);
        var j = 0;

        do {

            ConcentrationCalculation.concentrationCalculation(equilibriumModel, model);
            var totalSpeciesConcentration = ConcentrationCalculation.calculateTotalConcentrationSpecies(equilibriumModel, model, modelSolubility);
            var hasConverged = ConcentrationCalculation.compareRealAndCalcTotalConcentration(equilibriumModel, totalSpeciesConcentration);
            if (!hasConverged) {
                var vectorComponentConcentration = ConcentrationCalculation.vectorConcentrationAllComponent(equilibriumModel);
                newton(model, equilibriumModel, vectorComponentConcentration);
                var productSolubility = Solubility.productOfSolubility(equilibriumModel);
                //Solubility.CalculPrecipitateFormation(equilibriumModel, modelSolubility);
                j = j + 1;
            }
        } while (j < 15 && hasConverged == false);
        if (hasConverged) break;
    }

    return equilibriumModel;
};
