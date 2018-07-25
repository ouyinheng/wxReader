// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    list:[],
    page:0,
    key:'',
    height:'',
    limit:7,
    // weui
    inputShowed: false,
    inputVal: "",
    hasnext: true,
    canload:true,
    isLoadmore:false
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
    var url = `https://api.zhuishushenqi.com/book/fuzzy-search?query=${key}&start=${page}&limit=10`
    wx.request({
      url: url,
      success: function (res) {
        _this.setData({
          hasnext: res.data.ok,
          list: res.data.books,
        })
        _this.cancelLoading();
      }
    })
  },
  loadmore() {
    var that = this;
    var page = this.data.page+7;
    var limit = this.data.limit;
    var key = this.data.inputVal;
    this.setData({
      page:page,
      limit: limit,
      isLoadmore:true
    })
    var url = `https://api.zhuishushenqi.com/book/fuzzy-search?query=${key}&start=${page}&limit=${limit}`
    if(this.data.canload){
      this.setData({
        canload:false
      })
      if(this.data.hasnext){
        wx.request({
          url: url,
          success: function (res) {
            var arr = that.data.list;
            arr = arr.concat(res.data.books)
            that.setData({
              list: arr,
              isLoadmore: false,
              canload:true
            })
          }
        })
      } else {
        that.setData({
          isLoadmore: false,
          canload: true
        })
      }
    } else {
      that.setData({
        isLoadmore: false
      })
    }
  }, 
  seeBookDet:function(e){
    var id = e.detail;
    console.log(id)
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