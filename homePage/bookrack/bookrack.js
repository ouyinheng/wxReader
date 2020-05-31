Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    bookList: [],
    loading: true,
    noBook: true,
    loadModal: false
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      this.setData({
        loading: false
      })
      this.getBookList();
    }
  },
  methods: {
    getBookList() {
      const _this = this;
      wx.getStorage({
        key: 'books',
        success: function (res) {
          if (res.data.length > 0) {
            _this.setData({ bookList: res.data, noBook: false, loading: false, loadshow: false })
          } else {
            _this.setData({ bookList: res.data, noBook: true, loading: false, loadshow: false })
          }
        }

      })
      this.setData({
        loading: false
      })
    },
    toRead(e) {
      let id = e.currentTarget.dataset.id;
      let contentType = e.currentTarget.dataset.type;
      let url;
      if (contentType == 'picture') {
        url = '/pages/picture/picture?id=' + id
      } else {
        url = '/pages/read/read?id=' + id
      }
      wx.navigateTo({
        url
      });
    },
    // 删除书籍
    delBook(e) {
      let index = e.currentTarget.dataset.index;
      let books = [];
      let _this = this;
      wx.showModal({
        title: '提示',
        content: '确定删除吗',
        success(res) {
          if (res.confirm) {
            _this.setData({
              loadModal: true
            })
            wx.getStorage({
              key: 'books',
              success(res) {
                books = res.data;
                books.splice(index, 1);
                wx.setStorageSync('books', books);
                _this.setData({
                  loadModal: false
                })
                _this.refresh();
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    refresh: function () {
      this.setData({
        noBook: false,
        loading: true,
        loadshow: true
      })
      this.getBookList()
    }
  }
})
