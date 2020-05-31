// pages/main.js
const app = getApp()

Page({
  data: {
    active: 1,
    modalName: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function (options) {
    const that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
      },
      fail: function(err) {
        console.log(err)
        that.setData({
          modalName: "DialogModal1"
        })
      }
    })
  },
  setActive(e) {
    let active = e.currentTarget.dataset.active;
    this.setData({
      active
    })
  },
  goSH() {
    wx.navigateTo({
      url: '/pages/search/search'
      // url: '/homePage/shortage/shortage',
    })
  },
  hideModal() {
    this.setData({
      modalName:''
    })
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    wx.setStorage({
      key: 'userinfo',
      data: e.detail.userInfo
    })
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.hideModal();
  }
})