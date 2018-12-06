/*
 * @Author: Ricardo
 * @Date:   2018-10-23 13:21:02
 * @Last Modified by:   Ricardo
 */

(function($, root) {
  var $scope = $(document.body);
  var control;
//   创界播放列表
  var $playList = $(
    "<div class = 'play-list'>" +
      "<div class='play-header'>播放列表</div>" +
      "<ul class = 'list-wrapper'></ul>" +
      "<div class='close-btn'>关闭</div>" +
      "</div>"
  );
  //渲染播放列表dom结构
  //songList data中的song
  function renderList(songList) {
    var html = "";
    for (var i = 0; i < songList.length; i++) {
      html +=
        "<li><h3 >" +
        songList[i].song +
        "-<span>" +
        songList[i].singer +
        "</span></h3></li>";
    }
    $playList.find("ul").html(html);
    $scope.append($playList);
    bindEvent();
  }
//   展示播放列表
  function show(controlmanager) {
    control = controlmanager;
    $playList.addClass("show");
    signSong(control.index);
  }
//   播放列表绑定事件
  function bindEvent() {
    $playList.on("click", ".close-btn", function() {
      $playList.removeClass("show");
    });
    // 存储选中音乐的index
    $playList.find("li").on("click", function() {
      var index = $(this).index();
      signSong(index);
    //   点击播放选择音乐
      control.index = index;
      $scope.trigger("play:change", [index, true]);
      $scope.find(".play-btn").addClass("playing");
    //   来点延迟效果更好
      setTimeout(function() {
        $playList.removeClass("show");
      }, 200);
    });
  }
//   标记播放音乐
  function signSong(index) {
    $playList.find(".sign").removeClass("sign");
    $playList
      .find("ul li")
      .eq(index)
      .addClass("sign");
  }
  root.playList = {
    renderList: renderList,
    show: show
  };
})(window.Zepto, window.player || (window.player = {}));
