// pages/home/home.js
import { getMultData, getGoodsData} from '../../service/home.js';
const types = ['pop','new','sell'];
const TOP_DISTANCE = 1000;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    recommends:[],
    titles: ['流行', '新款', '精选'],
    goods:{
      'pop': { page: 0, list: [] },
      'new': { page: 0, list: [] },
      'sell': { page: 0, list: [] }
    },
    currentType: 'pop',
    showBackTop:false
  },
  onLoad:function(options){
    //请求轮播图数据
    this._getMultData()

    //请求商品数据
    this._getGoodsData('pop');
    this._getGoodsData('new');
    this._getGoodsData('sell');
  },
  // -------------------------------网络请求函数----------------------------
  //请求轮播图数据
  _getMultData(){
    getMultData().then(res => {
      const banners = res.data.data.banner.list;  //首页轮播图数据
      const recommends = res.data.data.recommend.list;  //首页推荐数据
      this.setData({
        banners: banners,
        recommends: recommends
      })
    })
  },

  //请求商品数据
  _getGoodsData(type){

    // 获取页码
    const page = this.data.goods[type].page + 1;
    getGoodsData(type,page).then( res => {

      //1.取出数据
      const list = res.data.data.list;

      //2将数据设置到对应的type的list中
      const oldlist = this.data.goods[type].list;
      oldlist.push(...list)

      //3将数据设置到data中goods的list中
      const typekey = `goods.${type}.list`
      const pagekey = `goods.${type}.page` 
      this.setData({
        [typekey]: oldlist,
        [pagekey]: page

      })
    })
  },
  // -------------------------------事件监听函数--------------------------
  handletabclick(event){
    //取出index
    const index = event.detail.index
    
    //设置currentType
    this.setData({
      currentType: types[index]
  })
  },
  //监听到达底部上拉加载更多
  onReachBottom(){
    //上拉加载更多，请求新数据
    this._getGoodsData(this.data.currentType)
  },
  //监听页面滚动的位置
  onPageScroll(options){
    //取出scrollTop
    const scrolltop = options.scrollTop;

    //修改showBackTop属性
    const flag = scrolltop >= TOP_DISTANCE;
    if (flag != this.data.showBackTop){
      this.setData({
        showBackTop: scrolltop >= TOP_DISTANCE
      })
    }
  }
})





























