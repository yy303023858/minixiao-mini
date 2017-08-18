// company-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    jobCount: 0,
    recInfo: {},
    recTags: [],
    jobList: [],
    typeIndex: 0,
    jobType: [{ text: '全部' }]
  },
  changeTab(e) {
    this.setData({
      currentIndex: Number(e.currentTarget.id)
    })
  },
  selType(e) {
    console.log(e)
    this.setData({ typeIndex: Number(e.currentTarget.id) })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查询公司详情
    wx.request({
      url: 'http://192.168.1.158:9021/recruiter/' + options.recId,
      success: (res) => {
        if (res.data) {
          this.setData({ recInfo: res.data.message.corpInfo })
          this.setData({ recTags: res.data.message.corpInfo.tags.split('，') })
          this.setData({ jobType: this.data.jobType.concat(res.data.message.positionOption) })
        }
      }
    })
    // 查询公司下的职位列表
    wx.request({
      url: 'http://192.168.1.158:9021/recruiter/' + options.recId + '/jobList',
      success: (res) => {
        console.log(res)
        if (res.data) {
          this.setData({ jobList: res.data.data })
          this.setData({ jobCount: res.data.totalCount })
        }
      }
    })
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