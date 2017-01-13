(function  ($) {
	$.fn.dargFlex = function  (classN,json) {
		console.debug(typeof this);
		var json = json || {};
		json.dragStyle = json.dragStyle || {};
		json.siteStyle = json.siteStyle || {};
		json.dragStyle.zIndex = json.dragStyle.zIndex  || 2;
		json.dragStyle.opacity = json.dragStyle.opacity || 1;
		json.dragStyle.border = json.dragStyle.border || 'none';
		json.siteStyle.opacity = json.siteStyle.opacity || 1;
		json.siteStyle.border = json.siteStyle.border || '2px dashed #666';
		json.siteStyle.bgColor = json.siteStyle.bgColor || '#FFF';
		
		var classN = classN || 'dragObj';
		var $this = this;
		this.bind('mousedown',function (ev){
			var oEe = ev || event;
			var oSrc = oEe.srcElement || oEe.target;			//默认不带参数，默认全部子项拖拽
			if ($(oEe.target).hasClass(classN)){		//默认以类名匹配拖拽元素
				var oldY = oEe.clientY;
				var oldX = oEe.clientX;
				var iTop = oEe.target.offsetTop;
				var iLeft = oEe.target.offsetLeft;
				var iW  = oEe.target.offsetWidth;
				var iH = oEe.target.offsetHeight;
				$(oEe.target).css({
					'position':'absolute',
					'top':iTop+'px',
					'left':iLeft + 'px',
					'width':iW +'px',
					'z-index':json.dragStyle.zIndex,
					'opacity':json.dragStyle.opacity,
					'border':json.dragStyle.border
				});
				var oSpan = document.createElement('span');
				$(oSpan).css({
					'display':'block',
					'height':iH + 'px',
					'width': iW + 'px',
					'opacity':json.siteStyle.opacity,
					'border':json.siteStyle.border,
					'background':json.siteStyle.bgColor,
					'box-sizing':'border-box',
					'-webkit-box-sizing':'border-box',
					'-ms-box-sizing':'border-box',
					'-moz-box-sizing':'border-box'
				});
				$(oSpan).attr('id','obj');
				//console.debug(this);
				//objP.insertBefore(oSpan,oSrc);
				$this[0].insertBefore(oSpan,oSrc);	
				function move (ev) {
					var oEe = ev || event;
					var newY = oEe.clientY;
					var iNowT = oEe.target.offsetTop;
					var iT = newY - oldY + iTop;
					$(oSrc).css('top',iT+'px');
					
					if (iT - iNowT < 0){
						var obj = document.getElementById('obj');
						var prev = obj.previousElementSibling;
						if (prev){
							var pTop = prev.offsetTop;
							var pH = prev.offsetHeight/2;
							if (iT <= (pTop + pH)){
								$this[0].removeChild(prev);
								var objNext = obj.nextElementSibling;
								$this[0].insertBefore(prev,objNext);
							}
						}
					}
					if (iT - iNowT > 0){
						var obj = document.getElementById('obj');
						var next = obj.nextElementSibling;
						if (next){
							var nTop = next.offsetTop;
							var nH = next.offsetHeight/2;
							if ((iT + iH) >= (nTop + nH)){
								$this[0].removeChild(next);
								$this[0].insertBefore(next,obj);
							}
						}
					}
					oEe.preventDefault();
				}
				function dragUp (ev) {
					var change = ev.target.cloneNode(true);
					var obj = document.getElementById('obj');
					//$(ev.target).remove();
					$this[0].removeChild(oSrc);
					$(oSrc).removeAttr('style');
					$('#obj').before(oSrc);
					
					$this[0].removeChild(obj);
					
					$(document).unbind('mousemove',move);
					$(document).unbind('mouseup',dragUp);
					
				}
				$(document).bind('mousemove',move);
				$(document).bind('mouseup',dragUp);
			}
				
			oEe.preventDefault();
		});
	}
})(jQuery);
/*
 
 * 
 * API 文档
 * 
 * 
 * jQuery.dargFlex(classN,json)
 * 
 * jQuery = parentNode
 * 
 * 参数：
 * classN = 指定的触发拖拽的唯一源头的类名，必须给
 * 
 * json = 关于拖拽元素和定位元素的样式，携带两个key
 * json.dragStyle = {};		拖拽元素
 * 可以修改
 * 	opacity		json.dragStyle.opacity
 * 	border		json.dragStyle.border
 * 	z-index		json.dragStyle.zIndex
 * 
 * json.siteStyle = {};		定位元素
 * 可修改
 * opacity		json.siteStyle.opacity
 * border		json.siteStyle.border
 * zIndex		json.siteStyle.zIndex
 * 
 * 
 * */