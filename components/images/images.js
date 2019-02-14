// components/images/images.js
Component({
  /**
   * 组件的属性列表
   */
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

  /**
   * 组件的初始数据
   */
  data: {
    url: "/lib/images/preimg.jpg"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    imgload(e) {
      console.log(e)
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
