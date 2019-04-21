// homePage/classify/classify.js
Component({
  options: {
    addGlobalClass: true,
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      const _this = this;
      wx.request({
        url: "https://api.zhuishushenqi.com/cats/lv2/statistics",
        success: function (res) {
          _this.cancelLoading();
          _this.setData({
            classifyList: res.data,
            loading: false
          })
          setTimeout(_ => {
            _this.setData({
              loadshow: false
            })
          }, 1000)
        }
      })
    }
  },
  data: {
    classifyList: '123',
    loading: true,
    loadshow: true,
    active: 'male',
    gender: {
      male: '男生',
      female: '女生',
      press: '出版',
      picture: '漫画'
    }
  },
  methods: {
    //获取分类详情
    goDetails: function (event) {
      var params = event.currentTarget.dataset.params;
      var cls = event.currentTarget.dataset.cls;
      wx.navigateTo({
        url: '/homePage/classify/details/details?param=' + params.name + '&cls=' + cls
      })
    },
    setActive(e) {
      let id = e.target.dataset.id;
      if (id == this.data.active) return;
      this.showLoading();
      this.setData({
        active: id
      })
      this.cancelLoading();
    },
    showLoading: function () {
      this.setData({
        loading: true
      })
    },
    cancelLoading: function () {
      setTimeout(() => {
        this.setData({
          loading: false
        })
      }, 500)
    }
  }
})
