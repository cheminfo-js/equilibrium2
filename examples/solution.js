var equilibrium = require('..');

var equilibriumModel = {
    volume: 1,
    species: [
        {
            label: "Na+",
            charge: 1,
            total: 2.2,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label: "CO3--",
            charge: -2,
            total: 1,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label: "NH3",
            charge: 1,
            total: 2,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label: "Ag+",
            charge: 1,
            total: 1,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label: "H+",
            charge: 1,
            total: -0.2,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        }
    ],
    components: [
        {
            label: "HCO3-",
            species: [0, 1, 0, 0, 1],
            constant: -6,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label: "H2CO3",
            species: [0, 1, 0, 0, 2],
            constant: -9,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label: "Ag(NH3)2",
            species: [0, 0, 2, 1, 0],
            constant: -6,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        },
        {
            label: "OH-",
            species: [0, 0, 0, 0, -1],
            constant: 14,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        }
    ],
    precipitate: [

        {
            label: "AgOH",
            species: [0, 0, 0, 1, -1],
            constant: 7,
            atEquilibrium: 0,
            fixesEquilibriumQuantity: false
        }
    ]
};

equilibrium(equilibriumModel);
