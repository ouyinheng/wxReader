// pages/text/text.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    male:'',
    female:'',
    bookList:'',
    navbar: ['男生', '女生'],
    currentTab: 0,
    playIndex: 0,
    tab: 0,
    titlenum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showLoading();
    wx.setNavigationBarTitle({
      title: '排行榜'//页面标题为路由参数
    })
    const _this = this;
    var url = `https://api.zhuishushenqi.com/ranking/gender`;
    wx.request({
      url: url,
      success:function(res){
        _this.setData({
          male:res.data.male,
          female:res.data.female
        })
      }
    })
    var listUrl = `https://api.zhuishushenqi.com/ranking/54d42d92321052167dfb75e3`;
    wx.request({
      url: listUrl,
      success: function (res) {
        _this.setData({
          bookList: res.data.ranking.books
        })
        _this.cancelLoading();
      }
    })
  },
  setTab(e){
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    this.setData({
      titlenum:index,
      playIndex:id
    })
    this.getList(id);
  },
  seeBookDet(event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../details/details?id=' + id
    })
  },
  getList(id){
    this.showLoading();
    const _this = this;
    var listUrl = `https://api.zhuishushenqi.com/ranking/${id}`;
    wx.request({
      url: listUrl,
      success: function (res) {
        _this.setData({
          bookList: res.data.ranking.books
        })
        _this.cancelLoading();
      }
    })
  },
  navbarTap: function (e) {
    var vm = this;
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    this.data.tab = e.currentTarget.dataset.idx;
    if (this.data.tab == 0){
      this.getList('54d42d92321052167dfb75e3')
    } else {
      this.getList('54d43437d47d13ff21cad58b')
    }
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