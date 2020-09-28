// pages/goods_list/index.js
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'综合',
        isActive:true
      },
      {
        id:1,
        value:'销量',
        isActive:false
      },
      {
        id:2,
        value:'价格',
        isActive:false
      },
    ],
    goods_list:[]
  },
  queryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPages:1,
  //事件监听
  handleTabsItemChange(e){
    const {index} = e.detail;
    let {tabs} = this.data;
    // 将tabs中的index项的isActive设置为true,其他项设置为false
    tabs.forEach((item,i)=>{
      if(index==i){
        item.isActive=true;
      }else{
        item.isActive=false;
      }
    })
    //赋值到data中
    this.setData({
      tabs
    })
  },
  // 网络请求
  // 获取商品列表数据
  async getGoodsList(){
    const res = await request({ 
      url:'/goods/search',
      data:this.queryParams
    })
    // console.log(res);
    //计算总页数
    this.totalPages = Math.ceil(res.total/this.queryParams.pagesize);
    this.setData({
      goods_list:[...this.data.goods_list,...res.goods]
    });
    wx.stopPullDownRefresh();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.queryParams.cid = options.cid;
    this.getGoodsList();
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
    this.setData({
      goods_list:[]
    })
    this.queryParams.pagenum = 1;
    // 发送请求
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.queryParams.pagenum >= this.totalPages){
      wx-wx.showToast({
        title: '没有下一页数据了'
      })
    }else{
      this.queryParams.pagenum++;
      // 再次发送请求
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})