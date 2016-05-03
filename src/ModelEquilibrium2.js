/**
 * Created by loicstrauch on 27.04.16.
 */
"use strict";

module.exports= {

    CreateModel: function (equilibriumModel) {
        const Matrix = require("./Matrix");
        var component = equilibriumModel.components;
        var numberComponent = equilibriumModel.components.length;
        var numberSpecies = equilibriumModel.species.length;
        var unityMatrix= Matrix.creationIdentityMatrix(numberSpecies);
        var model = [];
        for (var i = 0; i < numberComponent; i++) {
            for (var j = 0; j < numberSpecies; j++) {
                if (!model[i])model[i] = [];
                model[i][j]=component[i].species[j];
            }
        }
        var modelComplet= Matrix.pasteTwoMatrix(unityMatrix, model);
        return Matrix.transposeMatrix(modelComplet, numberSpecies, numberComponent+numberSpecies);
    },
    CreateModelPrecipitate: function (equilibriumModel) {
        const Matrix = require("./Matrix");
        var precipitate = equilibriumModel.precipitate;
        var numberPrecipitate = equilibriumModel.precipitate.length;
        var numberSpecies = equilibriumModel.species.length;
        var model = [];
        for (var i = 0; i < numberPrecipitate; i++) {
            for (var j = 0; j < numberSpecies; j++) {
                if (!model[i])model[i] = [];
                model[i][j]=Math.abs(precipitate[i].species[j]);
            }
        }
      
        return Matrix.transposeMatrix(model, numberSpecies, numberPrecipitate);
    }
};