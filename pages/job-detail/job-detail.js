// job-detail.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    job: {}
  },
  formatDate(val) {
    let arr = val.split('')
    arr.splice(4, 0, '.')
    arr.splice(7, 0, '.')
    let str = arr.join('')
    return str
  },
  showCompany: function () {
    wx.navigateTo({
      url: '/pages/company-detail/company-detail?recId=' + this.data.job.recId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.request({
      url: 'http://192.168.1.158:9021/jobposting/' + options.id,
      success: (res) => {
        if (res.data) {
          res.data.message.applyBeginDate = this.formatDate(res.data.message.applyBeginDate)
          res.data.message.applyEndDate = this.formatDate(res.data.message.applyEndDate)
          console.log(res.data)
          this.setData({ job: res.data.message })
          var description = res.data.message.description
          WxParse.wxParse('description', 'html', description, this);
        }
      }
    })
  }
})