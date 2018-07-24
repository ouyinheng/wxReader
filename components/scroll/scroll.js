// components/scroll/scroll.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[],
      observer:function(){

      }
    },
    isLoadmore:{
      type:Boolean,
      value:false,
      observer:function(){}
    },
    cls:{
      type:Boolean,
      value:false,
      observer:function(){}
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
    loadmore:function(){
      this.triggerEvent('loadmore')
    },
    seeBookDet:function(e){
      var id = e.currentTarget.dataset.id;
      this.triggerEvent('seeBookDet', id)
    }
  }
})
