// permet de créer une matrice de taille : taille1*taille2 et de la remplir avec //la fonction prompt
/*

 */
function DataUser(listComponentBeta, listSpecies, pH, listSalt , listMoleSalt, listIon, listConstant, volume)
{
    this.pH=pH;
    this.listIon= listIon;
    this.listSalt=listSalt;
    this.listMoleSalt= listMoleSalt;
    this.listConstant= listConstant;
    this.volume= volume;
    this.listComponentBeta = listComponentBeta;
    this.listSpecies = listSpecies;

}
var pH=0.01;
const volume=1;
var ph= require("../src/pHCreation");
const Matrix= require("../src/Matrix");
const Solubilisation= require("../src/Solubilisation");

while(pH<14)

{

    var listSalt=[["ACO",0.02],["C",0.01]];
    var listMoleSalt=[0.9,0.8];
    var listIon=["A","O","C"];
    var listSpecies=[["X", 0.1], ["H", 0.3]];
    var listComponentBeta=[["X", 1], ["H", 1], ["XH", 0.00001]];
    var listConstant=[["o", 0.000001]];
    var dataUser= new DataUser(listComponentBeta, listSpecies, pH, listSalt, listMoleSalt, listIon, listConstant, volume);
    ph.pHConstant(dataUser);
    /*
    var listS = Matrix.arraySplitting(dataUser.listSpecies, 0);
    var totalConcentration = Matrix.arraySplitting(dataUser.listSpecies, 1);
    dataUser.listSpecies = listS;
    dataUser.totalConcentration = totalConcentration;
    */
    var listsolution = Solubilisation.solubilisation(dataUser);
    console.log(listsolution);
    var coeff = Solubilisation.calculSolubility(dataUser);
    console.log(coeff);
    var solu = Solubilisation.precipitation(dataUser, coeff, listsolution);
    console.log(solu);
    pH=pH+0.05;
}
    
  
