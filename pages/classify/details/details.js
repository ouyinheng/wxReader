// pages/fx/classify/details/details.js
Page({
  data: {
    height: '',
    booklist:[],
    param:'',
    bool:true,
    page:0,
    limit:10,
    isLoadmore:false,
    canload:true,
    hasnext: true
  },

  onLoad: function (options) {
    const _this = this;
    this.setData({
      param: options.param
    })
    var par = options.param
    var cls = options.cls
    var url = `https://api.zhuishushenqi.com/book/by-categories?gender=${cls}&type=hot&major=${par}&minor=&start=0&limit=10`
    this.showLoading()
    wx.request({
      url: url,
      success: function (res) {
        _this.cancelLoading();
        _this.setData({
          booklist: res.data.books,
          bool:res.data.ok
        })
      }
    })
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        })
      }
    })
  },
  loadmore() {
    console.log('asdf')
    var that = this;
    var page = this.data.page + 10;
    var limit = this.data.limit;
    var param = this.data.param;
    this.setData({
      page: page,
      limit: limit,
      isLoadmore: true
    })
    var url = `https://api.zhuishushenqi.com/book/by-categories?gender=male&type=hot&major=${param}&minor=&start=${page}&limit=10`;
    if (this.data.canload) {
      this.setData({
        canload: false
      })
      if (this.data.hasnext) {
        wx.request({
          url: url,
          success: function (res) {
            var arr = that.data.booklist;
            arr = arr.concat(res.data.books)
            that.setData({
              booklist: arr,
              isLoadmore: false,
              canload: true
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
  seeBookDet(event){
    var id = event.detail;
    wx.navigateTo({
      url: '../../details/details?id=' + id
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