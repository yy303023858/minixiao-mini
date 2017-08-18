// search.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchContent: '',
    historyList: []
  },
  searchBlur: function (e) {
    this.setData({ searchContent: e.detail.value })
  },
  search() {
    if (this.data.searchContent) {
      wx.getStorage({
        key: 'searchHistory',
        // 已经存在搜索记录
        success: (res) => {
          let arr = JSON.parse(res.data)
          let index = arr.indexOf(this.data.searchContent)
          if (index !== -1) { arr.splice(index, 1) }
          arr.unshift(this.data.searchContent)
          wx.setStorage({ key: 'searchHistory', data: JSON.stringify(arr) })
        },
        // 不存在搜索记录
        fail: (err) => {
          let arr = [this.data.searchContent]
          wx.setStorage({ key: 'searchHistory', data: JSON.stringify(arr) })
        }
      })
    }
    app.globalData.search = this.data.searchContent
    wx.switchTab({ url: '/pages/jobs/jobs' })
  },
  deleteItem: function (e) {
    let arr = this.data.historyList
    arr.splice(e.currentTarget.id, 1)
    this.setData({ historyList: arr })
    wx.setStorage({ key: 'searchHistory', data: JSON.stringify(arr) })
  },
  clearAll: function() {
    this.setData({ historyList: [] })
    wx.setStorage({ key: 'searchHistory', data: JSON.stringify([]) })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'searchHistory',
      success: (res) => {
        this.setData({ historyList: JSON.parse(res.data) })
      }
    })
  }
})