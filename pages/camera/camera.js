const app = getApp();
const glob = app.globalData;
const req = app.req;
// areaModule/addAnswer/addAnswer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerId: null,
    answerTitle: null,
    tempFilePaths:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      answerId: options.id,
      answerTitle: options.title
    })
  },
  //
  bindFormSubmit: function () {
    console.log('asdf')
  },
  openCamara: function () {
    var that = this;
    wx.chooseImage({
      count: 5, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        console.log(that.data.tempFilePaths) 
        var list = [];
        list.unshift(...res.tempFilePaths)
        list.unshift(...that.data.tempFilePaths)
        that.setData({
          tempFilePaths: list
        })
      }
    })
  }
})