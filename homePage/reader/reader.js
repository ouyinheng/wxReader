// homePage/reader/reader.js
Page({
  data: {
    bookId: null,//id
    linknum: 0,//看到了哪一章
    bookInfo: {},//小说信息,包括章节
    title: [],//章节名
    content: [],//小说内容
    style: {
      fontSize: 16,
      background: 'transparent'
    }
  },
  onLoad: function (options) {
    console.log(options)
    var that = this;
    this.setData({
      bookId: options.id,
      loading: true
    })
    // 获取看到了哪一章
    var linknum = wx.getStorageSync(options.id).linknum;
    if (linknum) {
      this.setData({
        linknum: linknum
      })
    }
    // 跳转
    if (options.index) {
      this.setData({
        linknum: options.index
      })
    }
    //获取小说全部章节
    var url = `https://api.zhuishushenqi.com/mix-atoc/${options.id}?view=chapters`;
    wx.request({
      url: url,
      success(req) {
        that.setData({
          bookInfo: req.data
        })
        that.getContent();
      }
    })
  },
  onUnload() {
    wx.reLaunch({
      url: '/pages/main'
    })
  },
  getContent() {
    const _this = this;
    const link = escape(this.data.bookInfo.mixToc.chapters[this.data.linknum].link);//url编码
    const title = this.data.bookInfo.mixToc.chapters[this.data.linknum].title;
    var url = `https://chapterup.zhuishushenqi.com/chapter/${link}?cv=1481275033588`
    this.setData({
      title: this.data.title.concat([title])
    })
    wx.request({
      url: url,
      success: function (res) {
        let arr = res.data.chapter.body.split('\n');
        _this.setData({
          content: _this.data.content.concat([arr]),
          loading: false
        })
      }
    })
  },
  onReachBottom: function () {

  },
  goBack() {
    wx.navigateBack()
  },
  // 夜间模式
  setNight() {
    if (this.data.style.background ==='transparent') {
      let style = this.data.style;
      style.background = '#000000';
      console.log(style)
      this.setData({
        style
      })
    } else {
      let style = this.data.style;
      style.background = 'transparent';
      console.log(style)
      this.setData({
        style
      })
    }
  },
  setChapter() {
    wx.navigateTo({
      url: '/homePage/reader/chapter/chapter?id=' + this.data.bookId
    })
  }
})