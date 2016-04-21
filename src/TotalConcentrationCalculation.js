"use strict";
/**
 * Created by loicstrauch on 14.04.16.
 */

module.exports={
CreateModel: function(Data) {
    var model = new Array();
    for (var i = 0; i < Data.listComponentBeta.length; i++) {

        for (var j = 0; j < Data.listspecies.length; j++) {
            if (!model[i])model[i] = new Array();

            var p = 0;
            for (var k = 0; k < Data.listComponentBeta[i][0].length; k++) {

                if (Data.listComponentBeta[i][0].charAt(k) == Data.listspecies[j].charAt(0)) {
                    p = 1;

                    if (Data.listComponentBeta[i][0].charAt(k + 1)) {
                        if (Number(Data.listComponentBeta[i][0].charAt(k + 1)) < 10 || Number(Data.listComponentBeta[i][0].charAt(k + 1)) > 1) {

                            p = p * Number(Data.listComponentBeta[i][0].charAt(k + 1));
                        }
                    }
                }
            }

            model[i][j] = p;
        }
    }
    return require("./Matrix.js").transpMatrix(model, Data.listspecies.length, Data.listComponentBeta.length);
},
    
ConcentrationCalculation: function(Data, guessConcentration, model) {
    var guessMatrix = require("./Matrix.js").rowToMatrix(guessConcentration, Data.listComponentBeta.length,Data.listspecies.length);
    var guessPowModel = require("./Matrix.js").powMatrix(guessMatrix, model, Data.listspecies.length, Data.listComponentBeta.length);
    var ComponentConcentration = require("./Matrix.js").matrixToRow(guessPowModel, Data.listComponentBeta.length, Data.listspecies.length);
    for (var i = 0; i < Data.listComponentBeta.length; i++) {
        ComponentConcentration[i] = ComponentConcentration[i] * Data.listComponentBeta[i][1];
    }
    return ComponentConcentration;
},

TotalConcentrationSpecies: function(Data, model, ComponentConcentration) {
    var matrixComponentConcentration = require("./Matrix.js").transpMatrix(require("./Matrix.js").rowToMatrix(ComponentConcentration, Data.listComponentBeta.length, Data.listspecies), Data.listspecies.length, Data.listComponentBeta.length);
    var matrixConcentrationTotal = require("./Matrix.js").multiMatrix(model, matrixComponentConcentration, Data.listspecies.length, Data.listComponentBeta.length);
    return require("./Matrix.js").sumRowMatrix(matrixConcentrationTotal, Data.listspecies.length, Data.listComponentBeta.length);

}
    

};

