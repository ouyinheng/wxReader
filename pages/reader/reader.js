// pages/reader/reader.js
Page({
  data: {
    start: 0,
    distance: 0,
    y: 0
  },
  onLoad: function (options) {

  },
  touchstart(e) {
    let start = e.changedTouches[0].clientX;
    let distance = this.data.distance == '-100%' ? '-100%' : 0
    this.setData({
      start,distance
    })
  },
  touchmove(e) {
    let move = e.changedTouches[0].clientX;
    let distance = move-this.data.start;
    if(distance>0){
      return;
    }
    distance = distance < -30 ? distance : 0
    this.setData({ distance: distance+'px' })
  },
  touchend(e) {
    let end = e.changedTouches[0].clientX;
    let distance = end-this.data.start;
    if(distance>-30){
      return;
    }
    distance = distance<=-100 ? '-100%': 0;
    this.setData({ distance })
  },
  goleft(){
    console.log(this.data.distance)
    this.setData({
      distance: 0
    })
  }
})