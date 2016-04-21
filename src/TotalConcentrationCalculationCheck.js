"user strict";
/**
 * Created by loicstrauch on 14.04.16.
 */

function Data(Totalconcentration, listComponentBeta, listSpecies)
{
    this.Totalconcentration = Totalconcentration;
    this.listComponentBeta = listComponentBeta;
    this.listspecies = listSpecies;
}

var listSpecies=["X","Y","Z"];
var listComponentBeta=[["X", 1], ["Y", 1], ["Z", 1], ["XY", 0.4], ["XZ2", 21], ["YZ",2.1], ["XYZ",0.001]];
var guessConcentration=[0.1,0.20,0.01];
var TotalConcentration=[0.3,0.5,0.08];
var dataUser= new Data(TotalConcentration,listComponentBeta,listSpecies);


var model = [[1,0,0,1,1,0,1], [0,1,0,1,0,1,1], [0,0,1,0,2,1,1]];
var concentrationCalc=[0.1,0.2,0.01,0.008000000000000002,0.00021,0.004200000000000001,2.0000000000000004e-7 ];
var TotalSpecies=[(0.1+0.008000000000000002+0.00021+2.0000000000000004e-7),(0.2+0.008000000000000002+0.004200000000000001+2.0000000000000004e-7) ,(0.01+2*0.00021+0.004200000000000001+2.0000000000000004e-7)];
var a=0;

for(var i=0;i<dataUser.listspecies.length;i++)
{
    for(var j=0;j<dataUser.listComponentBeta.length;j++)
    {
        if(require("./TotalConcentrationCalculation.js").CreateModel(dataUser)[i][j]==model[i][j])a++;
    }
}
if(a==21)console.log("CreateModel : OK");
else console.log("CreateModel : WARNING");

a=0;

for(var i=0;i<dataUser.listComponentBeta.length;i++)
{

    if(require("./TotalConcentrationCalculation.js").ConcentrationCalculation(dataUser,guessConcentration,model)[i]==concentrationCalc[i])a++;

}
if(a==7)console.log("ConcentrationCalculation : OK");
else console.log("ConcentrationCalculation : WARNING");

a=0;
for(var i=0;i<dataUser.listspecies.length;i++)
{

    if(require("./TotalConcentrationCalculation.js").TotalConcentrationSpecies(dataUser,model,concentrationCalc)[i]==TotalSpecies[i])a++;

}
if(a==3)console.log("TotalConcentrationSpecies : OK");
else console.log("TotalConcentrationSpecies : WARNING");


