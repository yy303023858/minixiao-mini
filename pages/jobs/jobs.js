// jobs.js
import { cityByLetter } from '../../utils/cityByLetter.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressRadio: cityByLetter,
    salaryArray: [{ value: '不限', key: '' }, { value: '面议', key: 0 }, { value: '2k以下', key: 1 }, { value: '2k-3k', key: 2 }, { value: '3k-6k', key: 3 }, { value: '6k-10k', key: 4 }, { value: '10k-15k', key: 5 }, { value: '15k-25k', key: 6 }, { value: '25k-50k', key: 7 }, { value: '50k以上', key: 8 }],
    degreeArray: [{ value: '不限', key: 0 }, { value: '大专及以上', key: 1 }, { value: '本科及以上', key: 2 }, { value: '硕士及以上', key: 3 }, { value: '博士及以上', key: 4 }],
    orderArray: [{ value: '不限', key: '' }, { value: '网申结束时间降序排列', key: 'expiry_end_date+desc' }, { value: '网申结束时间升序排列', key: 'expiry_end_date+asc' }],
    jobList: [],
    option: [false, false, false, false],
    showCity: {},
    showSalary: {},
    showDegree: {},
    showOrder: {},
    oldIndex: -1,
    toView: '不限',
    showCover: false,

    cityName: '',
    salary: '',
    education: '',
    sort: '',
    search: '',
    page: 1,

    loadTip: '正在加载',
    showLoading: true,
    searchTip: '搜索职位或公司'
  },
  search: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  funShowOption: function (e) {
    var clickIndex = Number(e.currentTarget.id)
    var animation = wx.createAnimation({ duration: 300 })
    var openIndex
    this.data.option.forEach((item, index) => {
      if (item) {
        openIndex = index
        switch (index) {
          case 0:
            animation.translateY(-409).step()
            this.setData({ showCity: animation.export() })
            break;
          case 1:
            animation.translateY(-409).step()
            this.setData({ showSalary: animation.export() })
            break;
          case 2:
            animation.translateY(-207).step()
            this.setData({ showDegree: animation.export() })
            break;
          case 3:
            animation.translateY(-125).step()
            this.setData({ showOrder: animation.export() })
            break;
          default:
            console.log('default')
        }
        this.data.option[index] = false
      }
    })

    switch (clickIndex) {
      case 0:
        if (clickIndex !== openIndex) {
          animation.translateY(409).step()
          this.setData({ showCity: animation.export() })
          this.data.option[clickIndex] = true
        }
        break;
      case 1:
        if (clickIndex !== openIndex) {
          animation.translateY(409).step()
          this.setData({ showSalary: animation.export() })
          this.data.option[clickIndex] = true
        }
        break;
      case 2:
        if (clickIndex !== openIndex) {
          animation.translateY(207).step()
          this.setData({ showDegree: animation.export() })
          this.data.option[clickIndex] = true
        }
        break;
      case 3:
        if (clickIndex !== openIndex) {
          animation.translateY(125).step()
          this.setData({ showOrder: animation.export() })
          this.data.option[clickIndex] = true
        }
        break;
      default:
        console.log('default')
    }

    // 处理点开filter option的时候背景覆盖层
    this.data.option.includes(true) ? this.setData({ showCover: true }) : this.setData({ showCover: false })
  },
  // 锚点页面滚动
  goView: function (e) {
    console.log(e)
    this.setData({
      toView: e.currentTarget.id
    })
  },
  // 取消点击职位参数
  cancelOption() {
    var animation = wx.createAnimation({ duration: 300 })
    this.data.option.forEach((item, index) => {
      if (item) {
        switch (index) {
          case 0:
            animation.translateY(-409).step()
            this.setData({ showCity: animation.export() })
            break;
          case 1:
            animation.translateY(-409).step()
            this.setData({ showSalary: animation.export() })
            break;
          case 2:
            animation.translateY(-207).step()
            this.setData({ showDegree: animation.export() })
            break;
          case 3:
            animation.translateY(-125).step()
            this.setData({ showOrder: animation.export() })
            break;
          default:
            console.log('default')
        }
        this.data.option[index] = false
      }
    })
    this.setData({ showCover: false })
  },
  // 点击跳转职位详情
  goDetail: function (e) {
    wx.navigateTo({
      url: '/pages/job-detail/job-detail?' + 'id=' + e.currentTarget.id
    })
  },
  addressChange: function (e) {
    if (e.currentTarget.id === '不限') {
      this.setData({ cityName: '' })
    } else {
      this.setData({ cityName: e.currentTarget.id })
    }
    this.resetData()
  },
  salaryChange(e) {
    this.setData({ salary: e.currentTarget.id })
    this.resetData()
  },
  degreeChange(e) {
    this.setData({ education: e.currentTarget.id })
    this.resetData()
  },
  orderChange(e) {
    this.setData({ sort: e.currentTarget.id })
    this.resetData()
  },
  resetData: function () {
    this.cancelOption()
    this.setData({ page: 1 })
    this.setData({ jobList: [] })
    this.getData()
  },
  getData: function () {
    wx.request({
      url: 'http://192.168.1.158:9021/jobposting?cityName=' + this.data.cityName + '&education=' + this.data.education + '&salary=' + this.data.salary + '&sort=' + this.data.sort + '&search=' + this.data.search + '&pn=' + this.data.page + '&pageSize=10',
      success: (res) => {
        if (res.data.data.length) {
          this.setData({ jobList: res.data.data })
          if (res.data.totalPage === 1) {
            this.setData({ loadTip: '暂无更多职位' })
            this.setData({ showLoading: false })
          }
        } else {
          this.setData({ jobList: [] })
          this.setData({ loadTip: '未找到符合职位' })
          this.setData({ showLoading: false })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 初次加载
  // onLoad: function (options) {
  //   console.log(app.globalData.search)
  //   if (app.globalData.search) {
  //     this.setData({ search: app.globalData.search.trim() })
  //     this.setData({ searchTip: app.globalData.search })
  //   } else {
  //     this.setData({ search: '' })
  //     this.setData({ searchTip: '搜索职位或公司' })
  //   }
  //   this.getData()
  // },
  onShow: function () {
    if (app.globalData.search) {
      this.setData({ search: app.globalData.search.trim() })
      this.setData({ searchTip: app.globalData.search })
    } else {
      this.setData({ search: '' })
      this.setData({ searchTip: '搜索职位或公司' })
    }
    this.setData({ page: 1 })
    this.getData()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({ page: this.data.page + 1 })
    wx.request({
      url: 'http://192.168.1.158:9021/jobposting?cityName=' + this.data.cityName + '&education=' + this.data.education + '&salary=' + this.data.salary + '&sort=' + this.data.sort + '&search=' + this.data.search + '&pn=' + this.data.page + '&pageSize=10',
      success: (res) => {
        if (res.data.data.length) {
          this.setData({ jobList: this.data.jobList.concat(res.data.data) })
        } else {
          this.setData({ loadTip: '暂无更多职位' })
          this.setData({ showLoading: false })
        }
      },
      fail: (err) => {
        this.setData({ loadTip: '加载失败' })
        this.setData({ showLoading: false })
      }
    })
  }
})