/**
 * Created by loicstrauch on 31.05.16.
 */
'use strict';

const Fixes = require('../src/fixesEquilibirumQuantity');

var equilibriumModel = {
    volume: 0.5,
    species: [
        {
            label: "Na+",
            charge: 1,
            total: 2.2
        },
        {
            label: "NH3",
            charge: 1,
            total: 2
        },
        {
            label: "Ag+",
            charge: 1,
            total: 1
        },
        {
            label: "H+",
            charge: 1,
            total: -0.2
        }
    ],
    components: [
        {
            label: "HCO3-",
            species: [0, 0, 0, 1],
            Keq: -6,
            constant:[1]
        },
        {
            label: "H2CO3",
            species: [0, 0, 0, 2],
            Keq: -9,
            constant:[1]
        },
        {
            label: "Ag(NH3)2",
            species: [0, 2, 1, 0],
            Keq: -6,
            constant:[0]
        },
        {
            label: "OH-",
            species: [0, 0, 0, -1],
            Keq: 14,
            constant:[0]
        }
    ],
    precipitate: [

        {
            label: "AgOH",
            species: [0, 0, 1, -1],
            Keq: 7
        },
        {
            label: "Ag2CO3",
            species: [0, 0, 2, 0],
            Keq: 8
        }

    ],
    constant:[
        {
            label: "CO3--",
            charge: -2,
            total: 1,
            current: 1,
            atEquilibrium: 1
        }
    ]
};
var equilibriumModel2 = {
    volume: 0.5,
    species: [
        {
            label: "Na+",
            charge: 1,
            total: 2.2
        },
        {
            label: "CO3--",
            charge: -2,
            total: 1,
            current: 1
        },
        {
            label: "NH3",
            charge: 1,
            total: 2
        },
        {
            label: "Ag+",
            charge: 1,
            total: 1
        },
        {
            label: "H+",
            charge: 1,
            total: -0.2
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
    ],
    constant:[
    ]
};




describe('fixes Equilibrium Quantity', function () {
    it('new model with constant', function () {
        Fixes.createNewEquilibriumModel(equilibriumModel2);
        equilibriumModel2.should.deepEqual(equilibriumModel);
    });
    

});




