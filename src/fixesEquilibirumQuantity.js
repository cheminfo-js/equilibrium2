/**
 * Created by loicstrauch on 12.05.16.
 */
'use strict';

module.exports = {

    CreateNewEquilibriumModel: function (equilibriumModel) {
        var newEquilibriumModel = equilibriumModel;
        newEquilibriumModel.species = [null];
        var newComponent = newEquilibriumModel.components;
        var newPrecipitate = newEquilibriumModel.precipitate;
        var species = equilibriumModel.species;
        var numberComponent = equilibriumModel.components.length;
        var component = equilibriumModel.components;
        var precipitate = equilibriumModel.precipitate;
        newEquilibriumModel.constantSpecies = [];
        
        var newConstant = 0;
        var numberCurrentNewSpecies = 0;

        for (var t = 0; t < numberComponent; t++) {
            newComponent[t].species = [];
        }
       
        console.log(newEquilibriumModel);
        for (var i = 0; i < species.length; i++) {
            if (species[i].fixesEquilibriumQuantity == false) {

                newEquilibriumModel.species[numberCurrentNewSpecies] = species[i];
                for (var u = 0; u < numberComponent; u++) {
                    newComponent[u].species[numberCurrentNewSpecies] = component[u].species[i];
                }
                numberCurrentNewSpecies++;
            }
              
            else {
                for (var j = 0; j < component.length; j++) {
                    if (component[j].species[i] != 0) {
                        newComponent[j].constant = component[j].constant * Math.pow(species[i].atEquilibrium, component[j].species[i]);
                    }
                    /*
                    for (var j = 0; j < precipitate.length; j++) {
                        if (precipitate[j].species[i] != 0) {
                           newPrecipitate[j].constant = precipitate[j].constant * Math.pow(species[i].atEquilibrium, precipitate[j].species[i]);
                        }
                    }*/
                    //newEquilibriumModel.constantSpecies[newConstant]=species[i];
                    newConstant++;
                }
            }
        }
        return newEquilibriumModel;
    }

};
