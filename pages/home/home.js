// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    detailsList: [],
    isDel: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的书架'//页面标题为路由参数
    })
  },
  onShow: function () {
    this.getBookList();
  },
  getBookList(){
    const _this = this;
    this.showLoading();
    wx.getStorage({
      key: 'books',
      success: function (res) {
        _this.setData({
          bookList: res.data
        })
        _this.cancelLoading();
      }
    })
  },
  getDetail(name) {
    const _this = this;
    var url = `https://api.zhuishushenqi.com/book/fuzzy-search?query=${name}&start=0&limit=1`
    wx.request({
      url: url,
      success: function (res) {
        _this.setData({
          detailsList: res.data
        })
        _this.cancelLoading();
      }
    })
  },
  toSee(e) {
    this.showLoading();
    var id = e.currentTarget.dataset.id;
    const _this = this;
    wx.navigateTo({
      url: '../read/read?id=' + id
    })
    // this.cancelLoading();
  },
  remove: function (e) {
    const _this = this;
    var id = e.currentTarget.dataset.id;
    var arr = [];
    var j = 0;
    for (var i = 0; i < this.data.bookList.length; i++) {
      if (id != this.data.bookList[i]._id) {
        arr[j] = this.data.bookList[i];
        j++;
      }
    }
    wx.showModal({
      title: '确定删除吗',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          wx.setStorage({
            key: "books",
            data: arr
          })
          _this.getBookList();
        } else {
        }
      }
    });
  },
  showdel: function () {
    this.setData({
      isDel: !this.data.isDel
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