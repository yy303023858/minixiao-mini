//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    changeHeader: false,
    swiperList: [
      'http://www.minixiao.com/static/images/banner/201705/wx_20170607104035.jpg',
      'http://admin.minixiao.com/st/images/banner/201703/245c54340c704d28a6219929dc6141aa.jpg',
      'http://admin.minixiao.com/st/images/banner/201704/20170425161544wx.jpg'
    ],
    jobList: []
  },
  search: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  viewScroll: function (e) {
    // console.log(e)
    if (e.detail.scrollTop + e.detail.scrollWidth / 8.1521 > e.detail.scrollWidth / 2.15517) {
      this.setData({ changeHeader: true })
    } else {
      this.setData({ changeHeader: false })
    }
  },
  goJobs: function () {
    wx.switchTab({
      url: '/pages/jobs/jobs'
    })
  },
  goDetail: function (e) {
    wx.navigateTo({
      url: '/pages/job-detail/job-detail?id=' + e.currentTarget.id
    })
  },
  onLoad: function () {
    // 加载广告
    wx.request({
      url: 'http://192.168.1.158:9021/ad/coverstory',
      success: (res) => {
        if (res.data.message.length) {
          this.setData({ swiperList: res.data.message })
        }
      }
    })
    // 加载热招职位
    wx.request({
      url: 'http://192.168.1.158:9021/jobposting/hotjob',
      success: (res) => {
        if (res.data.message.length) {
          this.setData({ jobList: res.data.message })
        }
      }
    })
  }
})
