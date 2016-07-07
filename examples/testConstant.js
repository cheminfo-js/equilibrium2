/**
 * Created by loicstrauch on 12.05.16.
 */
'use strict';

const Equilibrium = require('..');

var equilibriumModel = {
    volume: 1,
    species: [
        {
            label: 'CO3--',
            charge: -2,
            total: 1

        },
        {
            label: 'H+',
            charge: 1,
            atEquilibrium: 0.01
        }
    ],
    components: [
        {
            label: 'HCO3-',
            species: [1, 1],
            Keq: -6
        },
        {
            label: 'H2CO3',
            species: [1, 2],
            Keq: -9
        },
        {
            label: 'OH-',
            species: [0, -1],
            Keq: 0
        }
    ],
    precipitate: [],
    constant: []
};

equilibriumModel.species[1].atEquilibrium = 1;

var eq = new Equilibrium(equilibriumModel);
var solution = eq.solveRobust();
console.log('robust', solution);

for(var ph=0;ph<=14;ph += 1) {
    solution['H+'] = Math.pow(10,-ph);
    eq.setInitial(solution);
    solution = eq.solve();

    console.log(ph, solution);


}