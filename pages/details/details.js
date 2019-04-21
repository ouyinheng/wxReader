// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId: 0,
    detail: '',
    loading: false,
    isAdd: false,
    discussList: [],//评论列表
    loaddis: false,//加载评论,
    disStart: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bookId = options.id;
    this.isAddBooks(bookId)
    this.setData({
      bookId: options.id,
      loading: true
    })
    // api.zhuishushenqi.com / book / 书籍id(_id)
    this.getBookInfo(bookId);
    this.getDiscussList(bookId);
  },
  getBookInfo(bookId) {
    var url = "https://api.zhuishushenqi.com/book/" + bookId;
    const _this = this;
    wx.request({
      url: url,
      success: function (res) {
        _this.setData({
          detail: res.data,
          loading: false
        })
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
    if(this.data.isAdd) {
      wx.showToast({
        title: '已加入',
        icon: 'success'
      });
      return;
    }
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
  // 判断是否已存在书架中
  isAddBooks(bookId) {
    let index = -1;
    let _this = this;
    wx.getStorage({
      key: 'books',
      success: function(res) {
        res.data.forEach((item, ind) => {
          if (item._id == bookId) {
            index = ind
          }
        })
        if (index != -1) {
          _this.setData({
            isAdd: true
          })
        }
      }
    })
  },
  loadmore() {
    this.getDiscussList(this.data.bookId);
  },
  // 获取评论列表
  getDiscussList(id) {
    const _this = this;
    this.setData({
      loaddis: true
    })
    wx.request({
      url: `https://api.zhuishushenqi.com/post/review/by-book?book=${id}&sort=updated&type=normal&start=${this.data.disStart}&limit=20`,
      success(res) {
        _this.setData({
          discussList: _this.data.discussList.concat(res.data.reviews),
          loading: false,
          disStart: _this.data.disStart + 20,
          loaddis: false
        })
      }
    })
  }
})