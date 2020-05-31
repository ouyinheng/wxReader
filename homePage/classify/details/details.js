// homePage/classify/details/details.js
Page({
  data: {
    height: '',
    booklist: [],
    param: '',
    bool: true,
    page: 1,
    limit: 10,
    isLoadmore: false,
    hasnext: true,
    loading: false,
    loadshow: true
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      param: options.param,
      gender: options.cls,
    })
    this.loadmore();
  },
  loadmore() {
    let that = this;
    let { page, limit, param } = this.data;
    this.setData({
      page: page,
      limit: limit,
      isLoadmore: true,
      loading: true
    })
    if (this.data.hasnext) {
      let url = `https://api.zhuishushenqi.com/book/by-categories?gender=${this.data.gender}&type=hot&major=${param}&minor=&start=${page}&limit=10`;
      wx.request({
        url: url,
        success: function (res) {
          let arr = that.data.booklist;
          arr.push(...res.data.books)
          that.setData({
            page: page + 10,
            booklist: arr,
            isLoadmore: false,
            canload: true,
            loadshow: false,
            loading: false
          })
        }
      })
    }
  },
  seeBookDet(event) {
    console.log(event)
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/details/details?id=' + id
    })
  },
  showLoading: function () {
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    });
  }
})