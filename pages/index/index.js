// 导入request
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],
    categoryList:[],
    floorList:[]
  },

  // 网络请求
  // 获取swiper数据
  getSwiperListData(){
    request({url: '/home/swiperdata'})
    .then(result=>{
      this.setData({
        bannerList:result
      })
    })
  },

  // 获取导航分类数据
  getCategoryListData(){
    request({url: '/home/catitems'})
    .then(result=>{
      this.setData({
        categoryList:result
      })
    })
  },

  //获取楼层数据
  getFloorListData(){
    request({url: '/home/floordata'})
    .then(result=>{
      this.setData({
        floorList:result
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 发送请求轮播图数据
    // wx-wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       bannerList:result.data.message
    //     })
    //   },
    //   fail: (res) => {},
    //   complete: (res) => {},
    // }),
    this.getSwiperListData();
    this.getCategoryListData();
    this.getFloorListData();
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