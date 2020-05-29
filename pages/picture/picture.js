// pages/picture/picture.js
Page({
	data: {
		beautyList: [],
		srcList: [],
		loadModal: true,
		fistHeight: 20,
		secondHeight: 20,
		width: 0
	},
	parseHtml(html) {
		let fileStr = html.split('app.page["pins"] = ')[1];
		fileStr = fileStr.split(';')[0];
		let imgList = JSON.parse(fileStr)
		let width = this.data.width;
		
		imgList.forEach((item, index) => {
			let fistHeight = this.data.fistHeight;
			let secondHeight = this.data.secondHeight;
			let scale = width / item.file.width;
			let height = item.file.height * scale;
			let top = 0;
			if(index > 1) {
				if(fistHeight <= secondHeight) {
					fistHeight = fistHeight + height * index + 10
					top = fistHeight;
				} else {
					secondHeight = secondHeight + height * index + 10
					top = secondHeight;
				}
			} else {
				top = 20;
			}
			item.top = top;
			item.left = (index % 2) * width + 10;
			this.setData({
				fistHeight,
				secondHeight
			})
		})
		this.setData({
			beautyList: imgList
		})
		console.log('beautyList', imgList)
		
	},
	getImgList() {
		wx.request({
			method: "get",
			url: 'https://huaban.com/favorite/beauty',
			fail: (res) => {},
			success: (result) => {
				this.parseHtml(result.data)
				this.setData({
					loadModal: false
				})
			},
		})
	},
	setStyle() {
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let width = wx.getSystemInfoSync().windowWidth * 0.48;
		this.setData({
			width
		})
		this.getImgList()
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})