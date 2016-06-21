/**
 * Created by loicstrauch on 12.05.16.
 */
'use strict';

const eq = require('..');
for (var ph = 0; ph <= 14; ph++) {

    var equilibriumModel = {
        "volume": 1,
        "species": [
            {"label": "H+", "atEquilibrium": 1},
            {"label": "PO4---", "total": 1}
        ],
        "constant": [],
        "precipitate": [],
        "components": [
            {"label": "OH-", "Keq": 0, "species": [-1, 0]},
            {"label": "H3PO4", "Keq": -31, "species": [3, 1]},
            {"label": "H2PO4-", "Keq": -25, "species": [2, 1]},
            {"label": "HPO4--", "Keq": -2, "species": [1, 1]}
        ]
    };

    equilibriumModel.species[0].atEquilibrium = Math.pow(10, -ph);

    var result = eq(equilibriumModel);
    var display = 0;
    console.log(ph, result[display][0], result[display][1]);


}

