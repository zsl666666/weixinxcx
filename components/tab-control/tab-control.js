// components/tab-control/tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handle(event){
      const index = event.currentTarget.dataset.index;
      this.setData({
        currentIndex: index
      })

      //发出事件
      const data = {index: this.data.currentIndex}
      this.triggerEvent("tabclick",data,{})
    }
  }
})
