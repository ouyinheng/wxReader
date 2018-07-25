// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId: 0,
    detail: '',
    loading: true,
    loadshow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '书籍详情'//页面标题为路由参数
    })
    const bookId = options.id;
    const _this = this;
    this.setData({
      bookId: options.id
    })
    // api.zhuishushenqi.com / book / 书籍id(_id)
    var url = "https://api.zhuishushenqi.com/book/" + bookId;
    wx.request({
      url: url,
      success: function (res) {
        _this.setData({
          detail: res.data,
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
  toRead: function () {
    const _this = this;
    wx.navigateTo({
      url: '../read/read?id=' + this.data.bookId
    })
    wx.getStorage({
      key: 'books',
      success: function (res) {
        if (Array.isArray(res.data)){
          var isCf = false;
          for(var i=0;i<res.data.length;i++){
            if (res.data[i]._id == _this.data.detail._id) {
              isCf = true;
            }            
          }
          if(isCf){
            var value = res.data;
          } else {
            var value = res.data.concat(_this.data.detail);
          }
        } else {
          var value = [];
          if(res.data._id == _this.data.detail._id){
            value.unshift(res.data);
          } else {
            value.unshift(res.data);
            value.unshift(_this.data.detail);
          }
        }
        wx.setStorage({
          key: 'books',
          data: value
        })
      },
      fail:function(res){
        var array = [];
        array.unshift(_this.data.detail)
        wx.setStorage({
          key: 'books',
          data: array
        })
      }
    })
  },
  addReadRack:function(){
    const _this = this;
    wx.getStorage({
      key: 'books',
      success: function (res) {
        var isCf = false;
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i]._id == _this.data.detail._id) {
            isCf = true;
          }
        }
        if (isCf) {
          var value = res.data;
        } else {
          var value = res.data.concat(_this.data.detail);
        }
        wx.setStorage({
          key: 'books',
          data: value
        })
      },
      fail: function (res) {
        var arr = [];
        arr.unshift(_this.data.detail)
        wx.setStorage({
          key: 'books',
          data: arr
        })
      }
    })
    wx.showToast({
      title: '添加成功',
      icon: 'success'
    });
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