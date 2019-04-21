// pages/read/read.js
Page({
  data: {
    bookId: null,//id
    bookInfo: null,//书籍信息，包含章节
    linknum: 0,
    title: [],//title
    content: [],//小说内容
    footerBool: false,//是否显示工具栏
    modalBool: false,//目录是否显示
    pro: 0,//进度
    showSetup: false,
    style: {
      color: '#000',//字体颜色
      background: "#fff",//背景
      fontSize: 16
    },
    loading: true,
    loadshow: true
  },
  onLoad: function (options) {
    console.log(options)
    var that = this;
    this.setData({
      bookId: options.id
    })
    var linknum = wx.getStorageSync(options.id).linknum;
    if (linknum) {
      this.setData({
        linknum: linknum
      })
    }
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
          bookInfo: req.data,
          loading:false
        })
        setTimeout(_ => {
          that.setData({
            loadshow: false
          })
        }, 1000)
        that.getContent();
      }
    })
  },
  onUnload() {
    wx.reLaunch({
      url: '/pages/main'
    })
  },
  //获取章节内容,改变linknum就能跳转
  getContent() {
    const that = this;
    var bookId = this.data.bookId;
    var linknum = this.data.linknum;
    var bookInfo = this.data.bookInfo;
    var link = escape(bookInfo.mixToc.chapters[linknum].link);//url编码
    var title = bookInfo.mixToc.chapters[linknum].title;//title
    var url = `https://chapterup.zhuishushenqi.com/chapter/${link}?cv=1481275033588`
    wx.request({
      url: url,
      success: function (res) {
        var nextcontent = res.data.chapter.body.split('\n');
        var nowcontent = that.data.content;
        nowcontent.push(nextcontent);
        var nexttitle = title;
        var nowtitle = that.data.title;
        nowtitle.push(nexttitle);
        that.setData({
          title: nowtitle,
          content: nowcontent,
          linknum: Number(linknum) + 1
        })
        wx.setStorage({
          key: bookId,
          data: {
            linknum: linknum
          },
        })
        that.getProcess()
      }
    })
  },
  //loadmore
  onReachBottom: function () {
    var that = this;
    // 显示加载图标  
    this.getContent();
  },
  //显示工具栏 
  showOp() {
    var that = this;
    this.setData({
      footerBool: !that.data.footerBool,
      showSetup: false
    })
  },
  //进度
  getProcess() {
    var that = this;
    var asj = this.data.bookInfo.mixToc.chapters.length;
    var now = wx.getStorageSync(this.data.bookId).linknum;
    var pro = (now / asj) * 100;
    this.setData({
      pro: pro
    })
  },
  //目录
  showCatalog() {
    wx.navigateTo({
      url: 'chaList/chaList?id=' + this.data.bookId,
    })
    // this.setData({
    //   modalBool:true,
    //   footerBool:false
    // })
  },
  // 夜间模式
  tonight() {
    if (this.data.style.background == '#fff') {
      this.setData({
        style: {
          background: "#000",
          color: "#adadad"
        }
      })
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#000000',
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
    } else {
      this.setData({
        style: {
          background: "#fff",
          color: "#000"
        }
      })
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff',
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
    }
  },
  //设置
  showSetup() {
    const bool = this.data.showSetup;
    this.setData({
      showSetup: !bool
    })
  },
  addSize() {
    var that = this;
    if (that.data.style.fontSize < 24) {
      this.setData({
        style: {
          fontSize: that.data.style.fontSize + 1
        }
      })
    }
  },
  delSize() {
    var that = this;
    if (that.data.style.fontSize > 12) {
      this.setData({
        style: {
          fontSize: that.data.style.fontSize - 1
        }
      })
    }
  },
  //缓存100章
  setCache() {
    
  },
  goBack() {
    wx.navigateBack()
  }
})