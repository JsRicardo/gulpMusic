/* 
* @Author: Ricardo
* @Date:   2018-10-23 13:22:12
* @Last Modified by:   Ricardo
* @Last Modified time: 2018-12-05 14:24:59
*/

(function($,root){
    var $scope = $(document.body);
    function audioManager(){
        this.audio = new Audio();
        this.status = "pause";
        // this.bindEvent();
    }  
    audioManager.prototype = {
        //绑定监听歌曲是否播放完成事件
        bindEvent:function(){
            $(this.audio).on("ended",function(){
                $scope.find(".next-btn").trigger("click");
            }) 
        },
        play : function(){
            this.audio.play();
            this.status = "play";
        },
        pause : function(){
            this.audio.pause();
            this.status = "pause";
        },
        // 传入歌曲资源data.audio
        setAudioSource : function(src){
            this.audio.src = src;
            this.audio.load();
        },
        //进度条拖拽
        jumpToplay : function(time){
            this.audio.currentTime = time;
            this.play();
        }   
    }
    root.audioManager = audioManager;
})(window.Zepto,window.player || (window.player ={}))