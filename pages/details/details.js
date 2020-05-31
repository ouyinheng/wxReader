// pages/details/details.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		bookId: 0,
		detail: "",
		loading: false,
		isAdd: false,
		discussList: [], //评论列表
		loaddis: false, //加载评论,
        disStart: 0,
        chapter: [],
        id: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const bookId = options.id;
		this.isAddBooks(bookId);
		this.setData({
			bookId: options.id,
			loading: true,
		});
		// api.zhuishushenqi.com / book / 书籍id(_id)
		this.getBookInfo(bookId);
	},
	getBookInfo(bookId) {
        console.log(bookId)
        let id = bookId.split('/txt/')[1].split('/')[0]
		var url = `http://www.shuquge.com/${bookId}`
		const _this = this;
		wx.request({
			url: url,
			success: (res) => {
                let str = res.data;
                let detail = {
                    cover: str.split('<div class="cover">')[1].split('</div>')[0].split('src="')[1].split('"')[0] || '', //封面
                    title: str.split('<h2>')[1].split('</h2>')[0] || '',
                    author: str.split('span>分类：')[1].split('</span>')[0] || '',
                    majorCate: str.split('<span>作者：')[1].split('</span>')[0] || '', //分类
                    wordCount: str.split('<span>字数：')[1].split('</span>')[0] || '', //字数
                    latelyFollower: '', //人气
                    retentionRatio: '', //读者留存,
                    postCount: '', //社区帖子
                    serializeWordCount: '', //日更新字
                    longIntro: str.split('<span>简介：</span>')[1].split('<')[0]  || '', //简介

                }
                
                let chapter = [];
                let chapterStr = str.split('</dt>');
                chapterStr.splice(0, 2)
                chapterStr = chapterStr.join('oyh').split('</dl>')[0]
                chapterStr = chapterStr.split('<dd>').join('oyh').split('</dd>').join('oyh').split('oyh')
                chapterStr.forEach(item => {
                    if(item.indexOf('a') != -1) {
                        chapter.push({
                            link: item.split('<a href="')[1].split('">')[0].trim() || '',
                            name: item.split('>')[1].split('</a')[0] || ''
                        })
                    }
                })
                wx.setStorage({
                    key: "chapters",
                    data: chapter,
                });
				_this.setData({
                    detail,
                    chapter,
                    id,
					loading: false,
				});
			},
		});
	},
	toRead: function () {
		const _this = this;
		let url = `/pages/read/read?id=${this.data.id}&link=${this.data.chapter[0].link}&name=${this.data.chapter[0].name}&bookId=${this.data.bookId}`;
		wx.navigateTo({
			url,
		});
		// wx.getStorage({
		// 	key: "books",
		// 	success: function (res) {
		// 		if (Array.isArray(res.data)) {
		// 			var isCf = false;
		// 			for (var i = 0; i < res.data.length; i++) {
		// 				if (res.data[i]._id == _this.data.detail._id) {
		// 					isCf = true;
		// 				}
		// 			}
		// 			if (isCf) {
		// 				var value = res.data;
		// 			} else {
		// 				var value = res.data.concat(_this.data.detail);
		// 			}
		// 		} else {
		// 			var value = [];
		// 			if (res.data._id == _this.data.detail._id) {
		// 				value.unshift(res.data);
		// 			} else {
		// 				value.unshift(res.data);
		// 				value.unshift(_this.data.detail);
		// 			}
		// 		}
		// 		wx.setStorage({
		// 			key: "books",
		// 			data: value,
		// 		});
		// 	},
		// 	fail: function (res) {
		// 		var array = [];
		// 		array.unshift(_this.data.detail);
		// 		wx.setStorage({
		// 			key: "books",
		// 			data: array,
		// 		});
		// 	},
		// });
	},
	addReadRack: function () {
		if (this.data.isAdd) {
			wx.showToast({
				title: "已加入",
				icon: "success",
			});
			return;
		}
		const _this = this;
		wx.getStorage({
			key: "books",
			success: function (res) {
				var isCf = false;
				for (var i = 0; i < res.data.length; i++) {
					if (res.data[i]._id == _this.data.detail._id) {
						isCf = true;
					}
				}
				if (isCf) {
					var value = res.data;
				} else {
					var value = res.data.concat(_this.data.detail);
				}
				wx.setStorage({
					key: "books",
					data: value,
				});
			},
			fail: function (res) {
				var arr = [];
				arr.unshift(_this.data.detail);
				wx.setStorage({
					key: "books",
					data: arr,
				});
			},
		});
		wx.showToast({
			title: "添加成功",
			icon: "success",
		});
	},
	// 判断是否已存在书架中
	isAddBooks(bookId) {
		let index = -1;
		let _this = this;
		wx.getStorage({
			key: "books",
			success: function (res) {
				res.data.forEach((item, ind) => {
					if (item._id == bookId) {
						index = ind;
					}
				});
				if (index != -1) {
					_this.setData({
						isAdd: true,
					});
				}
			},
		});
	},
	loadmore() {
		this.getDiscussList(this.data.bookId);
	},
	
});
