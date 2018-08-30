// pages/fx/classify/classify.js
Page({
  data: {
    classifyList: '123',
    loading: true,
    loadshow: true
  },
  onLoad: function (options) {
    const _this = this;
    wx.request({
      url: "https://api.zhuishushenqi.com/cats/lv2/statistics",
      success: function (res) {
        _this.cancelLoading();
        _this.setData({
          classifyList:res.data,
          loading:false
        })
        setTimeout(_=>{
          _this.setData({
            loadshow:false
          })
        },1000)
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