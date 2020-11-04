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
    const cart= wx.getStorageSync("cart")||[];
    let isAllChecked=cart.length?cart.every(v=>v.checked):false;
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.goods_price*v.goods_num;
        totalNum+=v.goods_num;
      }
    });
    this.setData({
      cart,
      isAllChecked,
      totalPrice,
      totalNum
    });
  },
  // 事件监听
  checkboxChange(e){
    let {id}=e.currentTarget.dataset;
    let {cart} = this.data;
    let index=cart.findIndex(v=>v.goods_id===id)
    cart[index].checked=!cart[index].checked;
    this.setData({
      cart
    });
    wx.setStorageSync('cart', cart);
    this.handleAllChecked();
  },
  // 全选
  checkboxAllChange(e){
    let {cart,isAllChecked} = this.data;
    isAllChecked = !isAllChecked;
    cart.forEach(v=>{
      v.checked = isAllChecked;
    });
    this.setData({
      isAllChecked,
      cart
    });
    wx.setStorageSync('cart', cart);
    this.handleAllChecked();

  },
  add(e){
    let {id} = e.currentTarget.dataset;
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.goods_id===id);
    cart[index].goods_num++;
    this.setData({
      cart
    });
    wx.setStorageSync('cart', cart);
    this.handleAllChecked();
  },
  sub(e){
    let {id} = e.currentTarget.dataset;
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.goods_id===id);
    cart[index].goods_num--;
    if(cart[index].goods_num<1){
      cart[index].goods_num=1;
      wx-wx.showToast({
        title: '最少购买1件哦',
        mask: true,
        icon:'none'
      })
    }
    this.setData({
      cart
    });
    wx.setStorageSync('cart', cart);
    this.handleAllChecked();
  },
  delete(e){
    let {id} = e.currentTarget.dataset;
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.goods_id===id);
    cart.splice(index,1);
    wx.setStorageSync('cart', cart);
    this.handleAllChecked();
  },
  handlePay(){
    if(this.data.totalNum==0){
      wx-wx.showToast({
        title: '您还没有选购商品',
        icon: 'none'
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  },
  handleAddress(){
    wx.getSetting({
      success:(res)=> {
        const scopeAddress=res.authSetting["scope.address"];
        console.log(scopeAddress);
        if(scopeAddress == true || scopeAddress == undefined){
          // 用户点击确认
          wx.chooseAddress({
            success: (result) => {
              console.log(result);
            }
          })
        }else{
          // 用户点击取消
         wx.openSetting({
          success:(result1)=>{
            wx.chooseAddress({
              success: (result2) => {
                console.log(result2);
              }
            })
          }
         })
        }
      }
    })
    wx.chooseAddress({
      success: (result) => {
        console.log(result);
      },
    })
  },
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