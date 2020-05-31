// pages/picture/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getList(options.pin_id)
  },
  getList(id) {
    wx.request({
      url: `https://huaban.com/pins/${id}/?katofk57`,
      header: {
        "X-Request": "JSON",
        "X-Requested-With": "XMLHttpRequest"
      },
      fail: (res) => { },
      success: (res) => {
        console.log(res.data.pin)
        this.setData({
          list: res.data.pin.board.pins
        })
      }
    })
  },
  previewimgs(e) {
    let index = e.currentTarget.dataset.index;
    let urlList = this.data.list.map(item => `http://hbimg.huabanimg.com/${item.file.key}`)
    wx.previewImage({
      current: urlList[index], // 当前显示图片的http链接 String
      urls: urlList // 需要预览的图片http链接列表 Array
    })
  },
  downPic(e) {
    let index = e.currentTarget.dataset.index;
    let urlList = this.data.list.map(item => `http://hbimg.huabanimg.com/${item.file.key}`)
    wx.downloadFile({
      url: urlList[index],　　　　　　　//需要下载的图片url
      success: function (res) {　　　　　　　　　　　　//成功后的回调函数
        wx.saveImageToPhotosAlbum({　　　　　　　　　//保存到本地
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (err) {
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              wx.openSetting({
                success(settingdata) {
                  console.log(settingdata)
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                  } else {
                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                  }
                }
              })
            }
          }
        })
      }
    });
  }
})