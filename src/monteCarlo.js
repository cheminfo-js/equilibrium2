/**
 * Created by loicstrauch on 28.04.16.
 */
'use strict';
module.exports = {

    monteCarloLogarithmique: function (equilibriumModel) {
        var species = equilibriumModel.species;
        for (var i = 0; i < species.length; i++) {
            species[i].atEquilibrium = Math.abs(species[i].total) * Math.pow(Math.random(), 10);
        }

    }
};
