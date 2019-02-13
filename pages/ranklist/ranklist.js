// pages/ranklist/ranklist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ranklist: {},
    clslist: [
      { ch: '男生', eg: 'male' },
      { ch: '女生', eg: 'female' },
      { ch: '出版', eg: 'epub' },
      { ch: '漫画', eg: 'picture' }
    ],
    active: 0,
    rankacitve: 0,
    bookList: [],
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    var url = `https://api.zhuishushenqi.com/ranking/gender`;
    wx.request({
      url: url,
      success: function (res) {
        _this.setData({
          ranklist: res.data
        })
      }
    })
    this.getList('54d42d92321052167dfb75e3')
  },
  setActive(e) {
    let active = e.target.dataset.index
    if(active==this.data.active)return;
    this.setData({
      active,
      rankacitve: 0
    })
    let id = this.data.ranklist[this.data.clslist[active].eg][0]._id
    this.getList(id)
  },
  setRankActive(e) {
    this.setData({
      rankacitve: e.target.dataset.index
    })
    this.getList(e.target.dataset.id)
  },
  getList(id) {
    this.setData({
      bookList: [],
      loading: true
    })
    let _this = this;
    wx.request({
      url: 'https://api.zhuishushenqi.com/ranking/' + id,
      success: function (res) {
        _this.setData({
          bookList: res.data.ranking.books,
          loading: false
        })
      }
    })
  },
  toRead(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/details/details?id=' + id
    })
  }
})