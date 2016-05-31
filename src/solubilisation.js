/**
 * Created by loicstrauch on 29.04.16.
 */
'use strict';

module.exports = {

    productOfSolubility: function (equilibriumModel) {
        var productOfSolubility = [];
        var precipitate = equilibriumModel.precipitate;
        var species = equilibriumModel.species;
        var numberSpecies = species.length;
        var numberPrecipitate = equilibriumModel.precipitate.length;
        for (var i = 0; i < numberPrecipitate; i++) {
            productOfSolubility[i] = 1;
            for (var j = 0; j < numberSpecies; j++) {
                if (precipitate[i].species[j] != 0) {
                    if (precipitate[i].species[j] > 0) {
                        productOfSolubility[i] = productOfSolubility[i] * precipitate[i].species[j] * species[j].atEquilibrium;
                    }
                    else productOfSolubility[i] = productOfSolubility[i] * Math.abs(precipitate[i].species[j]) * (Math.pow(10, -14) / species[j].atEquilibrium);
                }
            }
            precipitate[i].productOfSolubility = productOfSolubility[i];
        }

    }
};
