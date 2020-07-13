<template>
  <div class="navbar">
    <navbar-site></navbar-site>
    <navbar-login></navbar-login>
  </div>
</template>

<script>
  import NavbarLogin from './navbar_components/NavbarLogin'
  import NavbarSite from './navbar_components/NavbarSite'

  export default {
    name: 'Navbar',
    data () {
      return {
        navList: []
      }
    },
    components: {
      NavbarLogin,
      NavbarSite
    }
  }
</script>

<style scoped>
.navbar{
  /*display: flex;*/
  /*flex-direction: row;*/
  /*border: 2px solid #eeeeee;*/
  border-radius: 10px;
  width: 400px;
  /*height: 60px;*/
  /*margin: 0 auto;*/
  /*position: absolute;*/
  /*right: 3%;*/
  float: right;
}

</style>
