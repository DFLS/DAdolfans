/* 
 * DAdolfans  By Losses Don
 * You can use the code under CC BY-SA 3.0. * 
 */

var regex = {
        tagsReg: function (data) {
            //清理标签属性正则
            var tagsCleanExpression = new RegExp("<(span|p|div|h[1-6]|b|i|s|ul|li|td|tr)[\\s\\S]*?>", "gm");
            //M$ Office 你创造了狠多奇怪的标签你造么
            var tagsRemoveExpression = new RegExp("<!.*?>|<o:.*?><meta.*?>|</o.*?>|<body>|<html>|</body>|</html>", "g");
            //获取文档内容
            var dataOri = data;
            //进行正则替换
            var dataReg = dataOri.replace(tagsRemoveExpression, "");
            var dataReg = dataReg.replace(tagsCleanExpression, '<$1>');
            //将文档内容回填至编辑框
            return dataReg;
        },
        plainTextToHTML: function (data) {
            var blankLine = new RegExp("\\n[\\s|]*\\r", "g");
            var newLineMark = new RegExp('\n|\r|(\r\n)|(\u0085)|(\u2028)|(\u2029)', "g");
            var duoBr = new RegExp('<br /><br />', "g");
            var dataReg = data.replace(blankLine, '');
            var dataReg = dataReg.replace(newLineMark, '<br />');
            var dataReg = dataReg.replace(duoBr, '<br />');
            return dataReg;
        },
        HTMLToMarkdown: function (nodes) {
            var footer = {link: [], image: []};
            var _CACHE_ = {imageLength: 0};
            var rule = {
                transform: {
                    sup: "^({{(!}})",
                    sub: "_({{(!}})",
                    kbd: "[{{(!}}]",
                    rt: "({{(!}})",
                    label: "{{(!}}:",
                    button: "[{{(!}}]",
                    command: "[{{(!}}]",
                    dd: "({{(!}})",
                    legend: "-[{{(!}}]-",
                    div: "\n\n{{(!}}\n\n",
                    p: "\n\n{{(!}}\n\n",
                    frame: "\n\nframe:[{{src}}]\n\n",
                    br: "\n\n",
                    time: "{{(!}}({{datetime}}{{pubtime}})",
                    input: "{{placeholder}}:[__________]",
                    textarea: "[___....___]",
                    abbr: "{{(!}}({{title}})",
                    acronym: "{{(!}}({{title}})",
                    hr: "\n\n****************************************\n\n",
                    //markdown grammar
                    ins: "**{{(!}}**",
                    u: "**{{(!}}**",
                    b: "**{{(!}}**",
                    em: "**{{(!}}**",
                    mark: "**{{(!}}**",
                    strong: "**{{(!}}**",
                    summary: "**{{(!}}**",
                    address: "_{{(!}}_",
                    cite: "_{{(!}}_",
                    i: "_{{(!}}_",
                    del: "~~{{(!}}~~",
                    s: "~~{{(!}}~~",
                    strike: "~~{{(!}}~~",
                    h1: "\n\n#{{(!}}\n\n",
                    h2: "\n\n##{{(!}}\n\n",
                    h3: "\n\n###{{(!}}\n\n",
                    h4: "\n\n####{{(!}}\n\n",
                    h5: "\n\n#####{{(!}}\n\n",
                    h6: "\n\n######{{(!}}\n\n",
                    //processing function
                    bdo: function (node) {
                        var dirAttrib = node.getAttribute("dir"),
                            nodeValue = node.innerHTML;

                        if (dirAttrib === "rtl") {
                            var output = "";

                            for (var i = 0; i < nodeValue.length; i++) {
                                output += nodeValue[nodeValue.length - 1 - i];
                            }

                            return output;
                        } else
                            return nodeValue;
                    },
                    audio: function (node) {
                        var srcAttrib = node.getAttribute("src"),
                            nodeValue = node.childNodes(),
                            src = false;

                        if (srcAttrib)
                            src = srcAttrib;
                        else if (nodeValue
                            && nodeValue[0].nodeName === "SOURCE"
                            && nodeValue[0].getAttribute("src"))
                            src = nodeValue[0].getAttribute("src");

                        if (src)
                            return "Video:[" + src + "]";
                        else
                            return "[Video]";
                    },
                    video: function (node) {
                        return rule.audio(node);
                    },
                    progress: function (node) {
                        var maxAttrib = node.getAttribute("max"),
                            minAttrib = node.getAttribute("min"),
                            value = node.getAttribute("value"),
                            base = 1,
                            percent = 0,
                            leave = 10,
                            output = "";

                        if (minAttrib)
                            base = maxAttrib - minAttrib;
                        else
                            base = maxAttrib;

                        percent = Math.ceil((value / base) * 10);
                        leave = 10 - percent;

                        output = "[";
                        for (var i = 0; i < percent; i++)
                            output += "|";
                        for (var i = 0; i < leave; i++)
                            output += "_";
                        output += "]";

                        return output;
                    },
                    meter: function (node) {
                        return rule.transform.progress(node);
                    },
                    a: function (node) {
                        var hrefAttrib = node.getAttribute("href"),
                            titleAttrib = node.getAttribute("title"),
                            nodeValue = takeParter(node.childNodes);

                        if (hrefAttrib) {
                            footer.link.push([hrefAttrib, titleAttrib]);
                            return "[" + nodeValue + "]" + "[L" + footer.link.length + "]";
                        }
                    },
                    img: function (node) {
                        var srcAttrib = node.getAttribute("src"),
                            altAttrib = node.getAttribute("alt") | "image",
                            imageBase64;

                        if (srcAttrib) {
                            if (srcAttrib.match("data:image")) {
                                imageBase64 = srcAttrib;

                                footer.image.push([imageBase64, altAttrib]);

                                return "![G" + footer.image.length + "]" + "[" + altAttrib + "]";
                            } else {
                                Adolfans.download(srcAttrib, false, function (event) {
                                    if (event) {
                                        var bitmap = fs.readFileSync(event.path);
                                        imageBase64 = "data:image;base64," + new Buffer(bitmap).toString('base64');
                                    } else {
                                        imageBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAlCAYAAADMdYB" +
                                        "5AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lm" +
                                        "lua3NjYXBlLm9yZ5vuPBoAAAJvSURBVFiF7djfS5NRHMfx99nzzA2cYkw2dAu7CCUh8jopheoiyWFeG" +
                                        "m6W1lU2hC7DVLqIbkLBu7KcXnVTUfPHpLrI+hvCsB4Nf8BQ5kDYcs9zuqgnqa0U3J662OfyfM8539fF" +
                                        "Oc+BR1wPhwNIMShAYH3S0hA9qpBiDHD/AwAAwsZ9FYGKJK1n7EesbG63fz1qSPEWpKqag6Oj99atRPT" +
                                        "23qwQNh0A9fdiONw3BJTvfzvjyfDw8PuDgLIQEq4B3kMVFSS2tpBSZi0qLS0FYHt7G4nyATgQwpZr0O" +
                                        "PxMDDQz+WuUFbN7XZzu/8W1652H6Tv3ohkMkkikaCh4QSNjSd3J9tsdIU6cTqdaNpSYRGpVIrIxCRSS" +
                                        "tovtuH1egFoaTlPTU0Nq6trvHgZLSwCYHHxE7HYHHa7na5QkLq6Ws6dPcPOzg7j4xEymUzhEQDTM7No" +
                                        "2hI+XzU93VcQQvD02XPW1vN7m/+KMAyD8cgEuq7jcDjQNI35+Xd5BeyJAKirrUVRFAAqKyspK3NZi/B" +
                                        "6PbS3tyGlZGHhIy6Xi0sdHQiR37fujwhFUQgFg5SUlPDq9RsePBxjY2OD+vpjNJ0+ZQ0i0HoBv9/H8v" +
                                        "IXotGp79c2MolhGAQCrfh81YVFHPb7aW5uIp1O/zyYAJ81jZnZGKqqEgp25g2R9XYAGFKyublJdGqae" +
                                        "Dz+Sy0Wm6O6qory8rLCIlZWVhgcupNzgWEYjD16nDdAboTUj+u6U9nvBg5HZivviJGRkXiuiYXMnh8r" +
                                        "K1JEmCkizBQRZooIM0WEmSLCzH+BMJ9yx41wX8rKxsK2+3vKhsEASEsBPyKBpEDc/QY0n8f3E8QeKgA" +
                                        "AAABJRU5ErkJggg==";
                                    }

                                    footer.image.push([imageBase64, altAttrib]);
                                });

                                _CACHE_.imageLength++;

                                return "![G" + _CACHE_.imageLength + "]" + "[" + altAttrib + "]";
                            }
                        }
                    },
                    listItem: function (node) {
                        var ifListNeedOrder = (node.nodeName === "OL") /*nxt line*/
                            , result = '' /*nxt line*/
                            , childNodes = node.childNodes /*nxt line*/
                            , count = 1;

                        function getCount() {
                            if (ifListNeedOrder)
                                return count++ + ". ";
                            else
                                return "* ";
                        }

                        for (var x = 0; x < childNodes.length; x++) {
                            if (node.childNodes[x].nodeName.match(/LI|OL|UL|OPTGROUP|OPTION|DT/)) {
                                result += getCount() + takeParter(node.childNodes[x].childNodes) + "\n";
                            }
                        }

                        result += "\n";

                        return result;
                    },
                    quoteItem: function (node) {
                        var resultValue = makeUp(takeParter(node.childNodes));

                        resultValue = resultValue.replace(/\n/g, "\n>");

                        resultValue = ">" + resultValue;

                        return resultValue;
                    }
                },
                remove: {
                    "!DOCTYPE": "",
                    applet: "",
                    area: "",
                    base: "",
                    basefont: "",
                    canvas: "",
                    col: "",
                    colgroup: "",
                    embed: "",
                    keygen: "",
                    link: "",
                    meta: "",
                    noframe: "",
                    noscript: "",
                    object: "",
                    param: "",
                    script: "",
                    source: "",
                    stype: "",
                    title: "",
                    track: "",
                    frameset: "",
                    head: "",
                    map: "",
                    menuitem: ""
                }
            };

            function clearBlank(thisValue) {
                //此函数用于清理由webkit产生的文本节点前方和后方的空格
                var i, j;
                //从前往后
                for (i = 0; i < thisValue.length; i++) {
                    if (!thisValue[i].match(/\s/))
                        break
                }
                //从后往前
                for (j = 0; i < thisValue.length; j++) {
                    if (!thisValue[thisValue.length - 1 - j].match(/\s/))
                        break
                }

                if (i !== 0)
                    thisValue = " " + thisValue.substring(i, thisValue.length);

                if (j !== 0)
                    thisValue = thisValue.substring(0, thisValue.length - j) + " ";

                return thisValue;
            }

            function makeUp(thisValue) {
                return thisValue.replace(/(\n\s*)+/g, "\n\n");
            }

            function processer(nodes) {
                //console.log("---");
                //console.log(nodes);
                var nodeName = nodes.nodeName.toLowerCase(),
                    nodeValue = "";

                if (nodes.childNodes.length === 1
                    && nodes.childNodes[0].nodeType === 3) {
                    nodeValue = nodes.innerHTML;
                }
                else if (nodes.nodeType === 3) {
                    nodeValue = clearBlank(nodes.nodeValue);
                }
                else if (nodes.nodeName.match(/OL|UL|MENU|NAV|SELECT|OPTGROUP|DL|DIR|DATALIST/)) {
                    //拦截
                    nodeValue = rule.transform.listItem(nodes);
                }
                else if (nodes.nodeName === "BLOCKQUOTE") {
                    nodeValue = rule.transform.quoteItem(nodes);
                }
                else {
                    nodeValue = takeParter(nodes.childNodes);
                }

                if (rule.remove[nodeName] !== undefined)
                    return "";
                else {
                    if (rule.transform[nodeName] !== undefined) {
                        if (typeof(rule.transform[nodeName]) === "function") {
                            return rule.transform[nodeName](nodes);
                        } else {
                            //处理有规则的元素节点
                            var thisRule = rule.transform[nodeName];
                            return thisRule.replace("{{(!}}", nodeValue);
                        }
                    } else {// 处理无规则的元素节点或文本节点
                        return nodeValue;
                    }
                }
            }

            function takeParter(nodes) {
                //console.log("~~~");
                //console.log(nodes);
                var result = "";

                for (var i = 0; i < nodes.length; i++) {
                    result += processer(nodes[i]);
                }

                return result;
            }


            function processTable() {

            }

            var bodyResult = makeUp(processer(nodes)) /*nxt line*/
                , dtCount;

            var footerResult = "\n\n";
            for (var z in footer.link) {
                dtCount = parseInt(z) + 1;
                footerResult += "[L" + dtCount + "]: " + footer.link[z][0];

                if (footer.link[z][1]) {
                    footerResult += "     \"" + footer.link[z][1] + "\"";
                }

                footerResult += "\n\n";
            }

            var imageDownloadWaiter = setInterval(function () {
                if (footer.image.length === _CACHE_.imageLength) {

                    console.log(footer.image.length, _CACHE_.imageLength, footer.image);
                    for (var g in footer.image) {
                        dtCount = parseInt(g) + 1;
                        footerResult += "[G" + dtCount + "]: " + footer.image[g][0];

                        if (footer.image[g][1]) {
                            footerResult += "     \"" + footer.image[g][1] + "\"";
                        }

                        footerResult += "\n\n";
                    }

                    clearInterval(imageDownloadWaiter);

                    return (bodyResult + footerResult);
                }
            }, 20);
        },
        FileURl: function (data) {
            //判断是否是*Unix操作系统
            if (data.substr(0, 1) === "/")
                separator = "/";//*Unix操作系统
            else
                separator = "\\";//Windows操作系统
            var filePathArray = data.split(separator);
            return filePathArray[filePathArray.length - 1];
        },
        formatClipboard: function () {
            var clipboardData = clipboard.get('text');
            return regex.plainTextToHTML(clipboardData);
        },
        randomNum: function (length) {
            var chars = '0123456789abcdefghiklmnopqrstuvwxyz!@#$%^&()_-=+'.split(''),
                randString = '';

            if (!length) {
                length = Math.floor(Math.random() * chars.length);
            }

            for (var i = 0; i < length; i++) {
                randString += chars[Math.floor(Math.random() * chars.length)];
            }

            return randString;
        }
    }
    ;
