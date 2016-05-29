/**
 * Created by loicstrauch on 29.05.16.
 */
'use strict';

const Newton = require('../src/newton');
const Model = require('../src/model');
const Concentration= require('../src/concentrationCalculation');

var equilibriumModel = {
    volume: 1,
    species: [
      
        {
            label: "CO3--",
            charge: -2,
            total: 1,
            atEquilibrium: 1
        },
        {
            label: "H+",
            charge: 1,
            total: 1,
            atEquilibrium: 1
        }
    ],
    components: [
        {
            label: "HCO3-",
            species: [0, 1, 0, 0, 1],
            Keq: -6
        },
        {
            label: "H2CO3",
            species: [0, 1, 0, 0, 2],
            Keq: -9
        },
    ],
    precipitate: [

    ]
};
var model = Model.createModel(equilibriumModel);
var speciesAfterAlgorithme= [1,9.990009930405108*Math.pow(10,-10)];


describe('newton', function () {
    it('newton raphson algorithme', function () {
        
        Concentration.concentrationCalculation(equilibriumModel,model);
        var totalConcentration =Concentration.vectorConcentrationAllComponent(equilibriumModel);
        Newton(model,equilibriumModel,totalConcentration);
        var newSpeciesVector = Concentration.vectorSpeciesConcentration(equilibriumModel);
        console.log(equilibriumModel);
        newSpeciesVector.should.deepEqual(speciesAfterAlgorithme);
    });
});

