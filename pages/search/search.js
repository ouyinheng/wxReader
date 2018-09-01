// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    list:[],
    page:0,
    limit: 7,
    key:'',
    inputShowed: false,
    inputVal: "",
    hasnext: true,
    isLoadmore:false,
    showLoad: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getListData(){
    var that = this;
    let { page, limit, inputVal } = this.data;
    this.setData({
      page: page,
      limit: limit,
      isLoadmore: true,
      showLoad:true
    })
    var url = `https://api.zhuishushenqi.com/book/fuzzy-search?query=${inputVal}&start=${page}&limit=${limit}`
    if (this.data.hasnext) {
      wx.request({
        url: url,
        success: function (res) {
          let list = that.data.list||[];
          list.push(...res.data.books)
          that.setData({
            list,
            isLoadmore: false,
            page: page+7
          })
        }
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
      inputShowed: false,
      showLoad: false
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
    this.getListData();
  }
})