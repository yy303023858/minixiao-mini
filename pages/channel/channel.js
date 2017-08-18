// channel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    channelList: []
  },
  goDetail(e) {
    wx.navigateTo({
      url: '/pages/channel-detail/channel-detail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://www.easy-mock.com/mock/5951bf859adc231f356adea8/api/channel',
      success: (res) => {
        this.setData({
          channelList: res.data
        })
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('上拉刷新')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('到底了')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})