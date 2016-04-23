/**
 * Created by loicstrauch on 22.04.16.
 */
"use strict";

const Concentration= require("../src/TotalConcentrationCalculation");
function Data(Totalconcentration, listComponentBeta, listSpecies)
{
    this.Totalconcentration = Totalconcentration;
    this.listComponentBeta = listComponentBeta;
    this.listspecies = listSpecies;
}

var listSpecies=["X","Y","Z"];
var listComponentBeta=[["X", 1], ["Y", 1], ["Z", 1], ["XY", 400], ["XZ2", 21], ["YZ",2.1], ["XYZ",0.001]];
var guessConcentration=[0.1,0.20,0.01];
var TotalConcentration=[0.3,0.5,0.08];
var dataUser= new Data(TotalConcentration,listComponentBeta,listSpecies);


var model = [[1,0,0,1,1,0,1], [0,1,0,1,0,1,1], [0,0,1,0,2,1,1]];
var concentrationCalc=[0.1,0.2,0.01,8.000000000000002,0.00021,0.004200000000000001,2.0000000000000004e-7 ];
var TotalSpecies=[(0.1+8.000000000000002+0.00021+2.0000000000000004e-7),(0.2+8.000000000000002+0.004200000000000001+2.0000000000000004e-7) ,(0.01+2*0.00021+0.004200000000000001+2.0000000000000004e-7)];


describe('TotalConcentrationCalculation', function () {
    it('model', function () {
        var modelcalculate = Concentration.CreateModel(dataUser);
        modelcalculate.should.deepEqual(model);
    });
    it('Concentration Calculation', function () {
        var concentrationCalculation = Concentration.ConcentrationCalculation(dataUser,guessConcentration,model);
        concentrationCalculation.should.deepEqual(concentrationCalc);
    });
    it('Total Species Concentration Calculation', function () {
        var species = Concentration.TotalConcentrationSpecies(dataUser,model,concentrationCalc);
        species.should.deepEqual(TotalSpecies);
    });
});

