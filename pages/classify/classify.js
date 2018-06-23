// pages/fx/classify/classify.js
Page({
  data: {
    classifyList:'123'
  },
  onLoad: function (options) {
    this.showLoading()
    wx.setNavigationBarTitle({
      title: '分类'//页面标题为路由参数
    })
    const _this = this;
    wx.request({
      url: "https://api.zhuishushenqi.com/cats/lv2/statistics",
      success: function (res) {
        console.log(res.data)
        _this.cancelLoading();
        _this.setData({
          classifyList:res.data
        })
      }
    })
  },
  //获取分类详情
  goDetails:function (event) {
    var params = event.currentTarget.dataset.params;
    var cls = event.currentTarget.dataset.cls;
    wx.navigateTo({
      url: 'details/details?param=' + params.name +'&cls=' +cls
    })
  },
  showLoading: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
  },
  cancelLoading: function () {
    wx.hideToast();
  }
})