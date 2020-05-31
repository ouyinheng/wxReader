// homePage/mine/mine.js
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    userinfo:{},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  attached() {
    // 查看是否授权
    const that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        console.log(res)
        that.setData({
          userinfo: res.data
        })
      },
    })
  },
  methods: {
    CopyLink(e) {
      wx.navigateTo({
        url: '/pages/flower/flower',
      })
      },
    bindGetUserInfo(e) {
      this.setData({
        userinfo: e.detail.userinfo
      })
      wx.setStorage({
        key: 'userinfo',
        data: JSON.stringify(e.detail.userinfo)
      })
    },
    clearStorage() {
      wx.showModal({
        title: '提示',
        content: '确定清空吗',
        success(res) {
          if (res.confirm) {
            wx.clearStorage();
          }
        }
      })
    }
  }
})
