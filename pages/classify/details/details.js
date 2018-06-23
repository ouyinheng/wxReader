// pages/fx/classify/details/details.js
Page({
  data: {
    height: '',
    res: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    booklist:[],
    nextlist:[],
    param:'',
    bool:true,
    nums:0,
    limit:10
  },
  lower() {
    const _this = this;
    this.setData({
      nums: _this.data.nums+10,
      limit:_this.data.limit+10
    })
    var num = this.data.nums;
    var limit = this.data.limit;
    var url = `https://api.zhuishushenqi.com/book/by-categories?gender=male&type=hot&major=${this.data.param}&minor=&start=${num}&limit=8`
    this.showLoading()
    wx.request({
      url: url,
      success: function (res) {
        _this.setData({
          nextlist: res.data.books,
          bool: res.data.ok
        })
        if (!_this.data.bool) {
          wx.showToast({ //如果全部加载完成了也弹一个框
            title: '我也是有底线的',
            icon: 'success',
            duration: 300
          });
          return false;
        } else {
          var result = _this.data.booklist;
          var resArr = _this.data.nextlist
          var cont = result.concat(resArr);
          _this.setData({
            booklist: cont
          })
        }
        _this.cancelLoading();
      }
    })
    
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
  seeBookDet(event){
    var id = event.currentTarget.dataset.id;
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