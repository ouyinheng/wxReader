// homePage/reader/chapter/chapter.js
Page({
  data: {
    bookId: '',
    chapters: [],
    loading: false
  },
  onLoad: function (options) {
    var bookId = options.id;
    const _this = this;
    this.setData({
      bookId: options.id,
      loading: true
    })
    var url = `https://api.zhuishushenqi.com/mix-atoc/${bookId}?view=chapters`
    wx.request({
      url: url,
      success(res) {
        _this.setData({
          chapters: res.data.mixToc.chapters,
          loading: false
        })
        setTimeout(_ => {
          _this.setData({
            loadshow: false
          })
        }, 1000)
      }
    })
  },
  change(e) {
    var index = e.currentTarget.dataset.index;
    wx.redirectTo({
      url: '../reader?&id=' + this.data.bookId + '&index=' + index,
    })
  }
})