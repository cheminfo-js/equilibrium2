"use strict"
var table= require("./test.js");
var Matrix = require("ml").Matrix;
var matrix = new Matrix(3,3);
matrix.fill(2)
console.log(matrix);
console.log(table);