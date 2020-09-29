// pages/goods_detail/index.js
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id:'',
    goosDetailData:[],
  },
  goodsInfo:[],
  // 事件监听
  handlePreviewImage(e){
    let urls = this.goodsInfo.pics.map(v=>v.pics_mid);
    wx.previewImage({
      current: e.currentTarget.dataset.url, 
      urls: urls
    })
  },
  //加入购物车
  handleCartAdd(){
    //查看缓存中是否有该商品，无则新增，有则该商品数量++,第一次获取无缓存返回空字符串，转为[]
    let cartArr = wx.getStorageSync('cart')||[];
    let index = cartArr.findIndex(v=>v.goods_id==this.data.goods_id);
    if(index==-1){
      this.goodsInfo.goods_num=1;
      cartArr.push(this.goodsInfo)
    }else{
      cartArr[index].goods_num++;
    }
    wx.setStorageSync('cart', cartArr);
    wx-wx.showToast({
      title: '加购成功',
      mask: true
    })
  },
  // 网络请求
  async getGoodsDetailData(){
    const res = await request({
      url:"/goods/detail",
      data:{
        goods_id:this.data.goods_id
      }
    })
    this.goodsInfo = res;
    this.setData({
      goosDetailData:res
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goods_id:options.goods_id
    })
    this.getGoodsDetailData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})