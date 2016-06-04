/**
 * Created by loicstrauch on 12.05.16.
 */
'use strict';
const Matrix = require('../src/util/matrix');
module.exports = {

    createNewEquilibriumModel: function (equilibriumModel) {
        var species = equilibriumModel.species;
        var component = equilibriumModel.components;
        var numberSpecies = species.length;
        var numberComponents = component.length;
        var precipitate = equilibriumModel.precipitate;
        var numberPrecipitate = precipitate.length;
        var speciesDeleted = [];
        for (var i = 0; i < numberSpecies; i++) {
            if (species[i].atEquilibrium != undefined) {
                equilibriumModel.constant.push(equilibriumModel.species[i]);
                for (var j = 0; j < numberComponents; j++) {
                    component[j].Keq = component[j].Keq - 0.4342944819 * Math.log(Math.pow(species[i].atEquilibrium, component[j].species[i]));
                    if (!component[j].constant)component[j].constant = [];
                    component[j].constant.push(component[j].species[i]);
                    component[j].species = Matrix.deleteOneVariableOfArray(i, component[j].species);
                    speciesDeleted.push(i);
                }
                for (var k = 0; k < numberPrecipitate; k++) {
                    precipitate[k].Keq = precipitate[k].Keq - 0.4342944819 * Math.log(Math.pow(species[i].atEquilibrium, precipitate[k].species[i]));
                    precipitate[k].species = Matrix.deleteOneVariableOfArray(i, precipitate[k].species);
                }

            }
        }
        equilibriumModel.species = Matrix.deleteCollectionofVariableOfArray(speciesDeleted, species);

        return equilibriumModel;
    },

    changeConstantComponentsHydroxy: function (equilibriumModel) {
        var components = equilibriumModel.components;
        var numberComponents = components.length;
        var numberSpecies = equilibriumModel.species.length;
        var precipitate = equilibriumModel.precipitate;
        var numberPrecipitate = precipitate.length;
        for (var i = 0; i < numberComponents; i++) {
            for (var j = 0; j < numberSpecies; j++) {
                if (components[i].species[j] < 0)components[i].Keq = components[i].Keq + 14;
            }
        }
        for (var i = 0; i < numberPrecipitate; i++) {
            for (var j = 0; j < numberSpecies; j++) {

                if (precipitate[i].species[j] < 0) {
                    precipitate[i].Keq = precipitate[i].Keq - 14;
                }
            }
        }
    },

};
