// components/list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Object,
      value: {},
      observer() {
        // console.log(this.properties.list)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toRead() {
      this.triggerEvent('toRead', this.data.list._id)
    }
  },
  created() {
  }
})
