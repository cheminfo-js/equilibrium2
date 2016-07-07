/**
 * Created by loicstrauch on 27.04.16.
 */

'use strict';

const ConcentrationCalculation = require('./concentrationCalculation');
const fixesEquilibrium = require('./fixesEquilibirumQuantity');
const Model = require('./model');
const newton = require('./newton');
const deepcopy = require('deepcopy');
const maxTries = 10000;

const defaultModel = {
    volume: 1,
    constant: [],
    precipitate: []
};

const defaultSolveOptions = {
    maxIterations: 15
};

class Equilibrium {
    constructor(model) {
        this.originalModel = model;
    }

    _init() {
        var model = deepcopy(this.originalModel);
        if(this.inputModel && this.inputModel.constant) {
            for(var i=0; i<this.inputModel.constant.length; i++) {
                var constant = this.inputModel.constant[i];
                var specie = model.species.find(findByLabel(constant.label));
                if(specie) specie.atEquilibrium = constant.current;
            }
        }
        Object.assign(model, deepcopy(defaultModel));

        // Input sanity check
        
        checkModel( model);

        // From moles to concentration (using volume
        ConcentrationCalculation.moleToConcentrationModel(model);
        // Fix Keq for hydroxy components
        fixesEquilibrium.changeConstantComponentsHydroxy(model);
        // handle cases where a specie at equilibrium is fixed
        fixesEquilibrium.createNewEquilibriumModel(model);
        // Create the concentration equilibrium model
        this.model = Model.createModel(model);
        // Create the solubility model (precipitation)
        this.solubilityModel = Model.createModelPrecipitate(model);
        this.inputModel = model;

    }

    setInitial(initial) {
        this._init();
        if(initial === 'logarithmic') {
            fixesEquilibrium.initializeConcentrations(this.inputModel, 'logarithmic');
        } else if(typeof initial === 'object') {
            fixesEquilibrium.setInitialConcentrations(this.inputModel, initial);
        }

    }

    // Solve the system once
    solve(options) {
        options = Object.assign({}, options, defaultSolveOptions);
        checkCanSolve(this.inputModel, options);
            var j = 0;
            do {
                // Sets the new atEquilibrium values
                ConcentrationCalculation.concentrationCalculation(this.inputModel, this.model);
                var vectorComponentConcentration = ConcentrationCalculation.vectorConcentrationAllComponent(this.inputModel);
                newton(this.model, this.inputModel, vectorComponentConcentration);
                j++;
                var totalSpeciesConcentration = ConcentrationCalculation.calculateTotalConcentrationSpecies(this.inputModel, this.model, this.solubilityModel);
                var hasConverged = ConcentrationCalculation.compareRealAndCalcTotalConcentration(this.inputModel, totalSpeciesConcentration);
            } while (j < options.maxIterations && hasConverged == false);
        

        if(!hasConverged) throw new Error('System has not converged');
        return this.getConcentrations();
    }

    solveRobust(options) {
        var success = false;
        for(var i=0; i < maxTries; i++) {
            this.setInitial('logarithmic');
            try {
                this.solve();
                success = true;
                break;
            } catch(e) {
            }
        }
        if(!success) {
            throw new Error('System never converges');
        }
        return this.getConcentrations();
    }
    

    getConcentrations() {
        return ConcentrationCalculation.getEquilibriumConcentrations(this.inputModel);
    }
}

function checkModel(model) {
    // check that labels are unique
    var labels = {};
    checkLabels(model.species, labels);
    checkLabels(model.components, labels);
    checkLabels(model.constant, labels);
    checkLabels(model.precipitate, labels);
}

function checkLabels(arr, labels) {
    for (var i = 0; i < arr.length; i++) {
        var label = arr[i].label;
        if(label == undefined) throw new Error('Labels must be defined');
        if(labels[label]) throw new Error('Labels should be unique');
        labels[label] = true;
    }
}

function checkCanSolve(model, options) {
    checkHasConcentrations(model.species);
}

function checkHasConcentrations(arr) {
    for(var i=0; i<arr.length; i++) {
        if(arr[i].current == undefined) {
            throw new Error('The model was not correctly initialized');
        }
    }
}

module.exports = Equilibrium;

function findByLabel(label) {
    return function (entry) {
        return entry.label === label;
    }
}