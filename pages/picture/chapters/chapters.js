// pages/picture/chapters/chapters.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    _id: '',
    loadModal: false,
    bookInfo: {}
  },
  onLoad: function (options) {
    this.setData({
      id: options.id,
      _id: options._id,
      loadModal: true
    })
    this.getPictureList(options.id)
  },
  getPictureList(id) {
    const that = this;
    wx.request({
      url: `https://api.zhuishushenqi.com/btoc/${id}?view=chapters&channel=mweb&platform=h5`,
      success: function (res) {
        that.setData({
          bookInfo: res.data,
          loadModal: false
        })
      },
      fail() {
        that.setData({
          loadModal: false
        })
      }
    })
  },
  change(e) {
    const index = e.currentTarget.dataset.index;
    wx.setStorage({
      key: this.data._id,
      data: index,
    })
    wx.navigateBack()
  }
})