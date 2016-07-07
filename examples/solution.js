var Equilibrium = require('..');

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
        }
    ],
    constant: [
    
    ]
};

var eq = new Equilibrium(equilibriumModel);
eq.setInitial('logarithmic');
console.log(eq.solveRobust());
