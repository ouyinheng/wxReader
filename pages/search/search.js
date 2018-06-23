// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    list:[],
    bool:true,
    page:0,
    key:'',
    nextlist:[],
    height:'',
    limit:5,
    // weui
    inputShowed: false,
    inputVal: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '搜索'//页面标题为路由参数
    })
  },
  toSearch: function () {
    this.showLoading();
    const _this = this;
    const page = this.data.page;
    var key = this.data.inputVal;
    this.setData({
      key: _this.data.inputVal
    })
    var url = `https://api.zhuishushenqi.com/book/fuzzy-search?query=${key}&start=${page}&limit=5`
    wx.request({
      url: url,
      success: function (res) {
        _this.setData({
          bool: res.data.ok,
          list: res.data.books
        })
        _this.cancelLoading();
      }
    })
  },
  lower() {
    this.showLoading();
    const _this = this;
    var key = _this.data.key;
    var page = _this.data.page + 1;
    var limit = this.data.limit+5
    _this.setData({
      page: page + 1,
      limit: limit + 5
    })
    var url = `https://api.zhuishushenqi.com/book/fuzzy-search?query=${key}&start=${page}&limit=${limit}`
    wx.request({
      url: url,
      success: function (res) {
        _this.setData({
          bool: res.data.ok,
          nextlist: res.data.books
        })
        _this.cancelLoading();
        var result = _this.data.list;
        var resArr = res.data.books
        var cont = result.concat(resArr);
        if (!_this.data.bool) {
          wx.showToast({ //如果全部加载完成了也弹一个框
            title: '我也是有底线的',
            icon: 'success',
            duration: 300
          });
          return false;
        } else {
          _this.showLoading();
          _this.setData({
            list: res.data.books
          });
          _this.showLoading();
        }
      }
    })
  }, 
  seeBookDet:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../details/details?id=' + id
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
  },
  // weui
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      list:"",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    this.toSearch();
  }
})