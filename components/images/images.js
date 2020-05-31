// components/images/images.js
Component({
  properties: {
    src: {
      type: 'String',
      value: '/lib/images/preimg.png'
    },
    classname: {
      type: 'String',
      value: ''
    }
  },
  data: {
    url: "/lib/images/preimg.jpg"
  },
  methods: {
    imgload(e) {
      this.setData({
        url: e.target.dataset.src
      })
    }
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
    }
  }
})
