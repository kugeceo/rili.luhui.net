//全站自定义管理变量   
var ZHWNL = ZHWNL || {};

(function(object){
	var _this = object || window;//private的成员中 _this是绑定当前对象,public的成员 this和_this绑定当前对象    
	var topNamespace = _this; //topNamespace是顶级命名空间,所以的命名空间都在他下面。
	
	/**
    * 创建一个命名空间，创建的命名空间将会在 顶级 根命名空间下。
    * $namespace('RS.App'); // returns RS.App
    * $namespace('App.Shop'); // returns RS.App.Shop
    * $namespace('TB.App.Shop', true); // returns TB.app.Shop
    **/
    function $namespace() {
        var args = arguments, l = args.length,
                o = null, i, j, p,
                global = (args[l - 1] === true && l--);
        for (i = 0; i < l; ++i) {
            p = (args[i]).split('.');
            o = global ? window : topNamespace;
            for (j = (window[p[0]] === o) ? 1 : 0; j < p.length; ++j) {
                o = o[p[j]] = o[p[j]] || {};
            }
        }
        return o;
    }
    
	/**
	 * 注册包
	 * eg.
	 * $package("RS.App.Comment",function(top){
	 * 	//这时上下文对象this指向顶级命名空间的RS.App.Comment对象,top指向顶级命名空间
	 * 	alert("Hello world! _this is " + this);
	 * };
	 *
	 *$package(function(top){ 
	 *   //这时上下文对象this指向顶级命名空间的RS对象,top指向顶级命名空间
	 *});
	 *
	 * @param {String},{Object} name 要创建的包的名字空间
	 * @param {Function} func 要创建的包的包体
	**/
     function $package() {
         var name = arguments[0];
         var func = arguments[arguments.length - 1];
         var ns = topNamespace;
         if (typeof func === "function") {
             if (typeof name === "string") {
                 ns = $namespace(name);
             } else if (typeof name === "object") {
                 ns = name;
             }
             func.call(ns, topNamespace);
         } else {
             throw new Error("Function required");
         }
     }
    
    _this.$namespace=$namespace;
    _this.$package=$package;
})(ZHWNL);

$.fn.extend({
	bindState: function(type, className) {
		var $this = this;
		if (type == undefined) {
			type = 1;
		}
		if (className == undefined) {
			className = "";
		} else {
			className = className + "-";
		}
		//绑定hover状态
		this.hover(function() {
			$(this).addClass(className + "hover");
		},
		function() {
			$(this).removeClass(className + "hover");
		});
		//点一下active,多个选择,点击选择,点击取消 复选
		if (type == 1 || type == "checkbox") {
			$(this).click(function() {
				$(this).toggleClass(className + "on");
			});
		} //点一下active,点击单个选择 单选
		else if (type == 2 || type == "radio") {
			$(this).click(function() {
				$this.removeClass(className + "on");
				$(this).addClass(className + "on");
			});
		} //点一下active,单个选择,再点一下取消 单选可取消选择
		else if (type == 3 || type == "toggle") {
			$(this).click(function() {
				var hasOn = $(this).hasClass(className + "on");
				$this.removeClass(className + "on");
				if (hasOn) {
					$(this).removeClass(className + "on");
				} else {
					$(this).addClass(className + "on");
				}
			});
		}
	}
});
