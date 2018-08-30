// pages/home/home.js
Page({
  data: {
    bookList: [],
    detailsList: [],
    isDel: false,
    loading: true,
    noBook: true,
    loadshow: true
  },
  onShow: function () {
    this.setData({
      loading: true
    })
    this.getBookList();
  },
  getBookList(){
    const _this = this;
    wx.getStorage({
      key: 'books',
      success: function (res) {
        if(res.data.length>0){
          _this.setData({
            bookList: res.data,
            noBook: false,
            loading: false
          })
        } else {
          _this.setData({
            bookList: res.data,
            noBook: true,
            loading: false
          })
        }
        setTimeout(_=>{
          _this.setData({
            loadshow: false
          })
        },1000)
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
      }
    })
  },
  toSee(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../read/read?id=' + id
    })
  },
  remove: function (e) {
    const _this = this;
    var id = e.currentTarget.dataset.id;
    let list = this.data.bookList;
    let arr = list.filter((item,index)=>{
      return item._id != id;
    })
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
  showdel:function() {
    this.setData({
      isDel: !this.data.isDel
    })
  },
  refresh:function(){
    this.setData({
      noBook: false,
      loading: true,
      loadshow: true
    })
    this.onShow()
  }
})