<template lang="html">
  <div>
    <div  class="box clearfix">
    <div class="form-box">
      <h2>LOGIN</h2>
      <form id="jsLoginForm" autocomplete="off">
        <input type="hidden" name="csrfmiddlewaretoken" value="ywSlOHdiGsK6VFB6iyhnB1B30khmz8SU">
        <div class="form-group marb20">
          <label>用&nbsp;户&nbsp;名</label>
          <input name="account_l" id="account_l" type="text" v-model="username" @focus="errorUnshow" placeholder="手机号/账号">
        </div>
        <p class="error-text" v-show="userNameError">{{userNameError}}</p>
        <div class="form-group marb8">
          <label>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</label>
          <input name="password_l" id="password_l" type="password" v-model="password" @focus="errorUnshow" placeholder="请输入您的密码">
        </div>
        <p class="error-text" v-show="parseWordError">{{parseWordError}}</p>
        <p class="error-text" v-show="error">{{error}}</p>
        <div class="btn-box">
          <input class="btn btn-green" id="jsLoginBtn" type="button" @click = "userLogin" value="立即登录 &gt; ">
          <input class="btn btn-green" id="jsFindPwdBtn" type="button" @click = "findBackPassword" value="忘记密码？ &gt; ">
        </div>

      </form>
      <ul class="form other-form">
        <li>
          <h5>使用第三方帐号登录</h5>
        </li>
        <li class="other-login">
          <a class="qq" href="http://shop.projectsedu.com:8001/login/qq/"></a>
          <a class="sina" href="http://shop.projectsedu.com:8001/login/weibo/"></a>
          <a class="alipay" href="http://shop.projectsedu.com:8001/login/alipay/"></a>
          <a class="weixin" href="http://shop.projectsedu.com:8001/login/weixin/"></a>
        </li>
      </ul>
      <p class="form-p">
        没有帐号？
        <router-link :to="'/app/register/'" target = _blank>[立即注册]</router-link>
      </p>
     </div>
    </div>
  </div>
</template>
<script>
import {login} from '../../api/api'
export default {
  data () {
    return {
      username: '',
      password: '',
      autoLogin: false,
      error: false,
      userNameError: '',
      parseWordError: ''
    }
  },
  methods: {
    userLogin: function (event) {
      var that = this
      login({username: this.username, password: this.password}).then((response) => {
        // this.$store.state.userInfo.username = this.username;
        // this.$store.state.userInfo.token = response.data.token;

        localStorage.setItem('token', response.data.access)
        localStorage.setItem('username', this.username)
        this.$router.go(-1)
        // this.$router.push({name: 'tutorialsCreate'})
      })
        .catch(function (error) {
          // console.log(error.response)
          if ('non_field_errors' in error) {
            that.error = error.non_field_errors[0]
          }
          if ('username' in error) {
            that.userNameError = error.username[0]
          }
          if ('password' in error) {
            that.parseWordError = error.password[0]
          }
        })
    },
    // 注册跳转页面
    userRegister: function (event) {
      this.$router.push({ path: 'register' })
    },
    // 找回密码
    findBackPassword: function (event) {
      this.$router.push({ path: 'findpwd' })
    },
    errorUnshow () {
      this.error = false
    }
  },
  created () {
    localStorage.clear()
    // 清除缓存
    // cookie.delCookie('token');
    // cookie.delCookie('name');
    // 重新触发store
    // 更新store数据
    // this.$store.dispatch('setInfo');
  }
}
</script>
<style>
.box{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  /*border: 1px solid red;*/
}
.error-text{
  color:#fa8341;
}

.clearfix::after {
  clear: both;
  content: " ";
  display: block;
  font-size: 0;
  height: 0;
  visibility: hidden;
}

.form-box{
  position:relative;
  width:290px;
  height: 472px;
  padding:0 40px;
  background:#fff;
  color:#666;
  /*border: 1px solid red;*/
}
.form-box > h2 {
  height:54px;
  line-height:54px;
  margin:14px 1px;
  font-size:18px;
  font-weight:normal;
  color:#333;
  border-bottom:1px solid #eaeaea;
}
.form-box > .tab > h2{
  float:left;
  width:90px;
  height:53px;
  line-height:53px;
  cursor: pointer;
  font-weight:normal;
  text-align:center;
}
.form-box > .tab > h2.active{
  border-bottom:3px solid #6ec55a;
  color:#333;
}
.form-group{
  position:relative;
  width:288px;
  height:38px;
  border:1px solid #dedede;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  overflow:hidden;
}
.form-group > label{
  float:left;
  width:72px;
  height:20px;
  line-height:20px;
  margin-top:9px;
  border-right:1px solid #eaeaea;
  text-align:center;
}
.form-group > input{
  float:left;
  width:195px;
  line-height:24px;
  padding:7px 10px;
  border:0;
  line-height:normal\9;
  padding:12px 10px 9px\9;
}
.form-group .mobile-register-captcha{
  width:85px;
}
.form-group .captcha{
  cursor: pointer;
}
.marb20{
  margin-bottom:8px;
}
.marb8{
  margin-bottom:8px;
  margin-top: 10px;
}

.error{
  background: #fb8344;
  color:#fff !important;
  text-align: center;
  height:40px !important;
  line-height: 40px !important;
  margin:10px 0;
}

.btn-box {
  display: flex;
  flex-direction: row;
}
.btn{
  margin: 0 5px;
  width:50%;
  height:35px;
  line-height:35px;
  font-size:14px;
  color:#fff;
  border:0;
  border-radius: 3px;
  cursor:pointer;
}
.btn-green{
  background:#cccccc;
}
.btn-green:hover{
  background:#bbbbbb;
}

.other-form {
  /*border: 1px solid #3aff0c;*/
  height: 80px;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 5px 0;
  /*position: relative;*/
}

.other-form li {
  /*position: absolute;*/
  text-align: center;
  height: 30px;
  line-height: 30px;
  list-style: none;
  padding-bottom: 8px;
  /*border: 1px solid red;*/
}
.other-form li h5 {
  margin: 0 5px;
  font-size:12px;
}

.other-login a {
  margin-top: 0;
  vertical-align: top;
  margin-right: 10px;
  background: url(../../static/images/users/other-login-bg.png) center no-repeat;
  display: inline-block;
  width: 30px;
  height: 30px;
  overflow: hidden;
}
.other-login a.qq {
  background-position: -40px 0;
}
.other-login a.sina {
  background-position: 0 0;
}
.other-login a.alipay {
  background-position: -80px 0;
}
.other-login a.weixin {
  background-position: -200px 0;
}
.form-p{
  margin: 0;
  left:40px;
  bottom:25px;
  /*border: 1px solid red;*/
}
.form-p > a{
  color:#fa8341;
}
.form-p > a:hover{
  color:#666;
}

</style>
