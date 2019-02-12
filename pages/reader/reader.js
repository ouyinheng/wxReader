// pages/reader/reader.js
Page({
  data: {
    start: 0,
    distance: 0,
    y: 0,
    bool: false,
    canmove: true
  },
  onLoad: function (options) {

  },
  touchstart(e) {
    if(!this.data.canmove)return;
    this.setData({
      bool: false
    })
    let start = e.changedTouches[0].clientX;
    let distance = this.data.distance == '-100%' ? '-100%' : 0
    this.setData({
      start,distance
    })
  },
  touchmove(e) {
    if(!this.data.canmove)return;
    let move = e.changedTouches[0].clientX;
    let distance = move-this.data.start;
    if(distance>0){
      return;
    }
    distance = distance < -30 ? distance : 0
    this.setData({ distance: distance+'px' })
  },
  touchend(e) {
    if(!this.data.canmove)return;
    this.setData({
      bool: true
    })
    let end = e.changedTouches[0].clientX;
    let distance = end-this.data.start;
    if(distance>-30){
      return;
    }
    distance = distance<=-100 ? '-100%': 0;
    if(distance=='-100%'){
      this.setData({
        canmove: false
      })
    }
    this.setData({ distance })
  },
  goleft(){
    console.log(this.data.distance)
    this.setData({
      distance: 0,
      canmove: true
    })
  }
})