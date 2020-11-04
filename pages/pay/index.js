// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart:[],
    isAllChecked:false,
    totalPrice:0,
    totalNum:0
  },
  // 计算总价格，总数量，全选按钮是否勾选
  handleAllChecked(){
    let cart= wx.getStorageSync("cart")||[];
    cart=cart.filter(v=>v.checked)
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      totalPrice+=v.goods_price*v.goods_num;
      totalNum+=v.goods_num;
    });
    this.setData({
      cart,
      totalPrice,
      totalNum
    });
  },
  // 事件监听
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   this.handleAllChecked();
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