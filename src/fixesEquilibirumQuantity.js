/**
 * Created by loicstrauch on 12.05.16.
 */
'use strict';
const Matrix= require('../src/util/matrix');
module.exports = {

    createNewEquilibriumModel: function (equilibriumModel) {
        var species = equilibriumModel.species;
        var component = equilibriumModel.components;
        var numberSpecies= species.length;
        var numberComponents= component.length;
        var speciesDeleted=[];
        for(var i=0; i< numberSpecies;i++)
        {
            if (species[i].atEquilibrium != undefined) 
            {
              equilibriumModel.constant = equilibriumModel.species[i];
              for(var j=0;j<numberComponents;j++)
              {
                 component[j].Keq=component[j].Keq-0.4342944819*Math.log(Math.pow(species[i].atEquilibrium,component[j].species[i]));
                 component[j].species= Matrix.deleteOneVariableOfArray(i,component[j].species);
                  speciesDeleted.push(i);
              }
               
            }
        }
      equilibriumModel.species = Matrix.deleteCollectionofVariableOfArray(speciesDeleted,species);
        
    return equilibriumModel;
    }

};
