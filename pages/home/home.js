// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    detailsList: [],
    isDel: false,
    loading: true,
    loadshow: true
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
    this.setData({
      loading: false
    })
    this.getBookList();
    setTimeout(_ => {
      this.setData({
        loadshow: false
      })
    }, 1000)
  },
  getBookList(){
    const _this = this;
    wx.getStorage({
      key: 'books',
      success: function (res) {
        _this.setData({
          bookList: res.data
        })
      }
    })
  },
  getDetail(name) {
    this.loading();
    const _this = this;
    var url = `https://api.zhuishushenqi.com/book/fuzzy-search?query=${name}&start=0&limit=1`
    wx.request({
      url: url,
      success: function (res) {
        _this.setData({
          detailsList: res.data
        })
      }
    })
  },
  toSee(e) {
    var id = e.currentTarget.dataset.id;
    const _this = this;
    wx.navigateTo({
      url: '../read/read?id=' + id
    })
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
  }
})