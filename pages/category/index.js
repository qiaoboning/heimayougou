import {request} from '../../request/index.js'
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:0,
    //左侧菜单数据
    leftMenuList:[],
    // 右侧内容数据
    rightContentList:[],
    cates:[],
    scrollTop:0
  },
  // 事件监听
  clickLeftMenu(e){
    // console.log(e);
    const {index} = e.currentTarget.dataset;
    let rightContentList = this.cates[index].children;
    this.setData({
      currentIndex:index,
      rightContentList,
      scrollTop:0
    })
  },

  // 网络请求
  //获取分类页面数据
  // getCateList(){
  //   request({
  //     "url":"/categories"
  //   }).then(res=>{
  //     // console.log(res.data.message);
  //     this.cates=res.data.message;
  //     // 获取的数据存入到缓存中
  //     wx.setStorageSync('cates', {'time':Date.now(),'data':this.cates});
  //     //左侧菜单
  //     let leftMenuList = this.cates.map(item=>item.cat_name);
  //     //右侧内容
  //     let rightContentList = this.cates[0].children;
  //     this.setData({
  //       leftMenuList,
  //       rightContentList
  //     })
  //   })
  // },

  // es7 async await语法
  async getCateList(){
    const res = await request({"url":"/categories"});
    this.cates=res;
    // 获取的数据存入到缓存中
    wx.setStorageSync('cates', {'time':Date.now(),'data':this.cates});
    //左侧菜单
    let leftMenuList = this.cates.map(item=>item.cat_name);
    //右侧内容
    let rightContentList = this.cates[0].children;
    this.setData({
      leftMenuList,
      rightContentList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    // 判断是否有缓存，若无缓存则发起请求，有缓存则使用缓存里的数据
    const Cates = wx.getStorageSync('cates');
    if(!Cates){
      this.getCateList();
    }else{
      // 判断缓存是否过期
      if(Date.now() - Cates.time >10*1000){
        this.getCateList();
      }else{
        this.cates = Cates.data;
        //左侧菜单
        let leftMenuList =this.cates.map(item=>item.cat_name);
        //右侧内容
        let rightContentList = this.cates[0].children;
        this.setData({
          leftMenuList,
          rightContentList
        })
      }
    }
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