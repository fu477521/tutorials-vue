<template>
  <ul class="nav navbar-nav">
    <li v-for="nav in navList" :key="nav.id">
      <!-- <i class="iconfont" :class="nav.icon" :style="{background: nav.color}"></i> -->
      <a class="iconfont" :class="nav.icon" :style="{background: nav.color}" :href="nav.url">{{nav.name}}</a>
    </li>
    <!-- <li><a class="page-scroll" href="/#section-contact">聯系我們</a></li> -->
  </ul>
</template>

<script>
  import {getNavbar} from '../../api/api'
  export default {
    name: 'NavbarSite',
    data () {
      return {
        navList: [
          {name: '言者', icon: 'icon-home', color: '#cccccc', url: '#'},
          {name: '行者', icon: 'icon-guarantee', color: '#cccccc', url: '#'},
          {name: '示者', icon: 'icon-Privacy', color: '#cccccc', url: '#'},
          {name: '知者', icon: 'icon-QA', color: '#cccccc', url: '#'},
          {name: 'Call Me', icon: 'icon-QA', color: '#cccccc', url: '#'},
        ]
      }
    },
    computed: {
      // navList: [],
      user () {
        return {
          username: localStorage.getItem('username')
        }
      }
    },
    methods: {
      getNav () {
        var navListData = JSON.parse(sessionStorage.getItem('navlist')) || []
        if (navListData.length === 0) {
          getNavbar({}).then((response) => {
            console.log(response.data)
            this.navList = response.data
            sessionStorage.setItem('navlist', JSON.stringify(response.data))
          })
            .catch((error) => {
              console.log(error.data)
            })
        } else {
          this.navList = navListData
        }
      },
    },
    created () {
      // sessionStorage.clear()
      // this.getNav()
    }
  }
</script>

<style scoped>
  
  /*.navbar{*/
  /*  !*display: flex;*!*/
  /*  !*flex-direction: row;*!*/
  /*  !*border: 2px solid #eeeeee;*!*/
  /*  border-radius: 10px;*/
  /*  width: 36%;*/
  /*  !*height: 60px;*!*/
  /*  margin: 0 auto;*/
  /*  position: absolute;*/
  /*  right: 3%;*/
  /*  float: right;*/
  /*}*/
  .navbar ul{
    padding: 0;
  }
  .navbar li{
    float: left;
    /*float: right;*/
    /*text-align: right;*/
    font-size:18px;
    list-style: none;
    padding: 2px;
    border: 2px solid #cccccc;
    border-radius: 5px;
    margin-right: 5px;
    background-color: #cccccc;
  }
  a {
    background-color: #cccccc;
    text-decoration: none;
    color: #aaa;
  }

  a:hover {
    color: #FF7E60;
    cursor: pointer;
    transition: all 0.25s ease 0s;
    -moz-transition: all 0.25s ease 0s;
    -webkit-transition: all 0.25s ease 0s;
    -o-transition: all 0.25s ease 0s;
    background-color: transparent;
  }

  a:focus {
    outline: none;
    outline-offset: 0;

  }

  a:link,
  a:visited {
    text-decoration: none;
  }
</style>
