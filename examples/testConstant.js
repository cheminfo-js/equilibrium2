/**
 * Created by loicstrauch on 12.05.16.
 */
'use strict';
var nombre = 0;
for(var p=0;p<1000;p++) {

    var equilibriumModel = {
        volume: 1,
        species: [
            {
                label: 'CO3--',
                charge: -2,
                total: 1

            },
            {
                label: 'H+',
                charge: 1,
                atEquilibrium: 0.01
            }
        ],
        components: [
            {
                label: 'HCO3-',
                species: [1, 1],
                Keq: -6
            },
            {
                label: 'H2CO3',
                species: [1, 2],
                Keq: -9
            },
            {
                label: 'OH-',
                species: [0, -1],
                Keq: 0
            }
        ],
        precipitate: [],
        constant: []
    };
    var ph= nombre *14/1000;
    nombre++;
    
    equilibriumModel.species[1].atEquilibrium= Math.pow(10,-ph);
    const MonteCarlo = require('./../src/monteCarlo');
    const ConcentrationCalculation = require('../src/concentrationCalculation');
    const Model = require('../src/model');
    const newton = require('../src/newton');
    const fixesEquilibrium = require('../src/fixesEquilibirumQuantity');
    const essaiMonteCarlo = 100;

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
    console.log(ConcentrationCalculation.getVectorLabelAndConcentration(equilibriumModel)[4][1]);
 

}