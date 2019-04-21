// homePage/shortage/shortage.js
Page({
  data: {
    loadModal: false,
    postlist: []
  },
  onLoad: function (options) {
    this.getBookList();
    this.format('2019-04-20T16:30:23.059Z')
  },
  // 获取综合讨论区帖子列表
  getBookList() {
    this.setData({
      loadModal: true
    });
    const _this = this;
    wx.request({
      url: 'https://api.zhuishushenqi.com/post/by-block?block=ramble&duration=all&sort=updated&type=all&start=0&limit=20&distillate=',
      success(res) {
        _this.setData({
          loadModal: false,
          postlist: res.data.posts
        })
      } 
    })
  },
  format(time) {
    let date = new Date();
    time = new Date(time);
    console.log('asdf',date,time)
  }
})