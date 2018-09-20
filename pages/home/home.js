// pages/home/home.js
Page({
  data: {
    bookList: [],
    detailsList: [],
    isDel: false,
    loading: true,
    noBook: true,
    loadshow: true,
    start: 0,
    move: 0,
    end: 0,
    distance: 0,
    ind: ''
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
          _this.setData({ bookList: res.data, noBook: false, loading: false, loadshow: false })
        } else {
          _this.setData({ bookList: res.data, noBook: true, loading: false, loadshow: false })
        }
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
  delstart(e) {
    let start = e.changedTouches[0].clientX;
    let index = e.currentTarget.dataset.index;
    this.setData({start,ind: index, distance: 0})
  },
  delmove(e){
    let move = e.changedTouches[0].clientX;
    let distance = move-this.data.start;
    if(distance<=-80){
      distance = -80
    } else if(distance>=0) {
      distance = 0
    }
    this.setData({move, distance})
  },
  delend(e) {
    let end = e.changedTouches[0].clientX;
    let distance = end-this.data.start;
    if(distance<=-20){
      distance = -80
    } else {
      distance = 0
    }
    this.setData({end, distance})

  },
  remove: function (e) {
    const _this = this;
    var id = e.currentTarget.dataset.id;
    let list = this.data.bookList;
    let arr = list.filter((item,index)=>{
      return item._id != id;
    })
    wx.setStorage({
      key: "books",
      data: arr
    })
    _this.getBookList();
  },
  setind(){
    this.setData({
      distance: 0
    })
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