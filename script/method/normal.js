/* 
 * DAdolfans  By Losses Don
 * You can use the code under CC BY-SA 3.0. * 
 */

//开始调用node.js库
var fs = require('fs');
var eventEmitter = require('events').EventEmitter;
var emitter = new eventEmitter();
emitter.setMaxListeners(30);
//开始调用node-webkit库
var gui = require('nw.gui');
var win = gui.Window.get();
var clipboard = gui.Clipboard.get();
//变量初始化
var actionSwitch = [];
var documentChanged = false;
var documentIsFile = false;
var filePath = null;
var firstDocumentChange = true;
var documentSavedAction = false;
var screenPosition = [];
screenPosition.y = 0;
var arrorDraging = false;
var fullScreenTimeoutEvent;