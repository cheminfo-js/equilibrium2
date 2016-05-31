'use strict';

const Matrix = require('../src/util/matrix');
const Matrixlm = require('ml-matrix');

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
var Matrix10=[[1, 0],[0, 1]];
var Matrix11=[[1, 2, 0],[-1, 2, 3],[1, 3, 2],[-2, 3, 0],[1, 3, 2],[0, 2, 2]];
var Matrix12=[[1, 2, 0, -2, 3, 0],[-1, 2, 3, 1, 3, 2],[1, 3, 2, 0, 2, 2]];
var vector3=[-1,-3,0];
var vector4=[2,10,9];
var vector5=[-1,12,0];
var vector6=[-1,2,3];
var vector7=[2,15,12];
var vector8=[3,4,6];
var vector9=[3,7,6];
var vector10=[2,4,6];
var vector11=[1,2,3];
var vector12=[6,12,18];
var vector13=[-1, 0];
var vector14=[1, 2, 3, 4 ,5 ,6];
var vector15=[0 , 2, 3];
var vector16=[2, 5, 6];

describe('Matrix', function () {
    it('Substract vector', function () {
        var sub = Matrix.substractVector(vector1, vector2);
        sub.should.deepEqual(vector3);
    });
    it('Multiplication vector', function () {
        var multi = Matrix.multiVector(vector1, vector2);
        multi.should.deepEqual(vector4);
    });
    it('multiplication Matrix', function () {
        var multiMat = Matrix.multiMatrix(Matrix1,Matrix2,3,3);
        multiMat.should.deepEqual(Matrix3);
    });
    it('Pow Matrix', function () {
        var powMat = Matrix.powMatrix(Matrix1,Matrix2,3,3);
        powMat.should.deepEqual(Matrix4);
    });
    it('Row to Matrix', function () {
        var rowToMat = Matrix.rowToMatrix(vector1,3);
        rowToMat.should.deepEqual(Matrix5);
    });
    it('Matrix to Row', function () {
        var matToRow = Matrix.matrixToRow(Matrix1,3,3);
        matToRow.should.deepEqual(vector5);
    });
    it('Extract row', function () {
        var multiMat = Matrix.multiMatrix(Matrix1,Matrix2,3,3);
        multiMat.should.deepEqual(Matrix3);
    });
    it('Diag Matrix', function () {
        var Mat= new Matrixlm(3,3);
        Mat = Matrix.diagonalMatrix(vector1);
        var arrayMatdiag = Mat.to2DArray();
        arrayMatdiag.should.deepEqual(Matrix6);
    });
    it('Extract SubMatrix', function () {
        var subMat = Matrix.extractSubmatrix(Matrix1,3,1,1);
        subMat.should.deepEqual(Matrix7);
    });
    it('Summ Vector', function () {
        var summVector = Matrix.sumVector(vector1);
        summVector.should.deepEqual(6);
    });
    it('Transpose Matrix', function () {
        var transpMat = Matrix.transposeMatrix(Matrix1,3,3);
        transpMat.should.deepEqual(Matrix8);
    });
    it('Multiplication Matricielle', function () {
        var multiMat = Matrix.multiplicationMatrix(Matrix1,Matrix2,3,3,3);
        multiMat.should.deepEqual(Matrix9);
    });
    it('Multi Vector To Matrix', function () {
        var vec = Matrix.multiVectorToMatrix(vector1,Matrix1,3);
        vec.should.deepEqual(vector7);
    });
    it('Summ Row Matrix', function () {
        var sum = Matrix.sumRowMatrix(Matrix1,3,3);
        sum.should.deepEqual(vector8);
    });
    it('Summ Vectors', function () {
        var sumVectors = Matrix.sumVectors(vector1,vector2);
        sumVectors.should.deepEqual(vector9);
    });
    it('Test component Negative', function () {
        var test1=Matrix.testComponentNeg(vector6);
        var test2=Matrix.testComponentNeg(vector7);
        test1.should.deepEqual(true);
        test2.should.deepEqual(false);
    });
    it('Multiplication Matrix to Vector', function () {
        var multi = Matrix.multiMatrixToVector(Matrix5, vector1, 3);
        multi.should.deepEqual(vector12);
    });   
    it('Multiplication Scalar to Vector', function () {
        var multi = Matrix.multiplyScalarVector(2,vector1);
        multi.should.deepEqual(vector10);
    });
    it('determinant Matrix', function () {
        var det = Matrix.detMatrix(Matrix1,3);
        det.should.deepEqual(5);
    });
    it('absolute Vector', function () {
        var abs = Matrix.absVector(vector6);
        abs.should.deepEqual(vector11);
    });
    it('creation Identity Matrix', function () {
        var identity = Matrix.creationIdentityMatrix(2);
        identity.should.deepEqual(Matrix10);
    });
    it('paste two matrix', function(){
        var paste = Matrix.pasteTwoMatrix(Matrix1,Matrix2);
        paste.should.deepEqual(Matrix11);
    });
    it('paste two model', function(){
        var paste = Matrix.pasteTwoModel(Matrix1,Matrix2);
        paste.should.deepEqual(Matrix12);
    });
    it('delete one variable of an array', function(){
        var arrayDelete = Matrix.deleteOneVariableOfArray(1,vector3);
        arrayDelete.should.deepEqual(vector13);
    });
    it('delete collection of variables of an array', function(){
        var arrayDelete = Matrix.deleteCollectionofVariableOfArray(vector15,vector14);
        arrayDelete.should.deepEqual(vector16);
    });
    
    
}); 



