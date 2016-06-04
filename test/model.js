/**
 * Created by loicstrauch on 27.05.16.
 */
/**
 * Created by loicstrauch on 27.05.16.
 */
'use strict';
const Model = require('../src/model');
var equilibriumModel = {
    volume: 1,
    species: [
        {
            label: "Na+",
            charge: 1,
            total: 2.2
        },
        {
            label: "CO3--",
            charge: -2,
            total: 1
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

    ]
};

var matrixmodel = [[1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 1, 0, 0], [0, 0, 1, 0, 0, 0, 0, 2, 0], [0, 0, 0, 1, 0, 0, 0, 1, 0], [0, 0, 0, 0, 1, 1, 2, 0, -1]];
var matrixprecipitate = [[0, 0], [0, 1], [0, 0], [1, 2], [-1, 0]];

describe('model', function () {
    it('model creation', function () {
        var model = Model.createModel(equilibriumModel);
        model.should.deepEqual(matrixmodel);
    });

    it('model precipitate', function () {
        var modelPrecipitate = Model.createModelPrecipitate(equilibriumModel);
        modelPrecipitate.should.deepEqual(matrixprecipitate);
    });

});
