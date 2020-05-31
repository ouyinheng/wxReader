// pages/picture/picture.js
const app = getApp();

Page({
  data: {
    id: '',
    num: -1,
    hideInfo: {},
    bookInfo: {},
    content: {},
    loadModal: false,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
  },
  onLoad: function (options) {
    let id = options.id;
    const that = this;
    this.setData({
      id,
      loadModal: true
    })
    this.getNum().then((res) => {
      that.setData({
        num: res
      })
      that.getHideId(id);
    }).catch(() => {
      that.setData({
        num:0
      })
      wx.setStorage({
        key: that.data.id,
        data: 0
      })
      that.getHideId(id);
    })
  },
  onShow: function() {
    const num = wx.getStorageSync(this.data.id);
    if (this.data.num!=-1&&this.data.num!=num) {
      this.setData({
        num,
        content: '',
        loadModal: true
      })
      this.getPictureContent(this.data.bookInfo.chapters[num].link)
    }
  },
  getNum() {
    const that = this;
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: that.data.id,
        success: function (res) {
          resolve(res.data)
        },
        fail: function (res) {
          reject()
        }
      })
    })
  },
  getHideId(id) {
    const that = this;
    wx.request({
      url: `https://api.zhuishushenqi.com/btoc?view=summary&book=${id}`,
      success: function (res) {
        that.setData({
          hideInfo: res.data[0]
        })
        that.getPictureList(res.data[0]._id);
      },
      fail() {
        that.setData({
          loadModal: false
        })
      }
    })
  },
  getPictureList(id) {
    const that = this;
    wx.request({
      url: `https://api.zhuishushenqi.com/btoc/${id}?view=chapters&channel=mweb&platform=h5`,
      success: function(res) {
        that.setData({
          bookInfo: res.data
        })
        that.getPictureContent(res.data.chapters[that.data.num].link);
        wx.setStorage({
          key: that.data.id,
          data: that.data.num
        })
      },
      fail() {
        that.setData({
          loadModal: false
        })
      }
    })
  },
  getPictureContent(url) {
    const that = this;
    wx.request({
      url: `https://chapter2.zhuishushenqi.com/picture/${url}`,
      success: function (res) {
        let imgs = res.data.chapter.images.split(',');
        res.data.imgs = imgs;
        that.setData({
          content: res.data,
          loadModal: false
        })
        wx.setStorage({
          key: that.data.id,
          data: that.data.num
        })
      },
      fail() {
        that.setData({
          loadModal: false
        })
      }
    })
  },
  next() {
   
    const that = this;
    let num = this.data.num+1;
    if (num==this.data.bookInfo.chapters.length) {
      return;
    }
    this.setData({
      num,
      content: '',
      loadModal: true
    })
    this.getPictureContent(this.data.bookInfo.chapters[num].link)
  },
  prev() {
    const that = this;
    let num = this.data.num - 1;
    this.setData({
      num,
      content: '',
      loadModal: true
    })
    this.getPictureContent(this.data.bookInfo.chapters[num].link)
  },
  toChapters() {
    wx.navigateTo({
      url: `/pages/picture/chapters/chapters?id=${this.data.hideInfo._id}&_id=${this.data.id}`,
    })
  }
})