/* 
* @Author: Ricardo
* @Date:   2018-10-23 13:20:29
* @Last Modified by:   Ricardo
*/


//控制按钮

(function($,root){
    function controlManager(len){
        this.index = 0;
        this.len = len;
    }
    controlManager.prototype = {
        prev : function(){
            return this.getIndex(-1);
        },
        next : function(){
            return this.getIndex(1);
        },
        //获取应该播放哪首音乐  
        getIndex : function(val){
            var index = this.index;
            var len = this.len;
            var curIndex = (index + val + len) % len;
            // 把当前播放的音乐的index 保存起来
            this.index = curIndex;
            //返回当前应该播放的音乐的index
            return curIndex;
        }
    }
    root.controlManager = controlManager;
})(window.Zepto,window.player || (window.player = {}));