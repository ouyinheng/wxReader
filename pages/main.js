// pages/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  setActive(e) {
    let active = e.currentTarget.dataset.active;
    this.setData({
      active
    })
  },
  goSH() {
    wx.navigateTo({
      url: '/homePage/shortage/shortage',
    })
  }
})