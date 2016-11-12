function mycarousel() {
    var clientBrowser = {};
    function browserCheck() {
        var isSafari = !1
          , safariVer = 0
          , ieOpr = !1
          , oprVer = 0;
        var ua = window.navigator.userAgent;
        if (/OPR\/(\S+)/.test(ua)) {
            ieOpr = !0;
            oprVer = parseFloat(RegExp["$1"])
        } else {
            if (/Version\/(\S+)/.test(ua)) {
                isSafari = !0;
                safariVer = parseFloat(ua.match(RegExp["$1"]))
            }
        }
        return {
            isSafari: isSafari,
            safariVer: safariVer,
            ieOpr: ieOpr,
            oprVer: oprVer
        }
    }
    clientBrowser = browserCheck();
    $.fn.jcarousel = function(options) {
        var settings = {
            itemWidth: 50,
            showNum: 6,
            initIndex: 1,
            initCallback: function() {}
        };
        options = options || {};
        $.extend(settings, options);
        var jcarObj = this;
        var jcarLeft = 0;
        var jcarWidth = 0;
        var clipWidth = settings.showNum * settings.itemWidth;
        var itemCount = $("li", this).length;
        jcarWidth = itemCount * settings.itemWidth;
        var prevObj = new prevButton(this.parent().prev());
        if (itemCount > 5) {
            prevObj.setDisabled()
        } else {
            this.parent().prev().hide()
        }
        var nextObj = new nextButton(this.parent().next());
        if (itemCount > 5) {
            nextObj.setDisabled()
        } else {
            this.parent().next().hide()
        }
        jcarObj.width(jcarWidth).css("left", jcarLeft + "px");
        if (settings.initIndex > settings.showNum) {
            jcarLeft = (settings.initIndex - settings.showNum) * itemWidth;
            jcarObj.css("left", jcarLeft + "px")
        }
        if (jcarLeft < 0) {
            prevObj.setEnabled()
        }
        if (clipWidth - jcarLeft < jcarWidth) {
            nextObj.setEnabled()
        }
        jcarObj.show("fast", settings.initCallback);
        function prevButton(btnObj) {
            this.btn = btnObj;
            this.btn.show();
            this.setDisabled = function() {
                this.btn.attr("class", "ng-goods-btn prev ng-box-bg end").unbind()
            }
            ;
            this.setEnabled = function() {
                this.btn.attr("class", "ng-goods-btn prev ng-box-bg").unbind().bind("click", function() {
                    if (jcarLeft + settings.itemWidth <= 0) {
                        jcarLeft += settings.itemWidth;
                        jcarObj.animate({
                            left: jcarLeft + "px"
                        }, "fast", function() {
                            setBtnStatus()
                        })
                    }
                })
            }
        }
        function nextButton(btnObj) {
            this.btn = btnObj;
            this.btn.show();
            this.setDisabled = function() {
                this.btn.attr("class", "ng-goods-btn next ng-box-bg end").unbind()
            }
            ;
            this.setEnabled = function() {
                this.btn.attr("class", "ng-goods-btn next ng-box-bg").unbind().bind("click", function() {
                    if ((jcarLeft - settings.itemWidth + jcarWidth) >= clipWidth) {
                        jcarLeft -= settings.itemWidth;
                        jcarObj.animate({
                            left: jcarLeft + "px"
                        }, "fast", function() {
                            setBtnStatus()
                        })
                    }
                })
            }
        }
        function setBtnStatus() {
            if (jcarLeft < 0) {
                prevObj.setEnabled()
            } else {
                prevObj.setDisabled()
            }
            if (jcarLeft + jcarWidth > clipWidth) {
                nextObj.setEnabled()
            } else {
                nextObj.setDisabled()
            }
        }
    }
    ;
    function MouseEvent(e) {
        this.x = e.pageX;
        this.y = e.pageY
    }
    $.fn.jqzoom = function(options) {
        var settings = {
            xzoom: 200,
            yzoom: 200,
            offset: 10,
            position: "right",
            lens: 1,
            preload: 1
        };
        if (options) {
            $.extend(settings, options)
        }
        var noalt = "";
        $(this).hover(function() {
            var imageLeft = $(this).offset().left;
            var imageTop = $(this).offset().top;
            var imageWidth = $(this).children("img").get(0).offsetWidth;
            var imageHeight = $(this).children("img").get(0).offsetHeight;
            noalt = $(this).children("img").attr("alt");
            var bigimage = $(this).children("img").attr("jqimg");
            $(this).children("img").attr("alt", "");
            if ($("div.zoomdiv").get().length == 0) {
                $(this).after("<div class='zoomdiv'><img class='bigimg' src='" + bigimage + "'/></div>");
                $(this).append("<div class='jqZoomPup'>&nbsp;</div>")
            }
            if (settings.position == "right") {
                if (imageLeft + imageWidth + settings.offset + settings.xzoom > screen.width) {
                    leftpos = imageLeft - settings.offset - settings.xzoom
                } else {
                    leftpos = imageLeft + imageWidth + settings.offset
                }
            } else {
                leftpos = imageLeft - settings.xzoom - settings.offset;
                if (leftpos < 0) {
                    leftpos = imageLeft + imageWidth + settings.offset
                }
            }
            $("div.zoomdiv").css({
                top: 20,
                left: 363
            });
            $("div.zoomdiv").width(settings.xzoom);
            $("div.zoomdiv").height(settings.yzoom);
            $("div.zoomdiv").show();
            if (!settings.lens) {
                $(this).css("cursor", "crosshair")
            }
            $(document.body).mousemove(function(e) {
                mouse = new MouseEvent(e);
                var bigwidth = $(".bigimg").get(0).offsetWidth;
                var bigheight = $(".bigimg").get(0).offsetHeight;
                var scaley = "x";
                var scalex = "y";
                if (isNaN(scalex) | isNaN(scaley)) {
                    var scalex = (bigwidth / imageWidth);
                    var scaley = (bigheight / imageHeight);
                    $("div.jqZoomPup").width((settings.xzoom) / scalex);
                    $("div.jqZoomPup").height((settings.yzoom) / scaley);
                    if (settings.lens) {
                        $("div.jqZoomPup").css("visibility", "visible")
                    }
                }
                xpos = mouse.x - $("div.jqZoomPup").width() / 2 - imageLeft;
                ypos = mouse.y - $("div.jqZoomPup").height() / 2 - imageTop;
                if (settings.lens) {
                    xpos = (mouse.x - $("div.jqZoomPup").width() / 2 < imageLeft) ? 0 : (mouse.x + $("div.jqZoomPup").width() / 2 > imageWidth + imageLeft) ? (imageWidth - $("div.jqZoomPup").width() - 2) : xpos;
                    ypos = (mouse.y - $("div.jqZoomPup").height() / 2 < imageTop) ? 0 : (mouse.y + $("div.jqZoomPup").height() / 2 > imageHeight + imageTop) ? (imageHeight - $("div.jqZoomPup").height() - 2) : ypos
                }
                if (settings.lens) {
                    $("div.jqZoomPup").css({
                        top: ypos,
                        left: xpos
                    })
                }
                scrolly = ypos;
                $("div.zoomdiv").get(0).scrollTop = scrolly * scaley;
                scrollx = xpos;
                $("div.zoomdiv").get(0).scrollLeft = (scrollx) * scalex
            })
        }, function() {
            $(this).children("img").attr("alt", noalt);
            $(document.body).unbind("mousemove");
            if (settings.lens) {
                $("div.jqZoomPup").remove()
            }
            $("div.zoomdiv").remove()
        });
        count = 0;
        if (settings.preload) {
            $("body").append("<div style='display:none;' class='jqPreload" + count + "'>sdsdssdsd</div>");
            $(this).each(function() {
                var imagetopreload = $(this).children("img").attr("jqimg");
                var content = jQuery("div.jqPreload" + count + "").html();
                jQuery("div.jqPreload" + count + "").html(content + '<img src="' + imagetopreload + '">')
            })
        }
    }
    ;
    $.fn.jqzoom1 = function(options) {
        var settings = {
            zoomWidth: 430,
            zoomHeight: 400,
            xOffset: 40,
            yOffset: -1,
            lens: true,
            lensReset: false,
            title: false,
            alwaysOn: false,
            showEffect: "show",
            hideEffect: "hide",
            fadeinSpeed: "fast",
            fadeoutSpeed: "slow",
            preloadImages: false,
            showPreload: true,
            preloadText: "正在加载图片",
            preloadPosition: "center"
        };
        options = options || {};
        $.extend(settings, options);
        var spanObj = $(this);
        var bigImgUrl = spanObj.attr("title");
        spanObj.removeAttr("title");
        spanObj.css("outline-style", "none");
        var img = $("img", this);
        var smallimage = new Smallimage(img);
        var smallimagedata = {};
        var btop = 0;
        var bleft = 0;
        var loader = null ;
        loader = new Loader();
        var largeimage = new Largeimage(bigImgUrl);
        var lens = new Lens();
        var lensdata = {};
        var largeimageloaded = false;
        var scale = {};
        var stage = null ;
        var running = false;
        var mousepos = {};
        var firstime = 0;
        var preloadshow = false;
        smallimage.loadimage();
        $(this).click(function() {
            return false
        });
        $(this).hover(function(e) {
            mousepos.x = e.pageX;
            mousepos.y = e.pageY;
            activate()
        }, function() {
            deactivate()
        });
        if (settings.alwaysOn) {
            setTimeout(function() {
                activate()
            }, 150)
        }
        function activate() {
            if (!running) {
                smallimage.findborder();
                running = true;
                if (!largeimage) {
                    largeimage = new Largeimage(bigImgUrl)
                }
                if (!largeimageloaded) {
                    largeimage.loadimage()
                } else {
                    stage = new Stage();
                    stage.activate();
                    lens = new Lens;
                    lens.activate()
                }
                return false
            }
        }
        function deactivate() {
            if (!settings.alwaysOn) {
                running = false;
                $(lens.node).unbind("mousemove");
                lens.remove();
                if ($("div.jqZoomWindow").length > 0) {
                    stage.remove()
                }
                $().unbind();
                spanObj.unbind("mousemove");
                firstime = 0;
                if (jQuery(".zoom_ieframe").length > 0) {
                    jQuery(".zoom_ieframe").remove()
                }
            } else {
                if (settings.lensReset) {
                    lens.center()
                }
            }
            if (settings.alwaysOn) {
                activate()
            }
        }
        function Smallimage(image) {
            this.node = image[0];
            this.loadimage = function() {
                this.node.src = image[0].src
            }
            ;
            this.findborder = function() {
                var bordertop = "";
                bordertop = $(img).css("border-top-width");
                btop = "";
                var borderleft = "";
                borderleft = $(img).css("border-left-width");
                bleft = "";
                if (bordertop) {
                    for (i = 0; i < 3; i++) {
                        if (isNaN(bordertop.substr(i, 1)) == false) {
                            btop = btop + "" + bordertop.substr(i, 1)
                        } else {
                            break
                        }
                    }
                }
                if (borderleft) {
                    for (i = 0; i < 3; i++) {
                        if (!isNaN(borderleft.substr(i, 1))) {
                            bleft = bleft + borderleft.substr(i, 1)
                        } else {
                            break
                        }
                    }
                }
                btop = (btop.length > 0) ? eval(btop) : 0;
                bleft = (bleft.length > 0) ? eval(bleft) : 0
            }
            ;
            this.node.onload = function() {
                spanObj.css({
                    cursor: "crosshair",
                    display: "block"
                });
                if (spanObj.css("position") != "absolute" && spanObj.parent().css("position")) {
                    spanObj.css({
                        cursor: "crosshair",
                        position: "relative",
                        display: "block"
                    })
                }
                if (spanObj.parent().css("position") != "absolute") {} else {}
                if (clientBrowser.isSafari || clientBrowser.ieOpr) {
                    $(img).css({
                        position: "absolute",
                        top: "0px",
                        left: "0px"
                    })
                }
                smallimagedata.w = $(this).width();
                smallimagedata.h = $(this).height();
                smallimagedata.pos = $(this).offset();
                smallimagedata.pos.l = $(this).offset().left;
                smallimagedata.pos.t = $(this).offset().top;
                smallimagedata.pos.r = smallimagedata.w + smallimagedata.pos.l;
                smallimagedata.pos.b = smallimagedata.h + smallimagedata.pos.t;
                spanObj.height(smallimagedata.h);
                spanObj.width(smallimagedata.w);
                if (settings.preloadImages) {
                    largeimage.loadimage()
                }
            }
            ;
            return this
        }
        function Lens() {
            this.node = document.createElement("div");
            $(this.node).addClass("jqZoomPup");
            this.node.onerror = function() {
                $(lens.node).remove();
                lens = new Lens();
                lens.activate()
            }
            ;
            this.loadlens = function() {
                lensdata.w = (settings.zoomWidth) / scale.x;
                lensdata.h = (settings.zoomHeight) / scale.y;
                lensdata.w = (lensdata.w > 249) ? 249 : lensdata.w;
                lensdata.h = (lensdata.h > 249) ? 249 : lensdata.h;
                $(this.node).css({
                    width: lensdata.w + "px",
                    height: lensdata.h + "px",
                    position: "absolute",
                    display: "none",
                    borderWidth: 1 + "px"
                });
                spanObj.append(this.node)
            }
            ;
            return this
        }
        Lens.prototype.activate = function() {
            this.loadlens();
            (settings.alwaysOn) ? lens.center() : lens.setposition(null );
            spanObj.bind("mousemove", function(e) {
                mousepos.x = e.pageX;
                mousepos.y = e.pageY;
                lens.setposition(e)
            });
            return this
        }
        ;
        Lens.prototype.setposition = function(e) {
            if (e) {
                mousepos.x = e.pageX;
                mousepos.y = e.pageY
            }
            var lensleft, lenstop;
            if (firstime == 0) {
                lensleft = (smallimagedata.w) / 2 - (lensdata.w) / 2;
                lenstop = (smallimagedata.h) / 2 - (lensdata.h) / 2;
                $("div.jqZoomPup").show();
                if (settings.lens) {
                    this.node.style.visibility = "visible"
                } else {
                    this.node.style.visibility = "hidden";
                    $("div.jqZoomPup").hide()
                }
                firstime = 1
            } else {
                lensleft = mousepos.x - smallimagedata.pos.l - (lensdata.w) / 2;
                lenstop = mousepos.y - smallimagedata.pos.t - (lensdata.h) / 2
            }
            if (overleft()) {
                lensleft = 0 + bleft
            } else {
                if (overright()) {
                    lensleft = smallimagedata.w - lensdata.w + bleft - 1
                }
            }
            if (overtop()) {
                lenstop = 0 + btop
            } else {
                if (overbottom()) {
                    lenstop = smallimagedata.h - lensdata.h - 1 + btop
                }
            }
            lensleft = parseInt(lensleft);
            lenstop = parseInt(lenstop);
            $("div.jqZoomPup", spanObj).css({
                top: lenstop,
                left: lensleft
            });
            this.node.style.left = lensleft + "px";
            this.node.style.top = lenstop + "px";
            largeimage.setposition();
            function overleft() {
                return mousepos.x - (lensdata.w + 2 * 1) / 2 - bleft < smallimagedata.pos.l
            }
            function overright() {
                return mousepos.x + (lensdata.w + 2 * 1) / 2 > smallimagedata.pos.r + bleft
            }
            function overtop() {
                return mousepos.y - (lensdata.h + 2 * 1) / 2 - btop < smallimagedata.pos.t
            }
            function overbottom() {
                return mousepos.y + (lensdata.h + 2 * 1) / 2 > smallimagedata.pos.b + btop
            }
            return this
        }
        ;
        Lens.prototype.center = function() {
            $("div.jqZoomPup", spanObj).css("display", "none");
            var lensleft = (smallimagedata.w) / 2 - (lensdata.w) / 2;
            var lenstop = (smallimagedata.h) / 2 - (lensdata.h) / 2;
            this.node.style.left = lensleft + "px";
            this.node.style.top = lenstop + "px";
            $("div.jqZoomPup", spanObj).css({
                top: lenstop,
                left: lensleft
            });
            largeimage.setposition();
            if (_IsIE) {
                $("div.jqZoomPup", spanObj).show()
            } else {
                setTimeout(function() {
                    $("div.jqZoomPup").fadeIn("fast")
                }, 10)
            }
        }
        ;
        Lens.prototype.getoffset = function() {
            var o = {};
            o.left = parseInt(this.node.style.left);
            o.top = parseInt(this.node.style.top);
            return o
        }
        ;
        Lens.prototype.remove = function() {
            $("div.jqZoomPup", spanObj).remove()
        }
        ;
        Lens.prototype.findborder = function() {
            var bordertop = "";
            bordertop = $("div.jqZoomPup").css("borderTop");
            lensbtop = "";
            var borderleft = "";
            borderleft = $("div.jqZoomPup").css("borderLeft");
            lensbleft = "";
            if (_IsIE) {
                var temp = bordertop.split(" ");
                bordertop = temp[1];
                var temp = borderleft.split(" ");
                borderleft = temp[1]
            }
            if (bordertop) {
                for (i = 0; i < 3; i++) {
                    var x = [];
                    x = bordertop.substr(i, 1);
                    if (isNaN(x) == false) {
                        lensbtop = lensbtop + "" + bordertop.substr(i, 1)
                    } else {
                        break
                    }
                }
            }
            if (borderleft) {
                for (i = 0; i < 3; i++) {
                    if (!isNaN(borderleft.substr(i, 1))) {
                        lensbleft = lensbleft + borderleft.substr(i, 1)
                    } else {
                        break
                    }
                }
            }
            lensbtop = (lensbtop.length > 0) ? eval(lensbtop) : 0;
            lensbleft = (lensbleft.length > 0) ? eval(lensbleft) : 0
        }
        ;
        function Largeimage(url) {
            var bigPicDiv = $("div.jqZoomBigPic");
            if (bigPicDiv.length > 0) {
                bigPicDiv.remove()
            }
            var divNode = document.createElement("div");
            divNode.className = "jqZoomBigPic";
            document.body.appendChild(divNode);
            var urlPre = url.substring(0, url.lastIndexOf("."));
            var urlExt = url.substring(url.lastIndexOf("."));
            this.loadimage = function() {
                divNode.innerHTML = "";
                if (settings.showPreload && !preloadshow) {
                    loader.show();
                    preloadshow = true
                }
                var imgW = 0;
                var imgH = 0;
                var colTIdx = 4;
                var rowTIdx = 3;
                var loadIdx = 0;
                for (var i = 1; i <= colTIdx * rowTIdx; i++) {
                    var imgObj = new Image();
                    imgObj.name = String(i);
                    imgObj.onload = function() {
                        loadIdx++;
                        var k = parseInt(this.name);
                        if (k <= colTIdx) {
                            imgW += Math.round(this.width)
                        }
                        if (k % colTIdx == 1) {
                            imgH += Math.round(this.height)
                        }
                        if (loadIdx == colTIdx * rowTIdx) {
                            divNode.style.width = imgW + "px";
                            divNode.style.height = imgH + "px";
                            scale.x = (imgW / smallimagedata.w);
                            scale.y = (imgH / smallimagedata.h);
                            if ($("div.preload").length > 0) {
                                $("div.preload").remove()
                            }
                            largeimageloaded = true;
                            if (running) {
                                stage = new Stage();
                                stage.activate();
                                lens = new Lens();
                                lens.activate()
                            }
                        }
                    }
                    ;
                    imgObj.src = urlPre + "_" + i + urlExt;
                    divNode.appendChild(imgObj)
                }
            }
            ;
            this.node = divNode;
            return this
        }
        Largeimage.prototype.setposition = function() {
            this.node.style.left = Math.ceil(-scale.x * parseInt(lens.getoffset().left) + bleft) + "px";
            this.node.style.top = Math.ceil(-scale.y * parseInt(lens.getoffset().top) + btop) + "px"
        }
        ;
        function Stage() {
            var leftpos = smallimagedata.pos.l;
            var toppos = smallimagedata.pos.t;
            this.node = document.createElement("div");
            $(this.node).addClass("jqZoomWindow");
            $(this.node).css({
                position: "absolute",
                width: Math.round(settings.zoomWidth) + "px",
                height: Math.round(settings.zoomHeight) + "px",
                display: "none",
                zIndex: 10000,
                overflow: "hidden"
            });
            leftpos = (smallimagedata.pos.r + Math.abs(settings.xOffset) + settings.zoomWidth < screen.width) ? (smallimagedata.pos.l + smallimagedata.w + Math.abs(settings.xOffset)) : (smallimagedata.pos.l - settings.zoomWidth - Math.abs(settings.xOffset));
            topwindow = smallimagedata.pos.t + settings.yOffset + settings.zoomHeight;
            toppos = (topwindow < screen.height && topwindow > 0) ? smallimagedata.pos.t + settings.yOffset : smallimagedata.pos.t;
            this.node.style.left = leftpos + "px";
            this.node.style.top = toppos + "px";
            return this
        }
        Stage.prototype.activate = function() {
            if (!this.node.firstChild) {
                this.node.appendChild(largeimage.node)
            }
            document.body.appendChild(this.node);
            switch (settings.showEffect) {
            case "show":
                $(this.node).show();
                break;
            case "fadein":
                $(this.node).fadeIn(settings.fadeinSpeed);
                break;
            default:
                $(this.node).show();
                break
            }
            $(this.node).show();
            if (_IsIE && _IeVersion < 7) {
                this.ieframe = $('<iframe class="zoom_ieframe" frameborder="0" src="#"></iframe>').css({
                    position: "absolute",
                    left: this.node.style.left,
                    top: this.node.style.top,
                    zIndex: 99,
                    width: settings.zoomWidth,
                    height: settings.zoomHeight
                }).insertBefore(this.node)
            }
            var paddingLeft = Math.round((settings.zoomWidth - $(largeimage.node).width()) / 2);
            var paddingTop = Math.round((settings.zoomHeight - $(largeimage.node).height()) / 2);
            if (paddingLeft > 0) {
                $(largeimage.node).css("padding-left", paddingLeft + "px")
            }
            if (paddingTop > 0) {
                $(largeimage.node).css("padding-top", paddingTop + "px")
            }
            largeimage.node.style.display = "block"
        }
        ;
        Stage.prototype.remove = function() {
            switch (settings.hideEffect) {
            case "hide":
                $(".jqZoomWindow").remove();
                break;
            case "fadeout":
                $(".jqZoomWindow").fadeOut(settings.fadeoutSpeed);
                break;
            default:
                $(".jqZoomWindow").remove();
                break
            }
        }
        ;
        function Loader() {
            this.node = document.createElement("div");
            $(this.node).addClass("preload");
            $(this.node).html(settings.preloadText);
            $(this.node).appendTo("body").css("visibility", "hidden");
            this.show = function() {
                switch (settings.preloadPosition) {
                case "center":
                    loadertop = smallimagedata.pos.t + (smallimagedata.h - $(this.node).height()) / 2;
                    loaderleft = smallimagedata.pos.l + (smallimagedata.w - $(this.node).width()) / 2;
                    break;
                default:
                    var loaderoffset = this.getoffset();
                    loadertop = !isNaN(loaderoffset.top) ? smallimagedata.pos.t + loaderoffset.top : smallimagedata.pos.t + 0;
                    loaderleft = !isNaN(loaderoffset.left) ? smallimagedata.pos.l + loaderoffset.left : smallimagedata.pos.l + 0;
                    break
                }
                $(this.node).css({
                    top: loadertop,
                    left: loaderleft,
                    position: "absolute",
                    visibility: "visible"
                })
            }
            ;
            return this
        }
        Loader.prototype.getoffset = function() {
            var o = null ;
            o = $("div.preload").offset();
            return o
        }
    }
    ;
    var mycarousel_initCallback = function() {
        var smallPicSltIndex = 0;
        var sltRemarkTime = null ;
        var index = -1;
        var picPath = "http://goodsimg.1yyg.com/GoodsPic";
        var picLiObj = $("#mycarousel li");
        picLiObj.mouseenter(function() {
            var theIndex = picLiObj.index(this);
            if (theIndex != index) {
                index = theIndex;
                var picRemark = $("#middlePicRemark");
                if (sltRemarkTime != null ) {
                    clearTimeout(sltRemarkTime);
                    sltRemarkTime = null ;
                    picRemark.hide()
                }
                var itemImg = $(this).find("img").eq(0);
                var midPicObj = $("#middlePicBox");
                var _IsEnd = $("#hidIsEnd").val() == "1";
                var _IsLimit = $("#hidGoodsTag").val() == "10";
                if (midPicObj.length == 0) {
                    midPicObj.html('<img  class="z-middle-loading" src="http://skin.1yyg.com/images/loding.gif" alt="加载中..." />')
                }
                var _Tag = _IsEnd ? '<div class="product-end">本商品已结束</div>' : (_IsLimit ? '<div class="ng-over-time F_goods_xg transparent-png"><span>限购</span></div>' : "");
                var _ViewImage = "<span id='BigViewImage' title='" + picPath + "/pic-split/" + itemImg.attr("name") + "' class='jqzoom'><img style='width:343px;height:343px;'  src='" + picPath + "/Pic-400-400/" + itemImg.attr("name") + "' /></span>";
                midPicObj.html(_ViewImage).ready(function() {
                    midPicObj.append(_Tag).find("#BigViewImage").jqzoom1()
                });
                midPicObj.prev("img").eq(0).attr("src", $(this).find("img").attr("src"));
                $(this).addClass("current").siblings().removeClass("current");
                if (itemImg.attr("alt") != "") {
                    picRemark.css({
                        top: "0px"
                    }).html("<p>" + itemImg.attr("alt") + "</p><span></span>").show("fast", function() {
                        sltRemarkTime = setTimeout(function() {
                            picRemark.fadeOut("slow")
                        }, 3000)
                    })
                }
            } else {
                return
            }
        });
        picLiObj.eq(smallPicSltIndex).mouseenter()
    }
    ;
    mycarousel_initCallback()
}
;