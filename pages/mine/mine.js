// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:'',
    isLogin:false
  },
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'isLogin',
      success: function(res) {
        console.log(res)
        that.setData({
          isLogin: res.data
        })
        wx.getStorage({
          key: 'info',
          success: function (res) {
            console.log(res)
            that.setData({
              info: res.data
            })
          },
        })
      },
    })
    
  },
  onShow: function () {
  
  },
  clearStorage:function(){
    wx.showModal({
      title: '确定清空缓存吗',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          try {
            wx.clearStorageSync();
            wx.showToast({
              title: '清除成功',
            })
          } catch (e) {
            wx.showToast({
              title: '清除失败',
            })
          }
        } else {
          wx.showToast({
            title: '已取消',
          })
        }
      }
    });
  },
  getInfo(item){
    console.log(item)
    this.setData({
      info:item,
      isLogin:true
    })
    wx.setStorageSync('isLogin', true)
    wx.setStorageSync('info', item)
  }
})