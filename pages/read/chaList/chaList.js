// pages/read/chaList/chaList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId:0,
    chapters: [],
    loading: true,
    loadshow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var bookId = options.id;
    const _this = this;
    this.setData({
      bookId:options.id
    })
    var url = `https://api.zhuishushenqi.com/mix-atoc/${bookId}?view=chapters`
    wx.request({
      url: url,
      success(res){
        _this.setData({
          chapters: res.data.mixToc.chapters,
          loading:false
        })
        setTimeout(_ => {
          _this.setData({
            loadshow: false
          })
        }, 1000)
      }
    })
  },
  reverse(){
    var arr = this.data.chapters.reverse()
    this.setData({
      chapters: arr
    })
  },
  change(e){
    var index = e.currentTarget.dataset.index;
    console.log(index)
    wx.redirectTo({
      url: '../read?&id=' + this.data.bookId + '&index=' + index,
    })
  }
})