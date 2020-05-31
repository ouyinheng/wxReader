// pages/read/chaList/chaList.js
Page({
	data: {
		bookId: 0,
		chapters: [],
		loading: true,
        loadshow: true,
        id: '',
        bookId: ''
	},
	onLoad: function (options) {
        console.log(options)
        this.setData({
            id: options.id,
            bookId: options.chapterId
        })
		wx.getStorage({
			key: "chapters",
			success: (res) => {
				this.setData({
					chapters: res.data,
					loadshow: false,
				});
			},
		});
	},
	reverse() {
		var arr = this.data.chapters.reverse();
		this.setData({
			chapters: arr,
		});
	},
	change(e) {
		var index = e.currentTarget.dataset.index;
		let url = `/pages/read/read?id=${this.data.id}&link=${this.data.chapters[index].link}&name=${this.data.chapters[index].name}&bookId=${this.data.bookId}`;
		wx.redirectTo({
			url,
		});
	},
});
