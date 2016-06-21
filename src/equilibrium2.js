/**
 * Created by loicstrauch on 27.04.16.
 */

'use strict';

const MonteCarlo = require('./monteCarlo');
const ConcentrationCalculation = require('./concentrationCalculation');
const fixesEquilibrium = require('./fixesEquilibirumQuantity');
const Model = require('./model');
const newton = require('./newton');
const deepcopy = require('deepcopy');
const essaiMonteCarlo = 10000;

module.exports = function (equilibriumModel) {
    equilibriumModel = deepcopy(equilibriumModel);
    ConcentrationCalculation.moleToConcentrationModel(equilibriumModel);
    fixesEquilibrium.changeConstantComponentsHydroxy(equilibriumModel);
    fixesEquilibrium.createNewEquilibriumModel(equilibriumModel);
    var model = Model.createModel(equilibriumModel);
    var modelSolubility = Model.createModelPrecipitate(equilibriumModel);

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
                j++;
            }
        } while (j < 15 && hasConverged == false);
        if (hasConverged) break;
    }
    return ConcentrationCalculation.getVectorLabelAndConcentration(equilibriumModel);
};