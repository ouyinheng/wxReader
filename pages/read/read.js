// pages/read/read.js
Page({
	data: {
		bookId: null, //id
		bookInfo: null, //书籍信息，包含章节
		linknum: 0,
		title: [], //title
		content: [], //小说内容
		footerBool: false, //是否显示工具栏
		modalBool: false, //目录是否显示
		pro: 0, //进度
		showSetup: false,
		style: {
			color: "#000", //字体颜色
			background: "#fff", //背景
			fontSize: 16,
		},
		loading: true,
        loadshow: true,
        link: '',
        chapterId: ''
	},
	onLoad: function (options) {
		var that = this;
		this.setData({
            bookId: options.id,
            link: options.link,
            chapterId: options.bookId,
            title: options.name
        });
        that.getContent();
	},
	onUnload() {
		wx.reLaunch({
			url: "/pages/main",
		});
	},
	//获取章节内容,改变linknum就能跳转
	getContent() {
		const that = this;
		var bookId = this.data.bookId;
		var link = this.data.link;
		var url = `http://www.shuquge.com/txt/${bookId}/${link}`;
		wx.request({
			url: url,
			success: function (res) {
                let content = res.data.split('class="showtxt">')[1].split('</div>')[0].split('<br/>').join('').split('<br/>').join('').split('&nbsp;&nbsp;&nbsp;&nbsp;')
                that.setData({
                    content,
                    loading: false
				});
			},
		});
	},
	//loadmore
	onReachBottom: function () {
		var that = this;
		// 显示加载图标
		this.getContent();
	},
	//显示工具栏
	showOp() {
		var that = this;
		this.setData({
			footerBool: !that.data.footerBool,
			showSetup: false,
		});
	},
	//进度
	getProcess() {
		var that = this;
		var asj = this.data.bookInfo.mixToc.chapters.length;
		var now = wx.getStorageSync(this.data.bookId).linknum;
		var pro = (now / asj) * 100;
		this.setData({
			pro: pro,
		});
	},
	//目录
	showCatalog() {
		wx.navigateTo({
			url: `chaList/chaList?id=${this.data.bookId}&chapterId=${this.data.chapterId}`,
		});
		// this.setData({
		//   modalBool:true,
		//   footerBool:false
		// })
	},
	// 夜间模式
	tonight() {
		if (this.data.style.background == "#fff") {
			this.setData({
				style: {
					background: "#000",
					color: "#adadad",
				},
			});
			wx.setNavigationBarColor({
				frontColor: "#ffffff",
				backgroundColor: "#000000",
				animation: {
					duration: 400,
					timingFunc: "easeIn",
				},
			});
		} else {
			this.setData({
				style: {
					background: "#fff",
					color: "#000",
				},
			});
			wx.setNavigationBarColor({
				frontColor: "#000000",
				backgroundColor: "#ffffff",
				animation: {
					duration: 400,
					timingFunc: "easeIn",
				},
			});
		}
	},
	//设置
	showSetup() {
		const bool = this.data.showSetup;
		this.setData({
			showSetup: !bool,
		});
	},
	addSize() {
		var that = this;
		if (that.data.style.fontSize < 24) {
			this.setData({
				style: {
					fontSize: that.data.style.fontSize + 1,
				},
			});
		}
	},
	delSize() {
		var that = this;
		if (that.data.style.fontSize > 12) {
			this.setData({
				style: {
					fontSize: that.data.style.fontSize - 1,
				},
			});
		}
	},
	//缓存100章
	setCache() {},
	goBack() {
		wx.navigateBack();
	},
});
