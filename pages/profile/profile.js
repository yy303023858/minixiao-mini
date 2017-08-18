// profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: 'resume',
    // 基本
    name: '',
    mobile: '',
    email: '',
    birthday: '',
    male: false,
    female: false,
    gender: '',
    homeCity: [],
    currentCity: [],
    // 教育
    degreeArray: ['大专', '本科', '硕士', '博士'],
    majorOrderArray: ['前5%', '前10%', '前20%', '前50%'],
    addEdu: false,
    editEduIndex: '',
    school: '',
    major: '',
    degree: '',
    start_date: '',
    end_date: '',
    majorOrder: '',
    education: [],
    tempEducation: [],
    // 实习经历
    workCount: 0,
    work: '',
    // 项目经验
    practices: '',
    practiceCount: 0,
    // 社团经历
    club: '',
    clubCount: 0,
    // 获奖荣誉
    reward: '',
    rewardCount: 0,
    // 实验室
    laboratory: '',
    laboratoryCount: 0,
    // 语言等级
    language: [],
    languageArray: [['英语', '普通话', '日语', '法语', '德语', '韩语', '西班牙语'], ['四级:425以下', '四级:425-550分', '四级:550分以上', '六级:425以下', '六级:425-550分', '六级:550分以上', '专业四级:合格', '专业四级:良好', '专业四级:优秀', '专业八级:合格', '专业八级:良好', '专业八级:优秀', '雅思:5分以下', '雅思:5-6.5分', '雅思:6.5分以上', '托福:88分以下', '托福:88-105分', '托福:105分以上', '其他']],


    resumeData: {
      id: '',
      basic: { name: '', mobile: '', email: '', gender: '', birthday: '', city: '', currentCity: '' },
      education: [],
      work: '',
      practices: '',
      club: '',
      reward: '',
      laboratory: '',
      skill: [],
      certificate: [],
      language: [],
      other: { number: '', hobby: '', evaluation: '', source: '', city: '' }
    }
  },
  // 点击编辑基本信息
  editorBasic: function () {
    this.setData({ showPage: 'basic' })
  },
  nameBlur: function (e) {
    var str = e.detail.value.trim()
    this.setData({ name: str })
  },
  mobileBlur: function (e) {
    var str = e.detail.value.trim()
    this.setData({ mobile: str })
  },
  emailBlur: function (e) {
    var str = e.detail.value.trim()
    this.setData({ email: str })
  },
  // 选择性别radio
  genderChange: function (e) {
    if (e.detail.value === '男') {
      this.setData({ male: true })
      this.setData({ female: false })
      this.setData({ gender: '男' })
    } else {
      this.setData({ male: false })
      this.setData({ female: true })
      this.setData({ gender: '女' })
    }
  },
  // 出生日期picker
  birthdayChange: function (e) {
    this.setData({ birthday: e.detail.value })
  },
  // 家庭住址picker
  homeCityChange: function (e) {
    this.setData({ homeCity: e.detail.value })
  },
  // 当前所在地
  currentCityChange: function (e) {
    this.setData({ currentCity: e.detail.value })
  },
  saveBasic: function () {
    this.setData({ showPage: 'resume' })
    // if (this.tempCity.length > 0) {
    //   this.resumeData.basic.city = this.tempCity.join('-')
    // }
    // if (this.tempCurrentCity.length > 0) {
    //   this.resumeData.basic.currentCity = this.tempCurrentCity.join('-')
    // }
    // if (this.resumeData.basic.name && this.resumeData.basic.mobile && this.resumeData.basic.email && this.resumeData.basic.currentCity) {
    //   var phonePattern = /^1[34578]\d{9}$/
    //   if (!phonePattern.test(this.resumeData.basic.mobile)) {
    //     this.$vux.toast.text('手机号格式错误')
    //     return
    //   }
    //   var emailPattern = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/
    //   if (!emailPattern.test(this.resumeData.basic.email)) {
    //     this.$vux.toast.text('邮箱格式错误')
    //     return
    //   }
    //   this.resumeData.basic.birthday = this.birthday
    //   this.showPage = 'resume'
    // } else {
    //   this.$vux.toast.text('请填写必填项')
    // }
  },
  // 点击编辑教育信息
  editorEdu: function (e) {
    // 如果是编辑已存在信息
    if (e.currentTarget.id) {
      this.setData({ school: this.data.education[e.currentTarget.id].school })
      this.setData({ major: this.data.education[e.currentTarget.id].major })
      this.setData({ degree: this.data.education[e.currentTarget.id].degree })
      this.setData({ start_date: this.data.education[e.currentTarget.id].start_date })
      this.setData({ end_date: this.data.education[e.currentTarget.id].end_date })
      this.setData({ majorOrder: this.data.education[e.currentTarget.id].majorOrder })
      this.setData({ editEduIndex: e.currentTarget.id })
      this.setData({ addEdu: false })
    } else {
      // 新建编辑信息
      this.setData({ school: '' })
      this.setData({ major: '' })
      this.setData({ degree: '' })
      this.setData({ start_date: '' })
      this.setData({ end_date: '' })
      this.setData({ majorOrder: '' })
      this.setData({ editEduIndex: '' })
      this.setData({ addEdu: true })
    }
    this.setData({ showPage: 'education' })
  },
  // 输入学校名称
  schoolBlur(e) {
    var str = e.detail.value.trim()
    this.setData({ school: str })
  },
  // 输入专业
  majorBlur: function (e) {
    var str = e.detail.value.trim()
    this.setData({ major: str })
  },
  // 选择学历
  degreeChange: function (e) {
    this.setData({ degree: this.data.degreeArray[e.detail.value] })
  },
  // 选择入学时间
  startChange: function (e) {
    this.setData({ start_date: e.detail.value })
  },
  // 选择毕业时间
  endChange: function (e) {
    this.setData({ end_date: e.detail.value })
  },
  // 选择专业排名
  majorOrderChange: function (e) {
    this.setData({ majorOrder: this.data.majorOrderArray[e.detail.value] })
  },
  // 点击保存教育信息
  saveEdu: function () {
    if (this.data.addEdu) {
      this.data.tempEducation.push({
        school: this.data.school,
        major: this.data.major,
        degree: this.data.degree,
        start_date: this.data.start_date,
        end_date: this.data.end_date,
        majorOrder: this.data.majorOrder
      })
    } else {
      this.data.tempEducation[this.data.editEduIndex].school = this.data.school
      this.data.tempEducation[this.data.editEduIndex].major = this.data.major
      this.data.tempEducation[this.data.editEduIndex].degree = this.data.degree
      this.data.tempEducation[this.data.editEduIndex].start_date = this.data.start_date
      this.data.tempEducation[this.data.editEduIndex].end_date = this.data.end_date
      this.data.tempEducation[this.data.editEduIndex].majorOrder = this.data.majorOrder
    }
    this.setData({ showPage: 'resume' })
    this.setData({ education: this.data.tempEducation })
  },

  // 编辑实习经历
  editorWork: function () {
    this.setData({ showPage: 'work' })
  },
  // 计算实际经历输入个数
  calWorkNum: function (e) {
    this.setData({ workCount: e.detail.value.length })
  },
  workChange: function (e) {
    this.setData({ work: e.detail.value })
  },
  saveWork: function () {
    this.setData({ showPage: 'resume' })
  },

  // 点击项目经验编辑
  editorPractice: function () {
    this.setData({ showPage: 'practices' })
  },
  calPracticeNum: function (e) {
    this.setData({ practiceCount: e.detail.value.length })
  },
  practiceChange: function (e) {
    this.setData({ practices: e.detail.value })
  },
  savePractice: function () {
    this.setData({ showPage: 'resume' })
  },

  // 点击社团经历编辑
  editorClub: function () {
    this.setData({ showPage: 'club' })
  },
  calclubNum: function (e) {
    this.setData({ clubCount: e.detail.value.length })
  },
  clubChange: function (e) {
    this.setData({ club: e.detail.value })
  },
  saveClub: function () {
    this.setData({ showPage: 'resume' })
  },

  // 点击获奖荣誉编辑
  editorReward: function () {
    this.setData({ showPage: 'reward' })
  },
  calrewardNum: function (e) {
    this.setData({ rewardCount: e.detail.value.length })
  },
  rewardChange: function (e) {
    this.setData({ reward: e.detail.value })
  },
  saveReward: function () {
    this.setData({ showPage: 'resume' })
  },

  // 点击实验室
  editorLab: function () {
    this.setData({ showPage: 'laboratory' })
  },
  callabNum: function (e) {
    this.setData({ laboratoryCount: e.detail.value.length })
  },
  labChange: function (e) {
    this.setData({ laboratory: e.detail.value })
  },
  saveLab: function () {
    this.setData({ showPage: 'resume' })
  },

  // 点击语言编辑
  editorLanguage: function () {
    this.setData({ showPage: 'language' })
  },
  columnChange: function(e) {
    console.log(e)
  },
  languageChange: function(e) {
    console.log(e)
  },
  saveLanguage: function () {
    this.setData({ showPage: 'resume' })
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