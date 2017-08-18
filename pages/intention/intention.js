// intention.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['2k以下', '2k-5k', '5k-10k', '10k-15k', '10k-15k', '15k-25k', '25k-50k', '50k以上'],
    salary: '',
    city: ''

  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      salary: this.data.array[e.detail.value]
    })
  },
  cityfocus: function () {
    wx.redirectTo({
      url: '/pages/selcity/selcity',
    })
  },
  formSubmit() {

  },
  onLoad: function (option) {
    console.log(option)
    if (option.city) {
      this.setData({
        city: option.city
      })
    }
  }
})