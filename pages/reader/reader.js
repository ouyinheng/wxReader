// pages/reader/reader.js
Page({
  data: {
    start: 0,
    distance: 0
  },
  onLoad: function (options) {

  },
  touchstart(e) {
    let start = e.changedTouches[0].clientX;
    this.setData({
      start,distance: 0
    })
  },
  touchmove(e) {
    let move = e.changedTouches[0].clientX;
    let distance = this.data.start-move;
    this.setData({
      distance
    })
  },
  touchend(e) {
    let end = e.changedTouches[0].clientX;
    let distance = this.data.start - end;
    this.setData({
      distance
    })
  }
})