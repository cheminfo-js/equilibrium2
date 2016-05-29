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
           
        },
        {
            label:'CO3--',
            charge:-2,
            total:1,
            atEquilibrium: 2.0
        },
        {
            label:'NH3',
            charge:1,
            total:2
        },
        {
            label:'Ag+',
            charge:1,
            total:1
        },
        {
            label:'H+',
            charge:1,
            total:-0.2
        }
    ],
    components:[
        {
            label:'HCO3-',
            species: [0, 1, 0, 0, 1],
            Keq:-6
        },
        {
            label:'H2CO3',
            species: [0, 1, 0, 0, 2],
            Keq:-9
        },
        {
            label:'Ag(NH3)2',
            species: [0, 0, 2, 1, 0],
            Keq:-6
        },
        {
            label:'OH-',
            species: [0, 0, 0, 0, -1],
            Keq:14
        }
    ],
    precipitate: [

        {
            label:'AgOH',
            species: [0, 0, 0, 1, -1],
            Keq:7,
            atEquilibrium:0,
            fixesEquilibriumQuantity: false
        }
    ]
};
const MonteCarlo = require('./../src/monteCarlo');
const ConcentrationCalculation = require('../src/concentrationCalculation');
const Model = require('../src/model');
const Newton = require('../src/newton');
const Solubility = require('./../src/solubilisation');
const Matrix = require('../src/util/matrix');
const Constant = require('../src/fixesEquilibirumQuantity');

var newEquilibrium = Constant.createNewEquilibriumModel(equilibriumModel);
console.log(newEquilibrium);
