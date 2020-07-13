<template>
	<div class="turn-page">
		<div class="previous-item">
          <input type="button" value="上一篇" @click="switchClick(previousData[0])">
          <span> : <a @click="switchClick(previousData[0])">{{previousData[1]}}</a></span>
        </div>
        <div class="next-item">
          <input type="button" value="下一篇" @click="switchClick(nextData[0])">
          <span> : <a @click="switchClick(nextData[0])">{{nextData[1]}}</a></span>
        </div>
	</div>
</template>

<script type="text/javascript">
	import {listArticle} from '../api/api'

	export default {
	  name: 'TurnPage',
	  props: {
	  	TPageData: Object
	    // TPageData: {
	    // 	type: Object,
	    // 	default: function(){
	    // 		return {previous: [0, '没有上一篇了'], next: [0, '没有下一篇了']}
	    // 	}
	    // }
	  },
	  data () {
	    return {
	      previousData: [],
	      nextData: []
	    }
	  },
	  watch: {
	  	TPageData: function(newData, oldData){
	  	  listArticle({turn_page: newData})
	  	  .then((response) => {
            // console.log(response.data)
            this.nextData = response.data.next || [0, '没有下一篇了'] //{'id': 0, 'title': '没有下一篇了'}
            this.previousData = response.data.previous || [0, '没有上一篇了']  //{'id': 0, 'title': '没有上一篇了'}
          })
          .catch(function (error) {
            console.log(error)
          })
	  	}
	  },
	  methods: {
	  	switchClick (id) {
	  		if (id > 0){
	  			var site_type = this.$route.matched[0].path
		        if (site_type === '/tutorials') {
		          // this.$router.push({path:`/tutorials/detail/${id}`})
		          this.$router.push({name: 'tutorialsDetail', params: { articleId: id }})
		          // this.$router.push({name: 'about'})
		        }
	  		}
	    },
	  }
	  
	}
</script>

<style scoped>
	.turn-page{
		float: left;
		text-align: left;
	}
	a:hover { color:#2cadff;}
</style>
