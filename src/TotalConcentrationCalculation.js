"use strict";
/**
 * Created by loicstrauch on 14.04.16.
 */

module.exports={
    
CreateModel: function(Data) {
    const Matrix= require("./Matrix");
    var species=Data.listspecies;
    var component= Data.listComponentBeta;
    var numberComponent=Data.listComponentBeta.length;
    var numberSpecies= Data.listspecies.length;
    
    var model = new Array();
    for (var i = 0; i < numberComponent; i++) {

        for (var j = 0; j < numberSpecies; j++) {
            if (!model[i])model[i] = new Array();

            var p = 0;
            for (var k = 0; k < component[i][0].length; k++) {
                if (component[i][0].charAt(k) == species[j].charAt(0)) {
                    p = 1;

                    if (component[i][0].charAt(k + 1)) {
                        if (Number(component[i][0].charAt(k + 1)) < 10 || Number(component[i][0].charAt(k + 1)) > 1) {
                            p = p * Number(component[i][0].charAt(k + 1));
                        }
                    }
                }
            }
            model[i][j] = p;
        }
    }
    return Matrix.transposeMatrix(model, Data.listspecies.length, Data.listComponentBeta.length);
},
    
ConcentrationCalculation: function(Data, guessConcentration, model) {
    const Matrix=require("./Matrix");
    var numberSpecies=Data.listspecies.length;
    var numbercomponent=Data.listComponentBeta.length;
    var guessMatrix = Matrix.rowToMatrix(guessConcentration, numbercomponent,numberSpecies);
    var guessPowModel = Matrix.powMatrix(guessMatrix, model, numberSpecies, numbercomponent);
    var ComponentConcentration = Matrix.matrixToRow(guessPowModel, numbercomponent, numberSpecies);
    for (var i = 0; i < Data.listComponentBeta.length; i++) {
        ComponentConcentration[i] = ComponentConcentration[i] * Data.listComponentBeta[i][1];
    }
    return ComponentConcentration;
},

TotalConcentrationSpecies: function(Data, model, ComponentConcentration) {
    var numberSpecies=Data.listspecies.length;
    var numbercomponent=Data.listComponentBeta.length;
    const Matrix=require("./Matrix");
    var matrixComponentConcentration = Matrix.transposeMatrix(Matrix.rowToMatrix(ComponentConcentration, numbercomponent, Data.listspecies), numberSpecies, numbercomponent);
    var matrixConcentrationTotal = Matrix.multiMatrix(model, matrixComponentConcentration, numberSpecies, numbercomponent);
    return Matrix.sumRowMatrix(matrixConcentrationTotal, numberSpecies, numbercomponent);

}
    

};

