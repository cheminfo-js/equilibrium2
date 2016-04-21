"use strict";
/*
SubstractVector(vec1,vec2)
multiVector(vec1,vec2)
multiMatrix(matrix1,matrix2,row,colomn)
powMatrix(matrix1,matrix2,row,colomn)
rowToMatrix(vector,row)
matrixToRow(matrix,colomn,row)
extractRow(matrix,row,colomn)
diagMatrix(vector)
extractSubmatrix(matrice,dimension,deleteRow,deleteColomn)
detMatrix(matrice,dim)
inverseMatrix(matrix,dimension)
transpMatrix(matrix,row,colomn)
multiplicationMatrix(matrix1,matrix2,rowMatrix1,colomnMatrix2,colomnMatrix1)
multiVectorToMatrix(vector,matrice,colomn)
sumRowMatrix(matrix,row,colomn)
sumVector(vector)

 */
//noinspection JSDuplicatedDeclaration
module.exports=
{

    SubstractVector: function (vec1, vec2) {
        var vec_final = [];
        for (var i = 0; i < vec1.length; i++) {
            vec_final[i] = vec1[i] - vec2[i];

        }
        return vec_final;
    },

    multiVector: function (vec1, vec2) {
        var vec_final = [];
        for (var i = 0; i < vec1.length; i++) {
            vec_final[i] = vec1[i] * vec2[i];
        }
        return vec_final;
    },

    multiMatrix: function (matrix1, matrix2, row, colomn) {
        var table_result = [];
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < colomn; j++) {
                if (!table_result[i]) table_result[i] = [];
                table_result[i][j] = matrix1[i][j] * matrix2[i][j];
            }
        }
        return table_result;
    },
    powMatrix: function (matrix1, matrix2, row, colomn) {
        var table_result = [];
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < colomn; j++) {
                if (!table_result[i]) table_result[i] = [];
                table_result[i][j] = Math.pow(matrix1[i][j], matrix2[i][j]);
            }
        }
        return table_result;
    },
    rowToMatrix: function (vector, row) {
        var matrix = [];
        for (var i = 0; i < vector.length; i++) {
            for (var j = 0; j < row; j++) {
                if (!matrix[i])matrix[i] = [];
                matrix[i][j] = vector[i];

            }

        }
        return matrix;
    },
    matrixToRow: function (matrix, colomn, row) {
        var vector = [];
        for (var i = 0; i < colomn; i++) {
            vector[i] = 1;
            for (var j = 0; j < row; j++) {
                vector[i] = vector[i] * matrix[j][i];
            }
        }
        return vector;
    },
    extractRow: function (matrice, row, colomn) {
        var vector = [];
        for (var i = 0; i < colomn; i++) {
            vector[i] = matrice[row][i];
        }
        return vector;
    },
    diagMatrix: function (vector) {
        var matrice = require("ml").Matrix;
        var matriceDiag = new matrice(vector.length, vector.length);
        for (var i = 0; i < vector.length; i++) {
            for (var j = 0; j < vector.length; j++) {
                if (!matriceDiag[i])matriceDiag[i] = [];
                if (i == j)matriceDiag.set(i, j, vector[i]);
                else matriceDiag.set(i, j, 0);
            }
        }
        return matriceDiag;
    },
    extractSubmatrix: function (matrice, dimension, deleteRow, deleteColomn) {
        var k = 0;
        var l = 0;
        var dimSub = dimension - 1;
        var subMatrice = [];
        subMatrice[0] = [];
        for (var i = 0; i < dimension; i++) {
            for (var j = 0; j < dimension; j++) {
                if (i == deleteRow || j == deleteColomn) {
                }
                else {
                    if (k >= dimSub) {
                        l++;
                        subMatrice[l] = [];
                        k = 0;
                    }

                    subMatrice[l][k] = matrice[i][j];
                    k++;
                }
            }

        }
        return subMatrice;
    },
    sumVector: function (vector) {
        var somme = 0;
        for (var i = 0; i < vector.length; i++) {
            somme = somme + vector[i];
        }
        return somme;
    },
    sumVectors: function(vector1,vector2){
     var vectorFinal =[];
        for(var i =0;i<vector1.length;i++)
        {
            vectorFinal[i]=vector1[i]+vector2[i];
        }
        return vectorFinal;
    },

    transpMatrix: function (matrix, row, colomn) {

        var tMatrix = [];
        for (var i = 0; i < row; i++) {
            tMatrix[i] = [];
            for (var j = 0; j < colomn; j++) {
                tMatrix[i][j] = matrix[j][i];
            }
        }
        return tMatrix;
    },
    multiplicationMatrix: function (matrix1, matrix2, rowMatrix1, colomnMatrix2, colomnMatrix1) {
        var multMatrice = [];
        for (var i = 0; i < rowMatrix1; i++) {
            for (var j = 0; j < colomnMatrix2; j++) {
                if (!multMatrice[i])multMatrice[i] = [];
                multMatrice[i][j] = 0;
                for (var k = 0; k < colomnMatrix1; k++) {
                    multMatrice[i][j] = multMatrice[i][j] + (matrix1[i][k] * matrix2[k][j]);

                }

            }
        }
        return multMatrice;
    },
    multiVectorToMatrix: function (vector, matrice, colomn) {
        var vectorResult = [];

        for (var j = 0; j < colomn; j++) {
            vectorResult[j] = 0;
            for (var k = 0; k < vector.length; k++) {
                vectorResult[j] = vectorResult[j] + (vector[k] * matrice[k][j]);

            }
        }
        return vectorResult;
    },
    sumRowMatrix: function (matrix, row, colomn) {
        var sum = [];
        for (var i = 0; i < row; i++) {
            sum[i] = 0;

            for (var j = 0; j < colomn; j++) {
                sum[i] = sum[i] + matrix[i][j];

            }
        }
        return sum;
    },

    testComponentNeg:function(vector)
    {
        var boolean=false;
        for(var i=0;i<vector.length;i++)
        {
            if(vector[i]<0)boolean=true;
        }
        return boolean;
    },

    multiplyScalarVector: function(scalar,vector)
    {
        var vectorfinal=[];
        for(var i=0;i<vector.length;i++)
        {
           vectorfinal[i]=vector[i]*scalar;

        }
        return vectorfinal;
    },

    
    detMatrix: function(matrice, dim) {
    var determinant = 0;
    var signe = 1;
    var k = dim - 1;

    if (dim == 2) {

    return (matrice[0][0] * matrice[1][1] - matrice[0][1] * matrice[1][0]);

 }
    for (var i = 0; i < dim; i++) {

    var mat = require("./Matrix.js").extractSubmatrix(matrice, dim, 0, i);
    determinant = determinant + signe * matrice[0][i] * require("./Matrix.js").detMatrix(mat, k);
    signe = -signe;
    }

 return determinant;
 }, 

    inverseMatrix: function(matrix, dimension) {
    var comMatrix = [];
    var signe = 1;
    var det_1 = 1 / require("./Matrix.js").detMatrix(matrix, dimension);
    for (var i = 0; i < dimension; i++) {
    for (var j = 0; j < dimension; j++) {
    if (!comMatrix[i])comMatrix[i] = [];
    comMatrix[i][j] = signe * det_1 * require("./Matrix.js").detMatrix( require("./Matrix.js").extractSubmatrix(matrix, dimension, i, j), dimension - 1);
    signe = -signe;

 }
 }
  return require("./Matrix.js").transpMatrix(comMatrix, dimension, dimension);
 
 },
    absVector: function(vector){
        var newVector=[];

        for(var i=0;i<vector.length;i++)
        {
            newVector[i]=Math.abs(vector[i]);
        }
        return newVector;
    },
    
    distanceVectors: function(vector1,vector2)
    {
        var deltaVector= require("./Matrix.js").SubstractVector(vector2,vector1);
        var distance=0;
        for(var i =0;i<vector1.length;i++)
        {
         distance =distance+deltaVector[i]*deltaVector[i];
        }
        return Math.sqrt(distance);
    }

};








