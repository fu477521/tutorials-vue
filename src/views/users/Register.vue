<template lang="html">
  <div class="box">
    <div class="login-box clearfix" style="margin-top:50px">
      <div class="table-option" style="font-size: 20px; margin: 20px">
        <button class="active" v-on:click="clickOptionAccout">账号注册</button>
        <button class="active" v-on:click="clickOptionMobile">手机注册</button>
      </div>
      <div class="tab-form" v-if="registerOption === 1">
        <form id="mobile_register_form" autocomplete="off">
          <input type="hidden" name="csrfmiddlewaretoken" value="ywSlOHdiGsK6VFB6iyhnB1B30khmz8SU">

          <div class="form-group marb8">
            <label>手&nbsp;机&nbsp;号</label>
            <input id="jsRegMobile" name="account" v-model="mobile" type="text" placeholder="请输入您的手机号码">
          </div>
          <p class="error-text marb8" v-show="error.mobile">{{error.mobile}}</p>

          <div class="clearfix">
            <div class="form-group marb8 verify-code">
              <label>验证码</label>
              <input v-model="code" type="text" placeholder="输入手机验证码">
            </div>
            <input class="verify-code-btn sendcode" type="button" id="jsSendCode" @click="seedMessage" :value="getMessageText">
          </div>
          <p class="error-text marb8" v-show="error.code">{{error.code}}</p>

          <div class="form-group marb8">
            <label>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</label>
            <input name="password_m" type="password" v-model="password" placeholder="请输入6-20位非中文字符密码">
          </div>
          <p class="error-text marb8" v-show="error.password">{{error.password}}</p>

          <div class="form-group marb8">
            <label>重复密码</label>
            <input name="password_m" type="password" v-model="rePassword" placeholder="请输入6-20位非中文字符密码">
          </div>
          <p class="error-text marb8" v-show="error.rePassword">{{error.rePassword}}</p>

          <div class="check-box  marb8">
            <div class="remember-me-box">
              <input type="checkbox" class="checked">
              <span class="remember-me"> 记录密码 </span>
            </div>
            <div class="auto-box">
              <input type="checkbox" class="checked">
              <span class="auto-login"> 自动登陆 </span>
            </div>
          </div>
          <input class="btn btn-color" id="jsMobileRegBtn" @click="userRegister" type="button" value="注册">
        </form>
      </div>

      <div class="account-login" v-if="registerOption === 0">
        <form id="register_form" autocomplete="off">
          <div class="form-group marb8">
            <label>用户名:</label>
            <input v-model.lazy="username" placeholder="用户名">
          </div>
          <p class="error-text marb8" v-show="error.username">{{error.username}}</p>
          <div class="form-group marb8">
            <label>输入密码:</label>
            <input v-model.lazy="password" placeholder="密码">
          </div>
          <p class="error-text marb8" v-show="error.password">{{error.password}}</p>

          <div class="form-group marb8">
            <label>重复密码:</label>
            <input v-model.lazy="rePassword" placeholder="密码">
          </div>
          <p class="error-text marb8" v-show="error.rePassword">{{error.rePassword}}</p>

          <div class="form-group marb8">
            <label>输入邮箱:</label>
            <input v-model.lazy="userMail" placeholder="邮箱">
          </div>
          <p class="error-text marb8" v-show="error.userMail">{{error.userMail}}</p>
<!--          <div class="form-group marb8">-->
<!--            <label>输入手机:</label>-->
<!--            <input v-model.lazy="mobile" placeholder="手机">-->
<!--          </div>-->
          <div class="check-box marb8">
            <div class="remember-me-box">
              <input type="checkbox" class="checked">
              <span class="remember-me"> 记录密码 </span>
            </div>
            <div class="auto-box">
              <input type="checkbox" class="checked">
              <span class="auto-login"> 自动登陆 </span>
            </div>
          </div>
          <div  class="register-btn">
            <input class="btn btn-color" @click="userRegister" type="button" value="注册">
<!--            <button v-on:click=userRegister()>注册</button>-->
          </div>
        </form>
      </div>
      <p class="form-p">已有账号？ <router-link :to="'/app/login'">[立即登录]</router-link></p>
    </div>
  </div>

</template>
<script>
import { register, getMessage } from '../../api/api'
// import cookie from '../../static/js/cookie';
export default {
  data () {
    return {
      registerOption: 1,
      getMessageText: '免费获取验证码',
      mobile: '',
      username: '',
      password: '',
      userMail: '',
      rePassword: '',
      code: '',
      error: {
        mobile: '',
        password: '',
        rePassword: '',
        username: '',
        userMail: '',
        code: ''
      }
    }
  },
  computed: {
    registerOpti () {
      return this.registerOption
    }
  },
  methods: {
    clickOptionAccout () {
      this.registerOption = 0
    },
    clickOptionMobile () {
      this.registerOption = 1
    },
    // 注册方法
    userRegister: function (event) {
      if (this.password !== this.rePassword) {
        alert('两次密码不一致')
      } else {
        let sendAccoutDate = {
          username: this.username,
          password: this.password,
          userMail: this.userMail,
          userPhone: this.userPhone
        }
        let sendMobileData = {
          password: this.password,
          username: this.mobile,
          code: this.code
        }
        var sendData = {}
        if (this.registerOption === 0) {
          sendData = sendAccoutDate
        } else {
          sendData = sendMobileData
        }
        register(sendData)
          .then((response) => {
            console.log(response.data)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('username', response.data.username)
            // localStorage.setItem('id', response.data.id)
            // localStorage.setItem('username',this.username);
            // this.$router.go(-1)
            // 跳转到首页页面
            this.$router.push({name: 'Index'})
          })
          .catch(function (error) {
            console.log(error)
            this.error.mobile = error.username ? error.username[0] : ''
            this.error.password = error.password ? error.password[0] : ''
            this.error.username = error.mobile ? error.mobile : ''
            this.error.code = error.code ? error.code[0] : ''
          })
      }
    },
    seedMessage () {
      // 开启倒计时
      var self = this
      var countdown = 60
      settime()
      function settime () {
        if (!self.mobile) {
          self.error.mobile = '手机号不能为空'
        }
        if (countdown === 0) {
          self.getMessageText = '免费获取验证码'
          countdown = 60
          return
        } else {
          self.getMessageText = '重新发送(' + countdown + ')'
          countdown--
        }
        setTimeout(function () {
          settime()
        }, 1000)
      }
      getMessage({
        mobile: self.mobile
      }).then((response) => {
        console.log(response.data)
        self.error.code = response.data.code ? response.data.code[0] : ''
        self.error.code = response.data.mobile ? response.data.mobile[0] : ''
      })
        .catch(function (error) {
          console.log(error.response)
          var errorData = error.response.data
          self.error.code = errorData.code ? errorData.code[0] : ''
          self.error.mobile = errorData.mobile ? errorData.mobile[0] : ''
        })
    }
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
  /*overflow:hidden;*/
}
button.active{
  height: 38px;
  width: 120px;
  border-radius: 5px;
  color: white;
  background-color: #cccccc;
}
button.active:hover{
  color: #63c89b;
  background-color: #bbbbbb;
}
.error-text{
  color:#fa8341;
}
.login-box{
  width:305px;
  margin:0 auto;
  /*border: 1px solid red;*/
}
.clearfix::after {
  clear: both;
  content: " ";
  display: block;
  font-size: 0;
  height: 0;
  visibility: hidden;
}

.form-group{
  position:relative;
  width:298px;
  height:38px;
  border:1px solid #dedede;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  overflow:hidden;
}
.form-group > label{
  float:left;
  width:78px;
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
}

.marb8{
  margin:4px;
}

.verify-code{
  float:left;
  width:190px;
}
.verify-code > input{
  width:85px;
}
.verify-code-btn{
  float:left;
  width:98px;
  margin:4px 3px;
  height:38px;
  line-height:38px;
  border:1px solid #dedede;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background:#f5f5f5;
  color:#666;
  text-align: center;
  cursor: pointer;
}
.check-box{
  display: flex;
  flex-direction: row;
}
.remember-me-box{
  height:18px;
  width: 150px;
  line-height:18px;
}
.auto-box{
  height:18px;
  line-height:18px;
}
.auto-box > label > input{
  vertical-align: sub;
}
.auto-box > label > a{
  color:#6ec559;
}
.btn{
  width:100%;
  height:42px;
  line-height:42px;
  font-size:14px;
  color:#fff;
  border:0;
  cursor:pointer;
  border-radius: 3px;
}
.btn-color{
  background:#cccccc;
}
.btn-color:hover{
  color: #63c89b;
  background:#bbbbbb;
}

.form-p > a{
  color:#fa8341;
}
.form-p > a:hover{
  color:#666;
}
</style>
