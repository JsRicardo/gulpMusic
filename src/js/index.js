/*
 * @Author: Ricardo
 * @Date:   2018-10-22 13:58:58
 * @Last Modified by:   Ricardo
 */

var $ = window.Zepto,
  root = window.player,
  $scope = $(document.body),
  songList,
  controlmanager,
  audio = new root.audioManager(); //引入音乐播放管理模块
function bindClick() {
  $scope.on("play:change", function(event, index, flag) {
    audio.setAudioSource(songList[index].audio);
    if (audio.status == "play" || flag) {
      audio.play();
      root.processor.start();
    }
    // 渲染时间模块
    root.processor.renderAllTime(songList[index].duration);
    root.render(songList[index]);
    root.processor.updata(0);
  });
  // 切换上一首音乐
  $scope.on("click", ".prev-btn", function() {
    var index = controlmanager.prev();
    $scope.trigger("play:change", index);
  });
  // 下一曲
  $scope.on("click", ".next-btn", function() {
    var index = controlmanager.next();
    $scope.trigger("play:change", index);
  });
  //播放音乐 以及改变按钮样式
  $scope.on("click", ".play-btn", function() {
    if (audio.status == "play") {
      audio.pause();
      root.processor.stop();
    } else {
      root.processor.start();
      audio.play();
    }
    $(this).toggleClass("playing");
  });
  // 展示播放列表
  $scope.on("click", ".list-btn", function() {
    root.playList.show(controlmanager);
  });
}
// 进度条控制音乐播放
function bindTouch() {
  var $slidePoint = $scope.find(".slider-point");
  var offset = $scope.find(".pro-wrapper").offset();
  var left = offset.left;
  var width = offset.width;
  //绑定拖拽事件 开始拖拽 ： 取消进度条渲染
  $slidePoint
    .on("touchstart", function() {
      root.processor.stop();
    })
    .on("touchmove", function(e) {
      //计算拖拽的百分比 更新我们的当前时间和进度条
      var x = e.changedTouches[0].clientX;
      var percent = (x - left) / width;
      if (percent > 1 || percent < 0) {
        percent = 0;
      }
      root.processor.updata(percent);
    })
    .on("touchend", function(e) {
      //计算百分百 跳转播放 重新开始进度条渲染
      var x = e.changedTouches[0].clientX;
      var percent = (x - left) / width;
      if (percent > 1 || percent < 0) {
        percent = 0;
      }
      var curDuration = songList[controlmanager.index].duration;
      var curTime = curDuration * percent;
      audio.jumpToplay(curTime);
      root.processor.start(percent);
      $scope.find(".play-btn").addClass("playing");
    });
}
//主入口  请求数据
function getData(url) {
  $.ajax({
    type: "GET",
    url: url,
    success: function(data) {
      console.log(data);
      bindClick();
      bindTouch();
      root.playList.renderList(data);
      //引入控制按钮模块  传入有多少首音乐 = data.length
      controlmanager = new root.controlManager(data.length);
      // 保存songlist = data用于生成播放列表
      songList = data;
      $scope.trigger("play:change", 0);
    },
    error: function() {
      console.log("error");
    }
  });
}

getData("../mock/data.json");
