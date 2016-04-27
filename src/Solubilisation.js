/**
 * Created by loicstrauch on 24.04.16.
 */
"use strict";

module.exports= {
    
    solubilisation:function(dataUser)
    {
       var volume = dataUser.volume; 
       var numberIon= dataUser.listIon.length;
       var numberSalt= dataUser.listSalt.length;
       var moleSalt= dataUser.listMoleSalt; 
       var Ion = dataUser.listIon;
        var Salt= dataUser.listSalt;

       var totalSolubilisation=[[]];
        for(var i=0;i<numberIon;i++)
        {
            totalSolubilisation[i]=[Ion[i],0];
            for(var j=0;j<numberSalt;j++)
            {
                for(var k=0; k<Salt[j][0].length;k++)
                {
                if(Ion[i].charAt(0)===Salt[j][0].charAt(k))
                {
                    var p=1;
                        if(Salt[j][0].length==k+1);
                            
                        else if (Number(Salt[j][0].charAt(k + 1)) < 10 && Number(Salt[j][0].charAt(k + 1)) > 1 ) {
                            p = p * Number(Salt[j][0].charAt(k + 1));
                           
                        }
                   totalSolubilisation[i][1]=totalSolubilisation[i][1]+(p*moleSalt[j])/volume;
                }
                }
            }
        }
       return totalSolubilisation; 
    },
    calculSolubility: function(dataUser)
    {
        var vectorCoefficient=[];
        var salt= dataUser.listSalt;
        var coefficientKsMulti=1;
        var coefficientKsPow=0;
  
        for(var i=0;i<salt.length;i++)
        {
          for(var j=0;j<salt[i][0].length;j++)
          {
              coefficientKsPow++;
              if (Number(salt[i][0].charAt(j)) < 10 && Number(salt[i][0].charAt(j)) > 1){
                  coefficientKsMulti=coefficientKsMulti*Math.pow(salt[i][0].charAt(j),salt[i][0].charAt(j));
                  coefficientKsPow=coefficientKsPow+Number(salt[i][0].charAt(j))-2;
              }
          }

            var tab=[coefficientKsMulti,coefficientKsPow];
            vectorCoefficient.push(tab);
            coefficientKsMulti=1;
            coefficientKsPow=0;
        }
        var solubility=[];
        for(var i=0;i<salt.length;i++)
        {
            solubility[i]=Math.pow(salt[i][1]/vectorCoefficient[i][0],1/vectorCoefficient[i][1]);
           
        }
        return solubility;
    },

    precipitation: function(dataUser,solubility,listSolution)
    {
        var Solubility= require("../src/Solubilisation");
        var decompositionVector=Solubility.decompositionSaltinCoefficient(dataUser);
        console.log(decompositionVector);
        var ionConcentration = listSolution;
        var molePrecipitate=[];
        var volume=dataUser.volume;
        var salt=dataUser.listSalt;
        var ion = dataUser.listIon;
        var numberIon= ion.length;
        var numberSalt= dataUser.listSalt.length;
        var ConcentrationSaltSolution= [];
        for(var i=0;i<salt.length;i++)
        {
            ConcentrationSaltSolution[i]=(dataUser.listMoleSalt[i])/volume;
        }
       
       for(var i=0;i<numberSalt;i++) {

           if (ConcentrationSaltSolution[i] > solubility[i]) {

               molePrecipitate[i] = (ConcentrationSaltSolution[i] - solubility[i]) * volume;
               ConcentrationSaltSolution[i] = solubility[i];
               for (var j = 0; j < numberIon; j++) {
                   for (var k = 0; k < numberSalt; k++) {
                       for (var p = 0; p < salt[k][0].length; p++) {
                           if (ion[j].charAt(0) === salt[k][0].charAt(p))
                           {ionConcentration[j][1] = ionConcentration[j][1] - (molePrecipitate[k] * decompositionVector[k][p][1] / volume);
                           console.log(ionConcentration);}
                       }
                   }
               }
           }
           else {
               molePrecipitate[i] = 0;
           }

           var ionAndPrecipitate = [molePrecipitate, ionConcentration];

           return ionAndPrecipitate;
       } },
    
    decompositionSaltinCoefficient : function(dataUser)
    {
        var salt = dataUser.listSalt;
        var numberSalt= dataUser.listSalt.length;
        var ion= dataUser.listIon;
        var indice=1;
        var symbole;
        var tableau=[];
        var numberIon=dataUser.listIon.length;
        var decompositionFormule=[];
       
        for(var i=0;i<numberSalt;i++)
        {
            tableau=[];
        for(var u=0;u<numberIon;u++)
        {
           
            for(var j=0;j<salt[i][0].length;j++)
            {
                if(ion[u]===salt[i][0].charAt(j))
                {
                symbole=salt[i][0].charAt(j);
                if(j!=salt[i][0].length-1)
                {
                    if(Number(salt[j][0].charAt(j + 1)) < 10 && Number(salt[j][0].charAt(j + 1)) > 1 )
                        {
                           indice=salt[j][0].charAt(j + 1);
                        }
                }
                    
                var tabl=[symbole,indice];
                tableau.push(tabl);
                }
            }
        }
            decompositionFormule.push(tableau);
        }
      return decompositionFormule;  
    }
};