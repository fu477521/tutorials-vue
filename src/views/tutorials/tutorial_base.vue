<template>
  <div class="tutorials">
    <div class="header">
      <tutorial-header></tutorial-header>
    </div>
      
    <router-view name = "main" id="main"></router-view>

    <div class="footer">
      <tutorial-footer></tutorial-footer>
    </div>
<!--    <router-view name = "footer" class="footer"></router-view>-->
  </div>
</template>

<script>
import tutorialHeader from './tutorial_header'
import tutorialFooter from '../../components/Footer'


export default {
  name: 'tutorial_base',
  data () {
    return {
      // menuData: 'hello cml!',
      // selectedData: []
    }
  },
  components: {
    tutorialHeader,
    tutorialFooter
  }
}
</script>

<style scoped>


.tutorials{
  min-width: 880px;
  /*min-width:47.5rem;*/
  max-width:1080px;
  margin: 0 auto;
  /*position: relative;*/
}
.header {
  position: relative;
  /*left: 0;*/
  /*top: 0;*/
}
.main{
  width: 100%;
}
.footer{
  /*float: bottom;*/
  /*margin-bottom: auto;*/
  height: 60px;
  width: 100%;
  /*position: fixed;*/
  /*bottom: 0;*/
  /*left: 0;*/
  border-top: 2px solid #cccccc;
}
</style>
