'use strict';
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

module.exports = {

    SubstractVector: function (vector1, vector2) {
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
        var matrice = require('ml-matrix');
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
        const Matrix = require('./Matrix');
        var determinant = 0;
        var signe = 1;
        var k = dim - 1;

        if (dim == 2) {

            return (matrice[0][0] * matrice[1][1] - matrice[0][1] * matrice[1][0]);

        }
        for (var i = 0; i < dim; i++) {

            var mat = Matrix.extractSubmatrix(matrice, dim, 0, i);
            determinant = determinant + signe * matrice[0][i] * Matrix.detMatrix(mat, k);
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

    distanceVectors: function (vector1, vector2) {
        const Matrix = require('./Matrix');
        var deltaVector = Matrix.SubstractVector(vector2, vector1);
        var distance = 0;
        for (var i = 0; i < vector1.length; i++) {
            distance = distance + deltaVector[i] * deltaVector[i];
        }
        return Math.sqrt(distance);
    },
    coordonneeMax: function (vector) {
        var tabCoordonneeMax = [];
        var Currentcoordonnee = 0;
        var numeroCoordonnee = 0;
        for (var i = 0; i < vector.length; i++) {
            if (vector[i] > Currentcoordonnee) {
                Currentcoordonnee = vector[i];
                numeroCoordonnee = i;
            }
        }
        tabCoordonneeMax[0] = Currentcoordonnee;
        tabCoordonneeMax[1] = numeroCoordonnee;
        return tabCoordonneeMax;
    },

    inverseMatrix: function (matrix, dimension) {
        var Matrix = require('./Matrix');
        var comMatrix = [];
        var signe = 1;
        var det_1 = 1 / Matrix.detMatrix(matrix, dimension);
        for (var i = 0; i < dimension; i++) {
            for (var j = 0; j < dimension; j++) {
                if (!comMatrix[i])comMatrix[i] = [];
                comMatrix[i][j] = signe * det_1 * Matrix.detMatrix(Matrix.extractSubmatrix(matrix, dimension, i, j), dimension - 1);
                signe = -signe;

            }
        }
        return Matrix.transposeMatrix(comMatrix, dimension, dimension);
    },
    unpush: function (symbole, vector) {
        var newVector = [];

        for (var i = 0; i < vector.length; i++) {
            var a = 0;
            for (var j = 0; j < symbole.length; j++) {
                if (vector[i][0] != symbole[j])a++;
            }
            if (a == symbole.length)newVector.push(vector[i]);
        }
        return newVector;
    },
    arraySplitting: function (Array, component) {
        var vector = [];
        for (var i = 0; i < Array.length; i++) {
            vector[i] = Array[i][component];
        }
        return vector;
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
    sumColomnMatrix: function (Matrix) {
        var vectorFinal = [];
        for (var i = 0; i < Matrix[i].length; i++) {
            vectorFinal[i] = 0;
            for (var j = 0; j < Matrix.length; j++) {
                vectorFinal[i] = vectorFinal[i] + Matrix[j][i];
            }
        }
        return vectorFinal;
    },
    powColomnMatrix: function (Matrix) {
        var vectorFinal = [];
        for (var i = 0; i < Matrix[i].length; i++) {
            vectorFinal[i] = 1;
            for (var j = 0; j < Matrix.length; j++) {
                vectorFinal[i] = vectorFinal[i] * Math.pow(Matrix[j][i], Matrix[j][i]);
            }
        }
        return vectorFinal;
    }
};








