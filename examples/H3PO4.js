/**
 * Created by loicstrauch on 12.05.16.
 */
'use strict';

const Equilibrium = require('..');

var equilibriumModel = {
    "volume": 1,
    "species": [
        {"label": "H+", "atEquilibrium": Math.pow(10, -14)},
        {"label": "PO4---", "total": 1}
    ],
    "components": [
        {"label": "OH-", "Keq": 0, "species": [-1, 0]},
        {"label": "H3PO4", "Keq": -31, "species": [3, 1]},
        {"label": "H2PO4-", "Keq": -25, "species": [2, 1]},
        {"label": "HPO4--", "Keq": -2, "species": [1, 1]}
    ]
};


var eq = new Equilibrium(equilibriumModel);
var solution = eq.solveRobust();

for(var ph=0;ph<=14;ph += 1) {
    solution['H+'] = Math.pow(10,-ph);
    eq.setInitial(solution);
    solution = eq.solve();

    console.log(ph, solution);
}

