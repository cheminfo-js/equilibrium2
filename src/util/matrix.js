'use strict';
/*
 substractVector(vec1,vec2)
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

var matrice = require('ml-matrix');

module.exports = {
    substractVector: function (vector1, vector2) {
        var vectorFinal = [];
        for (var i = 0; i < vector1.length; i++) {
            vectorFinal[i] = vector1[i] - vector2[i];

        }
        return vectorFinal;
    },

    multiVector: function (vector1, vector2) {
        var vectorFinal = [];
        for (var i = 0; i < vector1.length; i++) {
            vectorFinal[i] = vector1[i] * vector2[i];
        }
        return vectorFinal;
    },

    multiMatrix: function (matrix1, matrix2, row, colomn) {
        var matrixResult = [];
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < colomn; j++) {
                if (!matrixResult[i]) matrixResult[i] = [];
                matrixResult[i][j] = matrix1[i][j] * matrix2[i][j];
            }
        }
        return matrixResult;
    },
    powMatrix: function (matrix1, matrix2, row, colomn) {
        var matrixResult = [];
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < colomn; j++) {
                if (!matrixResult[i]) matrixResult[i] = [];
                matrixResult[i][j] = Math.pow(matrix1[i][j], matrix2[i][j]);
            }
        }
        return matrixResult;
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
    extractRow: function (matrix, row, colomn) {
        var vector = [];
        for (var i = 0; i < colomn; i++) {
            vector[i] = matrix[row][i];
        }
        return vector;
    },
    diagonalMatrix: function (vector) {
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
                if (i !== deleteRow && j !== deleteColomn) {
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
    sumVectors: function (vector1, vector2) {
        var vectorFinal = [];
        for (var i = 0; i < vector1.length; i++) {
            vectorFinal[i] = vector1[i] + vector2[i];
        }
        return vectorFinal;
    },

    transposeMatrix: function (matrix, row, colomn) {

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
    multiMatrixToVector: function (matrix, vector, row) {
        var vectorResult = [];
        for (var j = 0; j < row; j++) {
            vectorResult[j] = 0;
            for (var k = 0; k < vector.length; k++) {
                vectorResult[j] = vectorResult[j] + (matrix[j][k] * vector[k]);
            }
        }
        return vectorResult;


    },
    multiVectorToMatrix: function (vector, matrix, colomn) {
        var vectorResult = [];

        for (var j = 0; j < colomn; j++) {
            vectorResult[j] = 0;
            for (var k = 0; k < vector.length; k++) {
                vectorResult[j] = vectorResult[j] + (vector[k] * matrix[k][j]);

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

    testComponentNeg: function (vector) {
        var boolean = false;
        for (var i = 0; i < vector.length; i++) {
            if (vector[i] < 0)boolean = true;
        }
        return boolean;
    },

    multiplyScalarVector: function (scalar, vector) {
        var vectorfinal = [];
        for (var i = 0; i < vector.length; i++) {
            vectorfinal[i] = vector[i] * scalar;
        }
        return vectorfinal;
    },


    detMatrix: function (matrice, dim) {
        var determinant = 0;
        var signe = 1;
        var k = dim - 1;

        if (dim == 2) {

            return (matrice[0][0] * matrice[1][1] - matrice[0][1] * matrice[1][0]);

        }
        for (var i = 0; i < dim; i++) {

            var mat = module.exports.extractSubmatrix(matrice, dim, 0, i);
            determinant = determinant + signe * matrice[0][i] * module.exports.detMatrix(mat, k);
            signe = -signe;
        }

        return determinant;
    },

    absVector: function (vector) {
        var newVector = [];

        for (var i = 0; i < vector.length; i++) {
            newVector[i] = Math.abs(vector[i]);
        }
        return newVector;
    },

    creationIdentityMatrix: function (numberRow) {
        var Matrix = [];
        for (var i = 0; i < numberRow; i++) {
            for (var j = 0; j < numberRow; j++) {
                if (!Matrix[i])Matrix[i] = [];
                if (i === j)Matrix[i][j] = 1;
                else Matrix[i][j] = 0;
            }
        }
        return Matrix;
    },
    pasteTwoMatrix: function (Matrix1, Matrix2) {
        var newMatrix = [];
        for (var i = 0; i < Matrix1.length + Matrix2.length; i++) {
            for (var j = 0; j < Matrix1.length; j++) {
                if (!newMatrix[i])newMatrix[i] = [];
                if (i < Matrix1.length)newMatrix[i][j] = Matrix1[i][j];
                else newMatrix[i][j] = Matrix2[i - Matrix1.length][j];

            }
        }
        return newMatrix;
    },
    pasteTwoModel: function (Model1, Model2) {
        var newMatrix = [];

        for (var i = 0; i < Model1.length; i++) {
            for (var j = 0; j < Model1[i].length + Model2[0].length; j++) {
                if (!newMatrix[i])newMatrix[i] = [];
                if (j < Model1[i].length)newMatrix[i][j] = Model1[i][j];
                else {
                    newMatrix[i][j] = Model2[i][j - Model1[i].length];
                }

            }
        }
        return newMatrix;
    },

    deleteOneVariableOfArray: function (place, array) {
        var newArray = [];
        for (var i = 0; i < array.length; i++) {
            if (i != place)newArray.push(array[i]);
        }
        return newArray;
    },
    deleteCollectionofVariableOfArray: function (arrayDelete, array) {

        var newArray = [];
        var k = 0;

        for (var i = 0; i < array.length; i++) {
            if (i != arrayDelete[k])newArray.push(array[i]);
            else k++;
        }
        return newArray;
    },
    
};









