/*
 * @Author: Ricardo
 * @Date:   2018-10-23 13:24:33
 * @Last Modified by:   Ricardo
 */

(function($, root) {
  var $scope = $(document.body),
    curDuration,
    frameId,
    lastPercent = 0,
    startTime;
  //把秒转换成分和秒
  function formatTime(duration) {
    duration = Math.round(duration);
    var minute = Math.floor(duration / 60);
    var second = duration - minute * 60;
    // 拼接时间字符串
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (second < 10) {
      second = "0" + second;
    }
    return minute + ":" + second;
  }
//   渲染总时长
  function renderAllTime(duration) {
    lastPercent = 0;
    curDuration = duration;
    // 处理时间字符串
    var allTime = formatTime(duration);
    $scope.find(".all-time").html(allTime);
  }
//   根据总时长和进度条长度处理百分比
  function updata(precent) {
    var curTime = precent * curDuration;
    // 处理当前播放时长
    curTime = formatTime(curTime);
    // 渲染当前播放时长
    $scope.find(".cur-time").html(curTime);
    var percentage = (precent - 1) * 100 + "%";
    // 渲染进度条长度
    $scope.find(".pro-top").css({
      transform: "translateX(" + percentage + ")"
    });
  }
  function start(precentage) {
    lastPercent = precentage === undefined ? lastPercent : precentage;
    cancelAnimationFrame(frameId);
    // 获取时间戳
    startTime = new Date().getTime();
    function frame() {
      var curTime = new Date().getTime();
    //   根据时间处理百分比
      var precent = lastPercent + (curTime - startTime) / (curDuration * 1000);
      if (precent < 1) {
        frameId = requestAnimationFrame(frame);
        updata(precent);
      } else {
        cancelAnimationFrame(frameId);
        $scope.find(".next-btn").trigger("click");
      }
    }
    frame();
  }
  function stop() {
    var stopTime = new Date().getTime();
    lastPercent = lastPercent + (stopTime - startTime) / (curDuration * 1000);
    cancelAnimationFrame(frameId);
  }
  root.processor = {
    renderAllTime: renderAllTime,
    start: start,
    stop: stop,
    updata: updata
  };
})(window.Zepto, window.player || window.player);
