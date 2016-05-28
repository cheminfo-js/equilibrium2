/**
 * Created by loicstrauch on 27.05.16.
 */
'use strict';

const Concentration= require('../src/concentrationCalculation');

var equilibriumModel = {
    volume: 0.5,
    species: [
        {
            label: "Na+",
            charge: 1,
            total: 2.2,
            atEquilibrium:1
        },
        {
            label: "CO3--",
            charge: -2,
            total: 1,
            atEquilibrium: 1
        },
        {
            label: "NH3",
            charge: 1,
            total: 2,
            atEquilibrium: 1
        },
        {
            label: "Ag+",
            charge: 1,
            total: 1,
            atEquilibrium: 1
        },
        {
            label: "H+",
            charge: 1,
            total: -0.2,
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
        {
            label: "Ag(NH3)2",
            species: [0, 0, 2, 1, 0],
            Keq: -6
        },
        {
            label: "OH-",
            species: [0, 0, 0, 0, -1],
            Keq: 14
        }
    ],
    precipitate: [

        {
            label: "AgOH",
            species: [0, 0, 0, 1, -1],
            Keq: 7
        },
        {
            label: "Ag2CO3",
            species: [0, 1, 0, 2, 0],
            Keq: 8
        }

    ]
};
var matrixmodel=[[1,0,0,0,0,0,0,0,0],[0,1,0,0,0,1,1,0,0],[0,0,1,0,0,0,0,2,0],[0,0,0,1,0,0,0,1,0],[0,0,0,0,1,1,2,0,-1]];

var concentrationequ= [1,1,1,1,1,Math.pow(10,6),Math.pow(10,9),Math.pow(10,6),Math.pow(10,-14)];
var totalSpecies = [1,Math.pow(10,9)+Math.pow(10,6)+1,2*Math.pow(10,6)+1,Math.pow(10,6)+1,2*Math.pow(10,9)+Math.pow(10,6)+1+Math.pow(10,-14)];
var realTotalConcentration=[2.2,1,2,1,-0.2];
var falseTotalConcentration =[1,4,3,23,2];
var species =[1,1,1,1,1];
var newSpeciestotal=[4.4,2,4,2,-0.4];


 describe('concentration calculation', function () {
    it('concentration calculation', function () {
        Concentration.concentrationCalculation(equilibriumModel,matrixmodel);
        var concentration = Concentration.vectorConcentrationAllComponent(equilibriumModel);
        concentration.should.deepEqual(concentrationequ);
    });
    it('calculate total concentration species', function () {
        Concentration.concentrationCalculation(equilibriumModel,matrixmodel);
        var totalConcentrationSpecies=Concentration.calculateTotalConcentrationSpecies(equilibriumModel,matrixmodel);
        totalConcentrationSpecies.should.deepEqual(totalSpecies);
    });
    it('vector real total concentration', function () {
         
         var realTotal=Concentration.vectorRealTotalConcentration(equilibriumModel,matrixmodel);
         realTotal.should.deepEqual(realTotalConcentration);
    });
    it('vector species concentration', function () {

         var speciesConcentration=Concentration.vectorSpeciesConcentration(equilibriumModel,matrixmodel);
         speciesConcentration.should.deepEqual(species);
    });
    it('compare Real And TotalConcentration', function () {

         var isConverges=Concentration.compareRealAndCalcTotalConcentration(equilibriumModel,realTotalConcentration);
         isConverges.should.deepEqual(true);
         isConverges=Concentration.compareRealAndCalcTotalConcentration(equilibriumModel,falseTotalConcentration);
         isConverges.should.deepEqual(false);
    });
    it('vector species concentration', function () {

         var speciesConcentration=Concentration.vectorSpeciesConcentration(equilibriumModel,matrixmodel);
         speciesConcentration.should.deepEqual(species);
    });
     it('mole to concentration equilibrium model', function () {

         Concentration.moleToConcentrationModel(equilibriumModel);
         var concentrationSpecies= Concentration.vectorRealTotalConcentration(equilibriumModel);
         concentrationSpecies.should.deepEqual(newSpeciestotal);
     });
     
});




