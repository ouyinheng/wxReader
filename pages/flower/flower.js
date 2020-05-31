// pages/picture/picture.js
Page({
	data: {
		firstList: [],
		secondList: [],
		srcList: [],
		loadModal: true,
		fistHeight: 0,
		secondHeight: 0,
		width: 0,
		pin_id: '',
		hasMore: true
	},
	parseHtml(html) {
		let fileStr = html.split('app.page["pins"] = ')[1];
		fileStr = fileStr.split(';')[0];
		let imgList = JSON.parse(fileStr)
		this.setDatas(imgList)
	},
	setDatas(list) {
		this.setData({
			pin_id: list[list.length-1]['pin_id']
		})
		let firstList = this.data.firstList;
		let secondList = this.data.secondList;
		list.forEach(item => {
			if(this.data.fistHeight <= this.data.secondHeight) {
				firstList.push(item)
				this.setData({
					fistHeight: this.data.fistHeight + item.file.height
				})
			} else {
				secondList.push(item)
				this.setData({
					secondHeight: this.data.secondHeight + item.file.height
				})
			}
		})
		this.setData({
			firstList,
			secondList
		})
	},
	getImgList() {
		wx.request({
			method: "get",
			url: 'https://huaban.com/favorite/beauty',
			fail: (res) => {
				wx.showToast({
					title: res.data,
					icon: 'success',
					duration: 2000
				})
			},
			success: (result) => {
				this.parseHtml(result.data)
				this.setData({
					loadModal: false
				})
			},
		})
	},
	loadMore() {
		wx.request({
			method: 'get',
			url: `https://huaban.com/favorite/beauty?katofk4i&max=${this.data.pin_id}&limit=20&wfl=1`,
			header: {
				"X-Request": "JSON",
				"X-Requested-With": "XMLHttpRequest"
			},
			fail: (res) => {},
			success: (res) => {
				this.setData({
					hasMore: res.data.pins.length > 0
				})
				if(res.data.pins.length >0) this.setDatas(res.data.pins)
			}
		})
	},
	setStyle() {
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let width = wx.getSystemInfoSync().windowWidth * 0.5;
		this.setData({
			width
		})
		this.getImgList()
	},
  toDetails(e) {
    wx.navigateTo({
      url: `/pages/flower/details/details?pin_id=${e.currentTarget.dataset.pin_id}`,
    })
  }
})