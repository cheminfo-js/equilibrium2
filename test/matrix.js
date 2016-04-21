'use strict';

const Matrix = require('../src/Matrix');

/**
 * Created by loicstrauch on 14.04.16.
 */
var vector1=[1,2,3];
var vector2=[2,5,3];
var Matrix1 = [[1, 2, 0], [-1, 2, 3], [1, 3, 2]];
var Matrix2 = [[-2, 3, 0], [1, 3, 2], [0, 2, 2]];

var Matrix3 = [[-2, 6, 0], [-1, 6, 6], [0, 6, 4]];
var Matrix4 = [[1, 8, 1], [-1, 8, 9], [1, 9, 4]];
var Matrix5=[[1, 1, 1], [2, 2, 2], [3, 3, 3]];
var Matrix6=[[1, 0, 0], [0, 2, 0], [0, 0, 3]];
var Matrix7=[[1, 0], [1, 2]];
var Matrix8=[[1, -1, 1], [2, 2, 3], [0, 3, 2]];
var Matrix9=[[0, 9, 4], [4, 9, 10], [1, 16, 10]];
var vector3=[-1,-3,0];
var vector4=[2,10,9];
var vector5=[-1,12,0];
var vector6=[-1,2,3];
var vector7=[2,15,12];
var vector8=[3,4,6];
var vector9=[3,7,6];
var vector10=[2,4,6];

describe('Matrix', function () {
    it('Substract vector', function () {
        var a=0;
        var sub = Matrix.SubstractVector(vector1,vector2);
        sub.should.deepEqual(vector3);
    });
});

// a=0;
//
// for(var i=0;i<vector1.length;i++)
// {
//     if(Matrix.multiVector(vector1,vector2)[i]==vector4[i])a++;
// }
// if(a==3)console.log("multiVector = OK");
// else console.log("multiVector = WARNING");
// a=0;
//
//
// for(var i=0;i<3;i++)
// {
//     for(var j=0;j<3;j++)
//     {
//         if(Matrix.multiMatrix(Matrix1,Matrix2,3,3)[i][j]==Matrix3[i][j])a++;
//
//     }
// }
// if(a==9)console.log("multiMatrix = OK");
// else console.log("multiMatrix= WARNING");
// a=0;
//
// for(var i=0;i<3;i++)
// {
//     for(var j=0;j<3;j++)
//     {
//         if(Matrix.powMatrix(Matrix1,Matrix2,3,3)[i][j]==Matrix4[i][j])a++;
//
//     }
// }
// if(a==9)console.log("powMatrix = OK");
// else console.log("powMatrix= WARNING");
// a=0;
//
// for(var i=0;i<3;i++)
// {
//     for(var j=0;j<3;j++)
//     {
//         if(Matrix.rowToMatrix(vector1,3)[i][j]==Matrix5[i][j])a++;
//     }
// }
// if(a==9)console.log("rowToMatrix = OK");
// else console.log("rowToMatrix= WARNING");
// a=0;
//
// for(var i=0;i<vector5.length;i++)
// {
//     if(Matrix.matrixToRow(Matrix1,3,3)[i]==vector5[i])a++;
// }
// if(a==3)console.log("matrixToRow = OK");
// else console.log("matrixToRow = WARNING");
// a=0;
//
// for(var i=0;i<vector6.length;i++)
// {
//     if(Matrix.extractRow(Matrix1,1,3)[i]==vector6[i])a++;
// }
// if(a==3)console.log("matrixToRow = OK");
// else console.log("matrixToRow = WARNING");
// a=0;
//
// var Matdiag= Matrix.diagMatrix(vector1);
// var arrayMatdiag = Matdiag.to2DArray();
//
// for(var i=0;i<3;i++)
// {
//     for(var j=0;j<3;j++)
//     {
//         if(arrayMatdiag[i][j]==Matrix6[i][j])a++;
//     }
// }
// if(a==9)console.log("diagMatrix = OK");
// else console.log("diagMatrix= WARNING");
// a=0;
//
// for(var i=0;i<2;i++)
// {
//     for(var j=0;j<2;j++)
//     {
//         if(Matrix.extractSubmatrix(Matrix1,3,1,1)[i][j]==Matrix7[i][j])a++;
//     }
// }
// if(a==4)console.log("extractSubmatrix = OK");
// else console.log("extractSubmatrix= WARNING");
// a=0;
//
//
// if(Matrix.sumVector(vector1)==6) console.log("sumVector = OK");
// else console.log("sumVector = WARNING");
// a=0;
//
// for(var i=0;i<3;i++)
// {
//     for(var j=0;j<3;j++)
//     {
//         if(Matrix.transpMatrix(Matrix1,3,3)[i][j]==Matrix8[i][j])a++;
//     }
// }
// if(a==9)console.log("transpMatrix = OK");
// else console.log("transMatrix WARNING");
// a=0;
//
// for(var i=0;i<3;i++)
// {
//     for(var j=0;j<3;j++)
//     {
//         if(Matrix.multiplicationMatrix(Matrix1,Matrix2,3,3,3)[i][j]==Matrix9[i][j])a++;
//
//     }
// }
// if(a==9)console.log("multiplicationMatrix = OK");
// else console.log("multiplicationMatrix WARNING");
// a=0;
//
//
// for(var i=0;i<vector6.length;i++)
// {
//     if(Matrix.multiVectorToMatrix(vector1,Matrix1,3)[i]==vector7[i])a++;
// }
// if(a==3)console.log("multiVectorToMatrix = OK");
// else console.log("multiVectorToMatrix = WARNING");
// a=0;
//
// for(var i=0;i<vector6.length;i++)
// {
//     if(Matrix.sumRowMatrix(Matrix1,3,3)[i]==vector8[i])a++;
//
// }
// if(a==3)console.log("sumRowMatrix = OK");
// else console.log("sumRowMatrix = WARNING");
// a=0;
//
// for(var i=0;i<vector6.length;i++)
// {
//     if(Matrix.sumVectors(vector1,vector2)[i]==vector9[i])a++;
//
// }
// if(a==3)console.log("sumVectors = OK");
// else console.log("sumVectors = WARNING");
//
// a=0;
//
// if(Matrix.testComponentNeg(vector6)==1 &&Matrix.testComponentNeg(vector7)==0)console.log("testcomponentNeg = OK");
// else console.log("testcomponentNeg = WARNING");
//
// for(var i=0;i<vector10.length;i++)
// {
//     if(Matrix.multiplyScalarVector(2,vector1)[i]==vector10[i])a++;
//
//
// }
// if(a==3)console.log("multiplyScalarVector = OK");
// else console.log("multiplyScalarVector = WARNING");
//
// if(Matrix.detMatrix(Matrix1,3)==5)console.log("detMatrix = OK");
// else console.log("detMatrix = WARNING");
//
// a=0;
// var inverseMatrice = Matrix.inverseMatrix(Matrix1,3);
//
// var multi=Matrix.multiplicationMatrix(Matrix1,inverseMatrice,3,3,3);
// console.log(multi);
// for(var i=0;i<3;i++)
// {
//     for(var j=0;j<3;j++)
//     {
//         if(i==j && multi[i][j]==1)a++;
//         if(i!=j && multi[i][j]==0)a++;
//
//     }
// }
//
// if(a==9)console.log("inverseMatrice = OK");
// else console.log("inverseMatrice = WARNING");
// a=0;
// for(var t=0; t<3; t++)
// {
//     if(Matrix.distanceVectors(vector1,vector2)==Math.sqrt(10))a++;
//     console.log(Matrix.distanceVectors(vector1,vector2));
// }
// if(a==1)console.log("DistanceVector = OK");
// else console.log("DistanceVector = Warning");
//
//
    