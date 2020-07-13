<template>
<div class="category-select">
  <div class="category">
    <div class="category-box">
      <label for="category1">类别:</label>
      <select name="category" id="category1" v-model.number="Index1"  v-on:change="handleCategory1(Index1)">
        <option value="" selected="">---------</option>
        <option :value="index" v-for="(cate1,index) in categoryData1List" :key="cate1.id">{{cate1.name}}</option>
      </select>
    </div>

    <div class="category-box">
      <label for="category2"> >> </label>
      <select name="category" id="category2" v-model.number="Index2"  v-on:change="handleCategory2(Index2)">
        <option value="" selected="">---------</option>
        <option :value="index" v-for="(cate2,index) in categoryData2List" :key="cate2.id">{{cate2.name}}</option>
      </select>
    </div>

    <div class="category-box">
      <label for="category3"> >> </label>
      <select name="category" id="category3" v-model.number="categoryId" v-on:change="handleCategory3">
        <option value="" selected="">---------</option>
        <option :value="cate3.id" v-for="(cate3,index) in categoryData3List" :key="cate3.id">{{cate3.name}}</option>
      </select>
    </div>
  </div>
</div>
</template>

<script>
import { getTutorialsCategory, getBlogsCategory, getForumsCategory } from '../api/api'
export default {
  name: 'Category.vue',
  props: {
    selectedCategoryId: Number
  },
  data () {
    return {
      categoryId: 0, // 需要上传的第三类别ID
      Index1: -1, // 已选择的一级类别的索引值
      Index2: -1, // 已选择的二级类别的索引值
      categoryData1List: [], // 一级类别的数组
      // categoryData2List: [], // 一级类别的数组
      // categoryData3List: [], // 一级类别的数组
    }
  },
  computed: {
    // 二级类别的数组
    categoryData2List () {
      let category1obj = this.categoryData1List[this.Index1]
      // console.log(category1obj)
      // this.categoryId = category1obj ? category1obj.id : this.categoryId
      // alert('222+'+this.categoryId)
      return category1obj ? category1obj.sub_category : []
    },
    // 三级类别的数组
    categoryData3List () {
      let category2obj = this.categoryData2List[this.Index2]
      // this.categoryId = category2obj ? category2obj.id : this.categoryId
      // alert('333+'+this.categoryId)
      return category2obj ? category2obj.sub_category : []
    }
  },
  methods: {
    handleCategory1: function (Index) {
      let category1obj = this.categoryData1List[Index]
      this.categoryId = category1obj.id
      // this.categoryData2List = category1obj ? category1obj.sub_category : []
      this.$emit('selectCategoryhandle', this.categoryId)
      // alert('1>>>' + this.categoryId)
    },
    handleCategory2: function (Index) {
      let category2obj = this.categoryData2List[Index]
      this.categoryId = category2obj.id
      // this.categoryData3List = category2obj ? category2obj.sub_category : []
      this.$emit('selectCategoryhandle', this.categoryId)
      // alert('2>>>' + this.categoryId)
    },
    handleCategory3: function () {
      if (this.categoryId !== undefined) {
        this.$emit('selectCategoryhandle', this.categoryId)
        // alert('3>>>' + this.categoryId)
      }
      
    },
    getTotalCategory () { // 获取菜单
      var site_type = this.$route.matched[0].path
      if (site_type === '/blogs') {
        getBlogsCategory({
          params: {}
        }).then((response) => {
          console.log(response)
          this.categoryData1List = response.data
        })
          .catch(function (error) {
            console.log(error)
          })
      }
      else if (site_type === '/forums') {
        getForumsCategory({
          params: {}
        }).then((response) => {
          console.log(response)
          this.categoryData1List = response.data
        })
          .catch(function (error) {
            console.log(error)
          })
      }
      else if (site_type === '/tutorials') {
        getTutorialsCategory({
          params: {is_nested: true}
        }).then((response) => {
          console.log(response)
          this.categoryData1List = response.data
        })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  },
  created () {
    this.getTotalCategory()
  }
}
</script>

<style scoped>
.category {
  display: flex;
  flex-direction: row;
}
.category-box {
  margin-right: 10px;
}
</style>
