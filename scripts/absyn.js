/* global SLang : true */

(function (){

"use strict";

var exports = {};

function createProgram(e) {
    return ["Program", e]; 
}
function isProgram(e) { 
    return e[0] === "Program"; 
}
function getProgramExp(e) { 
    if (isProgram(e)) {
        return e[1];
    } else {
        throw new Error("Interpreter error: "  +
                        "The argument of getProgramExp is not a program.");
    }
}                                      
function createVarExp(v) { 
    return ["VarExp", v]; 
}
function isVarExp(e) { 
    return e[0] === "VarExp"; 
}
function getVarExpId(e) { 
    if (isVarExp(e)) {
        return e[1];
    } else {
        throw new Error("Interpreter error: "  +
                        "The argument of getVarExpId is not a VarExp.");
    }
}
function createIntExp(n) {
    return ["IntExp", parseInt(n)];
}
function isIntExp(e) { 
    return e[0] === "IntExp"; 
}
function getIntExpValue(e) { 
    if (isIntExp(e)) {
        return e[1];
    } else {
        throw new Error("Interpreter error: "  +
                        "The argument of getIntExpValue is not an IntExp.");
    }
}
function createFnExp(params,body) {
    return ["FnExp",params,body];
}
function isFnExp(e) { 
    return e[0] === "FnExp"; 
}
function getFnExpParams(e) { 
    if (isFnExp(e)) {
        return e[1];
    } else {
        throw new Error("Interpreter error: "  +
                        "The argument of getFnExpParams is not an FnExp.");
    }
}
function getFnExpBody(e) { 
    if (isFnExp(e)) {
        return e[2];
    } else {
        throw new Error("Interpreter error: "  +
                        "The argument of getFnExpBody is not an FnExp.");
    }
}
function createAppExp(fn,args) {
    return ["AppExp",fn,args];
}
function isAppExp(e) { 
    return e[0] === "AppExp"; 
}
function getAppExpFn(e) { 
    if (isAppExp(e)) {
        return e[1];
    } else {
        throw new Error("Interpreter error: "  +
                        "The argument of getAppExpFn is not an AppExp.");
    }
}
function getAppExpArgs(e) { 
    if (isAppExp(e)) {
        return e[2].slice(1); // eliminate the first element (i.e., "args")
    } else {
        throw new Error("Interpreter error: "  +
                        "The argument of getAppExpArgs is not an AppExp.");
    }
}
function createPrim1AppExp(prim,arg) {
    return ["Prim1AppExp",prim,arg];
}
function isPrim1AppExp(e) { 
    return e[0] === "Prim1AppExp"; 
}
function getPrim1AppExpPrim(e) { 
    if (isPrim1AppExp(e)) {
        return e[1];
    } else {
        throw new Error("Interpreter error: The "  +
                        "argument of getPrim1AppExpPrim is not a Prim1AppExp.");
    }
}
function getPrim1AppExpArg(e) { 
    if (isPrim1AppExp(e)) {
        return [e[2]];
    } else {
        throw new Error("Interpreter error: The "  +
                        "argument of getPrim1AppExpArg is not a Prim1AppExp.");
    }
}
function createPrim2AppExp(prim,arg1,arg2) {
    return ["Prim2AppExp",prim,arg1,arg2];
}
function isPrim2AppExp(e) { 
    return e[0] === "Prim2AppExp"; 
}
function getPrim2AppExpPrim(e) { 
    if (isPrim2AppExp(e)) {
        return e[1];
    } else {
        throw new Error("Interpreter error: The "  +
                        "argument of getPrim2AppExpPrim is not a Prim2AppExp.");
    }
}
function getPrim2AppExpArgs(e) { 
    if (isPrim2AppExp(e)) {
        return [e[2],e[3]];
    } else {
        throw new Error("Interpreter error: The "  +
                        "argument of getPrim2AppExpArgs is not a Prim2AppExp.");
    }
}

//Problem 2
    function createBoolExp(b) { 
        return ["BoolExp", b]; 
    }
    function isBoolExp(e) { 
        return e[0] === "BoolExp"; 
    }
    function getBoolExpValue(e) { 
        if (isBoolExp(e)) {
            return e[1];
        } else {
            throw new Error("Interpreter error: "  +
                            "The argument of getBoolExpValue is not a BoolExp.");
        }
    }

exports.createProgram = createProgram;
exports.isProgram = isProgram;
exports.getProgramExp = getProgramExp;
exports.createVarExp = createVarExp;
exports.isVarExp = isVarExp;
exports.getVarExpId = getVarExpId;
exports.createIntExp = createIntExp;
exports.isIntExp = isIntExp;
exports.getIntExpValue = getIntExpValue;
exports.createFnExp = createFnExp;
exports.isFnExp = isFnExp;
exports.getFnExpParams = getFnExpParams;
exports.getFnExpBody = getFnExpBody;
exports.createAppExp = createAppExp;
exports.isAppExp = isAppExp;
exports.getAppExpFn = getAppExpFn;
exports.getAppExpArgs = getAppExpArgs;
exports.createPrim1AppExp = createPrim1AppExp;
exports.isPrim1AppExp = isPrim1AppExp;
exports.getPrim1AppExpPrim = getPrim1AppExpPrim;
exports.getPrim1AppExpArg = getPrim1AppExpArg;
exports.createPrim2AppExp = createPrim2AppExp;
exports.isPrim2AppExp = isPrim2AppExp;
exports.getPrim2AppExpPrim = getPrim2AppExpPrim;
exports.getPrim2AppExpArgs = getPrim2AppExpArgs;
exports.createBoolExp = createBoolExp;
exports.isBoolExp = isBoolExp;
exports.getBoolExpValue = getBoolExpValue;    

window.SLang.absyn = exports;
}());
