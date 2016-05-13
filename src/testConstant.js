/**
 * Created by loicstrauch on 12.05.16.
 */
'use strict';

var equilibriumModel = {
    volume:1,
    species: [
        {
            label:'Na+',
            charge:1,
            total:2.2,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label:'CO3--',
            charge:-2,
            total:1,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label:'NH3',
            charge:1,
            total:2,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label:'Ag+',
            charge:1,
            total:1,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label:'H+',
            charge:1,
            total:-0.2,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        }
    ],
    components:[
        {
            label:'HCO3-',
            species: [0, 1, 0, 0, 1],
            constant:-6,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label:'H2CO3',
            species: [0, 1, 0, 0, 2],
            constant:-9,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label:'Ag(NH3)2',
            species: [0, 0, 2, 1, 0],
            constant:-6,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label:'OH-',
            species: [0, 0, 0, 0, -1],
            constant:14,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        }
    ],
    precipitate: [

        {
            label:'AgOH',
            species: [0, 0, 0, 1, -1],
            constant:7,
            atEquilibrium:0,
            fixesEquilibriumQuantity: false
        }
    ]
};
const MonteCarlo = require('./MonteCarloEquilibrium2');
const ConcentrationCalculation = require('../src/ConcentrationCalculationEquilibrium2');
const Model = require('../src/ModelEquilibrium2');
const Newton = require('../src/NewtonAlgorithmeEquilibrium2');
const Solubility = require('./SolubilisationEquilibrium2');
const Matrix = require('../src/Matrix');
const Constant = require('../src/fixesEquilibirumQuantity');

var newEquilibrium = Constant.CreateNewEquilibriumModel(equilibriumModel);
console.log(newEquilibrium);
