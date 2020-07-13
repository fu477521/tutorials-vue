<template>
  <div id="footer">
<!--     <div class="footer-content-block">
      <ul class="list-inline">
        <li><a href="/intros/index">示者</a></li>
        <li><a href="/tutorials/index">行者</a></li>
        <li><a href="/blogs/index">知者</a></li>
        <li><a href="/forums/index">言者</a></li>
        <li><a href="#">投诉与建议</a></li>
        <li><a href="#">Dribbble</a></li>
      </ul>
    </div> -->
    <div class="overlay feature"></div><br>
    <p>Copyright &copy; 2017.言者 All rights reserved. 版权所有 <a href="#">粤ICP备18047373号-1</a> </p>
  </div>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>

<style scoped>
  #footer{
    position: relative;
    /*background: url("../../static/images/tutorials/footer-bg.jpg") fixed center center;*/
    background-color: rgba(200,200,200,0.3);
    -webkit-background-size: cover;
    background-size:cover ;
    height: 60px;
    padding: 10px 0px;
    border-radius: 10px;
    margin: 20px 5px;
    /*border: 2px solid #42b983;*/
  }

  ul{
    position: absolute;
    margin: 10px auto;
  }
  li{
    float: left;
    list-style: none;
    padding: 4px;
    border: 2px solid #cccccc;
    border-radius: 5px;
    margin-right: 10px;
    background-color: #42b983;
  }

  .footer-content-block a{
    color: #fff;
    text-transform: capitalize;
    border-bottom: 1px solid#0D6EB2;
    text-decoration: none;
  }

  .overlay{
    position: absolute;
    width: 100%;
    height: 100%;
    content:"";
    /*background: #cccccc;*/
    /*opacity: .16;*/
    top: 0px;
    left: 0px;
    border-radius: 20px;
  }
  p{
    color: white;
    /*text-align: center;*/
    margin: 20px auto;
    bottom: 10px;
    width: 100%;
    /*position: fixed;*/
  }
  #footer a {
    color: white;
  }
  #footer a:hover{
    color: #fa8341;
  }
</style>
