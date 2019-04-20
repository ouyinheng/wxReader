// homePage/ranklist/ranklist.js
const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      const _this = this;
      this.setData({
        loadModal: true
      })
      var url = `https://api.zhuishushenqi.com/ranking/gender`;
      wx.request({
        url: url,
        success: function (res) {
          _this.setData({
            ranklist: res.data,
            loadModal: false
          })
        }
      })
      this.getList('54d42d92321052167dfb75e3')
    }
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TabCur: 1,
    scrollLeft: 0,
    clslist: [
      { ch: '男生', eg: 'male' },
      { ch: '女生', eg: 'female' },
      { ch: '出版', eg: 'epub' },
      { ch: '漫画', eg: 'picture' }
    ],
    btactive: 0,
    active: 'male',
    ranklist: {},
    booklist: [],
    rankactive: 0,
    loadModal: false
  },
  methods: {
    // 设置btactive
    setbtactive(e) {
      let btactive = e.currentTarget.dataset.active;
      this.setData({
        btactive,
        rankactive: 0
      })
    },
    getUserInfo: function (e) {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    tabSelect(e) {
      console.log(e);
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    },
    setRankActive(e) {
      this.setData({
        rankactive: e.currentTarget.dataset.index
      })
      this.getList(e.currentTarget.dataset.id);
    },
    getList(id) {
      this.setData({
        bookList: [],
        loading: true,
        loadModal: true
      })
      let _this = this;
      wx.request({
        url: 'https://api.zhuishushenqi.com/ranking/' + id,
        success: function (res) {
          _this.setData({
            bookList: res.data.ranking.books,
            loading: false,
            loadModal: false
          })
          _this.hideModal();
        }
      })
    },
    toRead(e) {
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/details/details?id=' + id
      })
    }
  }
})
