// pages/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        value: '',
        list: [],
        page: 0,
        limit: 20,
        key: '',
        inputShowed: false,
        inputVal: "",
        hasnext: true,
        isLoadmore: false,
        showLoad: false,
        searchValue: '',
        history: [],
        auto: []
    },

  /**
   * 生命周期函数--监听页面加载
   */
  	getListData() {
		this.showLoading();
		var that = this;
		let {
            page,
            limit,
            searchValue
		} = this.data;
		this.setData({
			page: page,
			limit: limit,
			isLoadmore: true,
			showLoad: true
		})
		// var url = `https://api.zhuishushenqi.com/book/fuzzy-search?query=${searchValue}&start=${page}&limit=${limit}`
		let url = `http://www.shuquge.com/search.php`;
		if (this.data.hasnext) {
			wx.request({
				methods: 'post',
				url: url,
				data: {
					s: '6445266503022880974',
					searchkey: searchValue
				},
				success: (res) => {
					let str = res.data;
					let list = str.split('<div class="bookbox">')
					list.splice(0, 1)
					let bookList = list.map(item => {
						return {
							title: item.split('class="bookname">')[1].split('</a>')[0].split('>')[1],
							link: item.split('class="bookname">')[1].split('</a>')[0].split('href="')[1].split('">')[0],
							tag: item.split('class="cat">分类：')[1].split('</div>')[0],
							author: item.split('class="author">作者：')[1].split('</div>')[0]
						}
                    })
					this.setData({
						list: bookList
					})
					that.cancelLoading();
				}
			})
		}
    },
	seeBookDet: function(e) {
		var id = e.detail;
		wx.navigateTo({
			url: '../details/details?id=' + id
		})
	},
  	showLoading: function() {
		wx.showToast({
			title: '加载中',
			icon: 'loading'
		});
  	},
	cancelLoading: function() {
		wx.hideToast();
	},
  // weui
	showInput: function() {
		this.setData({
			inputShowed: true
		});
	},
	hideInput: function() {
		this.setData({
			inputVal: "",
			list: "",
			inputShowed: false,
			showLoad: false
		});
	},
	clearInput: function() {
		this.setData({
			inputVal: ""
		});
	},
	inputTyping: function(e) {
		if (!e.detail.value) {
			this.setData({
				list: [],
				auto: []
			})
			return;
		}
		this.setData({
			searchValue: e.detail.value
		});
		this.getAuto()
	},
	getAuto() {
		let _this = this;
		wx.request({
			url: `https://api.zhuishushenqi.com/book/auto-complete?query=${this.data.searchValue}`,
			success(res) {
				_this.setData({
				auto: res.data.keywords
				})
			}
		})
	},
  	searchbook() {
		if (!this.data.searchValue) return;
		let history = [];
		history.push(this.data.searchValue)
		let res = wx.getStorageSync('history')
		if (!res) {
			wx.setStorageSync('history', history)
		} else {
			history = history.concat(res)
			if (history.length > 10) history.splice(10, 1)
			history = Array.from(new Set(history))
			wx.setStorageSync('history', history)
		}
		this.setData({
			history,
			page: 0
		})
		this.getListData();
  	},
	searchbooks(e) {
		let item = e.target.dataset.item;
		this.setData({
			searchValue: item
		})
		this.searchbook();
	},
	toRead(e) {
		let id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: '/pages/details/details?id=' + id
		})
	},
	onShow() {
		let _this = this;
		wx.getStorage({
			key: 'history',
			success(res) {
				history = res.data;
				_this.setData({
				history
				})
			}
		});
	},
	del(e) {
		let index = e.target.dataset.id;
		let data = this.data.history;
		let _this = this;
		data.splice(index, 1);
		wx.showModal({
			title: '提示',
			content: '确定删除吗',
			success(res) {
				if (res.confirm) {
					_this.setData({
						history: data
					})
					wx.setStorageSync('history', data)
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	}
})