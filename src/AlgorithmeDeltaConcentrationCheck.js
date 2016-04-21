"user strict";
/**
 * Created by loicstrauch on 15.04.16.
 */
function DataUser(Totalconcentration, listComponentBeta, listSpecies)
{
    this.Totalconcentration = Totalconcentration;
    this.listComponentBeta = listComponentBeta;
    this.listspecies = listSpecies;
}
 
var listSpecies=["X","Y","Z"];
var listComponentBeta=[["X", 1], ["Y", 1], ["Z", 1], ["XY", 2], ["XZ2", 25], ["YZ",2.1], ["XYZ",0.001]];
var guessConcentration=[0.2,0.20,0.05];
var TotalConcentration=[1,0.5,0.08];
var difference=0.01;
var dataUser= new DataUser(TotalConcentration,listComponentBeta,listSpecies);
var boolean=true;
var model= require("./TotalConcentrationCalculation.js").CreateModel(dataUser);
var matriceJac =[[0.10821020000000002, 0.008000200000000002, 0.0004202],[0.008000200000000002, 0.21220020000000003, 0.0042002],[0.0004202, 0.0042002, 0.015040200000000002 ]];
var ConcentrationspeciesTotal;
var Matrix = require("ml").Matrix;
var show=false;
var jac= new Matrix(dataUser.listspecies.length,dataUser.listspecies.length);
var componentconcentration= require("./TotalConcentrationCalculation.js").ConcentrationCalculation(dataUser,guessConcentration,model);
jac = require("./AlgorithmeDeltaConcentration").JacobianStar(model,dataUser,componentconcentration);
var a=0;

//verification of the jacobian star function
for(var i=0;i<3;i++)
{
    for(var j=0;j<3;j++)
    {
        if(jac.get(i,j)==matriceJac[i][j])a++
    }
}

if(a==9)console.log("JacobienStar = OK");
else console.log("JacobienStar = WARNING");

//verification of the monte carlo and NewtonRaphton algotithme
while(boolean) 
{

    guessConcentration=require("./AlgorithmeDeltaConcentration").MonteCarlo(TotalConcentration);
    do {

        componentconcentration = require("./TotalConcentrationCalculation.js").ConcentrationCalculation(dataUser, guessConcentration, model);
        ConcentrationspeciesTotal = require("./TotalConcentrationCalculation.js").TotalConcentrationSpecies(dataUser, model, componentconcentration);
        var DiffCalc = require("./Matrix.js").SubstractVector(ConcentrationspeciesTotal, TotalConcentration);
        var absDiffCalc= require("./Matrix.js").absVector(DiffCalc);
        var SummDiff = require("./Matrix.js").sumVector(absDiffCalc);

        if (SummDiff > 1000*require("./Matrix.js").sumVector(TotalConcentration))
        {
            break;
        }
        else if (Math.abs(SummDiff) > difference) {
           
            guessConcentration = require("./AlgorithmeDeltaConcentration.js").NewTonRaphsonAlgorithme(model, dataUser, componentconcentration, ConcentrationspeciesTotal);
           
        }
        else {

            boolean = false;
            show = true;

            }

    } while (boolean);
}
if(show)console.log(componentconcentration);

//verification of the SpiderWeb algorithme

var ChoiceVector=[];
var lastsummDiff=0;
var totalconc=0;


//algo spider

for(var k=0;k<5000;k++)
{
    var GuessVector= require("./AlgorithmeDeltaConcentration.js").MonteCarlo(dataUser.Totalconcentration);
    totalconc= require("./TotalConcentrationCalculation.js").ConcentrationCalculation(dataUser, GuessVector, model);
    var speciestotal =require("./TotalConcentrationCalculation.js").TotalConcentrationSpecies(dataUser, model, componentconcentration);
    var DiffCalculation = require("./Matrix.js").SubstractVector(speciestotal, totalconc);
    var absDiffCal= require("./Matrix.js").absVector(DiffCalculation);
    var SummDif = require("./Matrix.js").sumVector(absDiffCal);
    if(k==0)
    {
        ChoiceVector=GuessVector;
        lastsummDiff=SummDif;
    }
    else
    {
        if(SummDif<lastsummDiff)
        {
            ChoiceVector=GuessVector;
            lastsummDiff=SummDif;
            console.log(lastsummDiff);
            console.log(DiffCalculation);
            console.log(ChoiceVector);

        }
    }
}
console.log("je rentre dans le spider");
console.log(ChoiceVector);
console.log(lastsummDiff);
var totalconccorrected=totalconc;
console.log(totalconccorrected);
/*

do{

    var VectorCorrected= require("./AlgorithmeDeltaConcentration.js").algoSpiderWeb(model,dataUser, ChoiceVector,totalconccorrected);
 
    totalconccorrected= require("./TotalConcentrationCalculation.js").ConcentrationCalculation(dataUser, VectorCorrected, model);
    console.log("2");
    var speciestotal =require("./TotalConcentrationCalculation.js").TotalConcentrationSpecies(dataUser, model, componentconcentration);
    //var DiffCalculation = require("./Matrix.js").SubstractVector(speciestotal, totalconccorrected);
    var absDiffCal= require("./Matrix.js").absVector(DiffCalculation);
    var SummDif = require("./Matrix.js").sumVector(absDiffCal);
    if(SummDiff<lastsummDiff)
    {
        lastsummDiff=SummDif;
        ChoiceVector=VectorCorrected;
    }


}while(lastsummDiff>0.01)

*/

    