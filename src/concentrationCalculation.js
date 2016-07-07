/**
 * Created by loicstrauch on 27.04.16.
 */

'use strict';

const Matrix = require('./util/matrix');

module.exports = {
    concentrationCalculation: function (equilibriumModel, matrixModel) {
        var components = equilibriumModel.components;
        var species = equilibriumModel.species;
        var numberSpecies = equilibriumModel.species.length;
        var guessConcentration = module.exports.vectorSpeciesConcentration(equilibriumModel);
        var numberComponent = equilibriumModel.components.length + equilibriumModel.species.length;
        var guessMatrix = Matrix.rowToMatrix(guessConcentration, numberComponent, numberSpecies);
        var guessPowModel = Matrix.powMatrix(guessMatrix, matrixModel, numberSpecies, numberComponent);
        var ComponentConcentration = Matrix.matrixToRow(guessPowModel, numberComponent, numberSpecies);


        for (var i = 0; i < numberComponent; i++) {
            if (i < numberSpecies) species[i].current = ComponentConcentration[i];
            else components[i - numberSpecies].current = ComponentConcentration[i] * Math.pow(10, -components[i - numberSpecies].Keq);
        }

    },

    calculateTotalConcentrationSpecies: function (equilibriumModel, Matrixmodel) {
        var species = equilibriumModel.species;
        var components = equilibriumModel.components;
        var numberSpecies = equilibriumModel.species.length;
        var precipitate = equilibriumModel.precipitate;
        var numberComponent = numberSpecies + equilibriumModel.components.length;
        var numberPrecipitate = equilibriumModel.precipitate.length;
        var componentConcentration = [];
        for (var i = 0; i < numberComponent + numberPrecipitate; i++) {
            if (i < numberSpecies)componentConcentration[i] = species[i].current;
            else if (i < numberComponent)componentConcentration[i] = components[i - numberSpecies].current;
            else componentConcentration[i] = precipitate[i - numberComponent].current;
        }
        var matrixComponentConcentration = Matrix.transposeMatrix(Matrix.rowToMatrix(componentConcentration, numberComponent, numberSpecies), numberSpecies, numberComponent);
        var matrixConcentrationTotal = Matrix.multiMatrix(Matrixmodel, matrixComponentConcentration, numberSpecies, numberComponent);
        return Matrix.sumRowMatrix(matrixConcentrationTotal, numberSpecies, numberComponent);
    },
    vectorConcentrationAllComponent: function (equilibriumModel) {
        var species = equilibriumModel.species;
        var components = equilibriumModel.components;
        var numberSpecies = equilibriumModel.species.length;
        var numberComponent = numberSpecies + equilibriumModel.components.length;
        var vectorConcentration = [];

        for (var i = 0; i < numberComponent; i++) {
            if (i < numberSpecies)vectorConcentration[i] = species[i].current;
            else vectorConcentration[i] = components[i - numberSpecies].current;
        }

        return vectorConcentration;
    },

    vectorRealTotalConcentration: function (equilibriumModel) {
        var vectorTotalConcentration = [];
        var numberSpecies = equilibriumModel.species.length;
        var species = equilibriumModel.species;
        for (var i = 0; i < numberSpecies; i++) {
            vectorTotalConcentration[i] = species[i].total;
        }
        return vectorTotalConcentration;
    },
    vectorSpeciesConcentration: function (equilibriumModel) {
        var vectorSpecies = [];
        var species = equilibriumModel.species;
        for (var i = 0; i < species.length; i++) {
            vectorSpecies[i] = species[i].current;
        }
        return vectorSpecies;
    },

    setConcentrationSpecies: function (vector, equilibriumModel) {
        var species = equilibriumModel.species;
        for (var i = 0; i < vector.length; i++) {
            species[i].current = vector[i];
        }
    },

    compareRealAndCalcTotalConcentration: function (equilibriumModel, totalConcentrationSpeciesCalculate) {
        var vectorTotalSpecies = module.exports.vectorRealTotalConcentration(equilibriumModel);
        var species = equilibriumModel.species;
        var differenceAccept = true;
        for (var i = 0; i < species.length; i++) {
            var relativeError = Math.abs(Math.abs(vectorTotalSpecies[i] - totalConcentrationSpeciesCalculate[i]) / vectorTotalSpecies[i]);
            if (relativeError > 0.01) {
                differenceAccept = false;
            }
            if (isNaN(relativeError)) {
                throw new Error('Relative error is NaN');
            }
            if (relativeError == Infinity) {
                throw new Error('Relative error is Infinity');
            }
        }
        console.log(relativeError);
        return differenceAccept;
    },
    moleToConcentrationModel: function (equilibriumModel) {
        var numberSpecies = equilibriumModel.species.length;
        var species = equilibriumModel.species;
        var volume = equilibriumModel.volume;
        for (var i = 0; i < numberSpecies; i++) {
            species[i].total = species[i].total / volume;
        }
    },
    getEquilibriumConcentrations: function (equilibriumModel) {
        var species = equilibriumModel.species;
        var numberSpecies = species.length;
        var components = equilibriumModel.components;
        var numberComponents = components.length;
        var precipitate = equilibriumModel.precipitate;
        var numberPrecipitate = precipitate.length;
        var constant = equilibriumModel.constant;
        var numberConstant = constant.length;

        var result = {};

        for (var i = 0; i < numberSpecies; i++) {
            result[species[i].label] = species[i].current;

        }

        for (i = 0; i < numberComponents; i++) {
            result[components[i].label] = components[i].current;
        }
        for (i = 0; i < numberPrecipitate; i++) {
            result[precipitate[i].label] = precipitate[i].current;
        }
        for (i = 0; i < numberConstant; i++) {
            result[constant[i].label] = constant[i].current;
        }
        return result;
    }

};

