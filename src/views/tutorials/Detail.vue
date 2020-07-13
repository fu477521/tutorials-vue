<template>
  <div class="container">
    <tutorial-sidebar class="left-sidebar"></tutorial-sidebar>
    <div class="content">
      <div class="lists">
        <div  class="article-title"><h2><span>{{ articleData.title }}</span></h2></div>
        <div class="clr"></div>
        <div v-if="articleData.edit_mode===2">
          <p class="vhtml" v-html="articleData.content"></p>
        </div>
        <div v-else>
          <p class="vhtml" v-html="compiledMarkdown" ref="helpDocs" @scroll="docsScroll"  v-highlight></p>
        </div>
      </div>

      <div class="lists" v-if="!articleData">
        <h2>感谢您的关注！！！</h2>
        <div class="clr"></div>
        <p>此模块暂时没有内容哦！</p>

        <p>感谢您的关注！！！</p>
        <p><a href="#">Read more </a></p>
      </div>

      <TurnPage v-bind:TPageData="TurnPageData"></TurnPage>

    </div>
    <div v-if="articleData.edit_mode===1" class="right-sidebar">
      <tutorial-title-menu v-bind:navList="navList" v-bind:activeIndex="activeIndex" v-bind:childrenActiveIndex="childrenActiveIndex" @jumpId="pageJump"></tutorial-title-menu>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  import hljs from "highlight.js"
  import javascript from 'highlight.js/lib/languages/javascript';
  // import 'highlight.js/styles/googlecode.css' //样式文件
  // import 'highlight.js/styles/monokai-sublime.css';
  import 'highlight.js/styles/atom-one-dark.css';
  import tutorialSidebar from './tutorial_sidebar'
  import tutorialTitleMenu from './tutorialTitleMenu'
  import TurnPage from '../../components/TurnPage'
  import {getArticle, listArticle} from '../../api/api'
  
  let rendererMD = new marked.Renderer();
  marked.setOptions({
      renderer: rendererMD,
      highlight: function(code, language) {
        const hljs = require('highlight.js');
        const validLanguage = hljs.getLanguage(language) ? language : 'python';
        return hljs.highlight(validLanguage, code).value;
      },
      // highlight: function(code) {
      //   return hljs.highlightAuto(code).value;
      // },
      gfm: true,  //启动类似Github样式的Markdown,填写true或者false
      tables: true,  //支持Github形式的表格，必须打开gfm选项
      breaks: false,
      pedantic: false,  //只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
      sanitize: false,  //原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
      smartLists: true,
      smartypants: false,
      xhtml: false,
      langPrefix: 'language-'
  });

  export default {
    // name: 'article',
    components: {
      'TurnPage': TurnPage,
      'tutorial-sidebar': tutorialSidebar,
      'tutorial-title-menu': tutorialTitleMenu
    },
    data() {
      return {
        articleId: 0,
        articleData: {},
        categoryId: 0,
        // TurnPageData: {},
        // nextData: {},
        // previousData: {},
        // 标题菜单的数据
        // navList: [],
        activeIndex: 0,
        docsFirstLevels: [],
        docsSecondLevels: [],
        childrenActiveIndex: 0
      }
    },
    created() {
      this.articleId = this.$route.params.articleId
      this.getArticleData(this.articleId)

    },
    mounted() {
        // this.navList = this.handleNavTree();
        this.getDocsFirstLevels(0);
    },

    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        // console.log(this.$route);
        this.articleId = to.params.articleId;
        this.getArticleData(this.articleId)
      }
    },
    computed :{
      navList () {
        return this.handleNavTree()
      },
      articleContent () {
        if (this.articleData.content) {
          return this.articleData.content
        }
        return ''
      },
      compiledMarkdown () {
        if (this.articleData.content) {
          let index = 0;
          rendererMD.heading = function(text, level) {
              if (1 < level && level <= 3) {
                  return `<h${level} id="data-${index++}">${text}</h${level}>`;
              } else {
                  return `<h${level}>${text}</h${level}>`;
              }
          };
          // rendererMD.code = function(code, language) {
          //     code = code.replace(/\r\n/g,"<br>")
          //     code = code.replace(/\n/g,"<br>");
          //     return `<pre class="language-bash hljs"><code class="language-bash">${code}</code></pre>`;
          // };
          return marked(this.articleData.content);
        }
      },
      TurnPageData () {
        return {article_id: this.articleId, category_id: this.categoryId}
      }
    },
    methods: {
      getArticleData (id) {
          getArticle(id).then((response) => {
            // console.log(response.data)
            this.articleData = response.data
            this.categoryId = response.data.category_id
            // this.nextData = response.data.next || {'id': 0, 'title': '没有下一篇了'}
            // this.previousData = response.data.previous || {'id': 0, 'title': '没有上一篇了'}
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      
      getLevelActiveIndex(scrollTop, docsLevels) {
          let currentIdx = null;
          let nowActive = docsLevels.some((currentValue, index) => {
              if(currentValue >= scrollTop) {
                  currentIdx = index
                  return true
              }
          })

          currentIdx = currentIdx - 1

          if (nowActive && currentIdx === -1) {
              currentIdx = 0
          } else if (!nowActive && currentIdx === -1) {
              currentIdx = docsLevels.length - 1
          }
          return currentIdx
      },
      currentClick(index) {
        this.activeIndex = index
        this.getDocsSecondLevels(index)
      },
      childrenCurrentClick(index) {
        this.childrenActiveIndex = index
      },
      getDocsFirstLevels(times) {
        // 解决图片加载会影响高度问题
        setTimeout(() => {
          let firstLevels = [];
          Array.from(document.querySelectorAll('h2'), element => {
            firstLevels.push(element.offsetTop - 60)
          })
          this.docsFirstLevels = firstLevels;

          if (times < 8) {
            this.getDocsFirstLevels(times + 1);
          }
        }, 500);
      },
      getDocsSecondLevels(parentActiveIndex) {
          let idx = parentActiveIndex;
          let secondLevels = [];
          let navChildren = this.navList[idx].children

          if(navChildren.length > 0) {
              secondLevels = navChildren.map((item)=>{
                  return this.$el.querySelector(`#data-${item.index}`).offsetTop - 60
              })
              this.docsSecondLevels = secondLevels;
          }
      },
      docsScroll() {
          if (this.titleClickScroll) {
              return;
          }

          let scrollTop = this.$refs.helpDocs.scrollTop
          // console.log(scrollTop)
          let firstLevelIndex = this.getLevelActiveIndex(scrollTop, this.docsFirstLevels)
          this.currentClick(firstLevelIndex)

          let secondLevelIndex = this.getLevelActiveIndex(scrollTop, this.docsSecondLevels)
          this.childrenCurrentClick(secondLevelIndex)
      },
      pageJump(id) {
          this.titleClickScroll = true;
          // this.$refs.helpDocs.scrollTop = this.$el.querySelector(`#data-${id}`).offsetTop - 40;
          // document.querySelector(".vhtml").scrollTop=this.$el.querySelector(`#data-${id}`).offsetTop
          this.$el.querySelector(`#data-${id}`).scrollIntoView()
          setTimeout(() => this.titleClickScroll = false, 100);
      },
      getTitle(content) {
        let nav = [];
        let tempArr = [];
        // let preObj = {title: '', level: 3, children: []};
        content.replace(/(#{2,6})[^#][^\n]*?(?:\n)/g, function(match, m1, m2) {
            let title = match.replace('\n', '');
            let level = m1.length;
            let curObj = {
                title: title.replace(/^#+/, '').replace(/\([^)]*?\)/, ''),
                level: level,
                children: [],
            };
            // 三级以下标题舍弃，三级标题放在二级标题的children数组里面
            if (level > 3) {
                return
            // } else if (level > preObj.level) {
            //     preObj.children.push(curObj);
            // } else {
            //     tempArr.push(curObj);
            //     preObj = curObj;
            };
            tempArr.push(curObj);
          }
        );
        // 只处理二级三级标题，以及添加与id对应的index值
        nav = tempArr.filter(item => 1 < item.level <= 3);
        let index = 0;
        return nav = nav.map(item => {
            item.index = index++;
            return item;
        });
      },
      // 将一级二级标题数据处理成树结构
      handleNavTree() {
        let navs = this.getTitle(this.articleContent)
        let navLevel = [2, 3];
        let retNavs = [];
        let toAppendNavList;

        navLevel.forEach(level => {
          // 遍历一级二级标题，将同一级的标题组成新数组
          toAppendNavList = this.find(navs, {
            level: level
          });

          if (retNavs.length === 0) {
            // 处理一级标题
            retNavs = retNavs.concat(toAppendNavList);
          } else {
            // 处理三级标题，并将三级标题添加到对应的父级标题的children中
            toAppendNavList.forEach(item => {
                item = Object.assign(item);
                let parentNavIndex = this.getParentIndex(navs, item.index);
                return this.appendToParentNav(retNavs, parentNavIndex, item);
            });
          }
        });
        // console.log(retNavs)
        return retNavs;
      },
      find(arr, condition) {
          return arr.filter(item => {
              for (let key in condition) {
                  if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
                      return false;
                  }
              }
              return true;
          });
      },
      getParentIndex(nav, endIndex) {
          for (var i = endIndex - 1; i >= 0; i--) {
              if (nav[endIndex].level > nav[i].level) {
                  return nav[i].index;
              }
          }
      },
      appendToParentNav(nav, parentIndex, newNav) {
          let index = this.findIndex(nav, {
              index: parentIndex
          });
          nav[index].children = nav[index].children.concat(newNav);
      },
      findIndex(arr, condition) {
          let ret = -1;
          arr.forEach((item, index) => {
              for (var key in condition) {
                  if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
                      return false;
                  }
              }
              ret = index;
          });
          return ret;
      },
    },
    
    // beforeRouteUpdate (to, from, next) {
    //   // react to route changes...
    //   // don't forget to call next()
    //   console.log(to)
    //   this.articleId = to.params.articleId
    //   this.getArticleData(this.articleId)
    //   next()
    // }
  }
</script>

<style scoped>
body {
  line-height: 1;
  font-family: "Poppins",sans-serif;
}

body,html{
  width: 100%;
  height: 100%;
}

.container{
  width: 100%;
  height: 100%;
  display:flex
  /*margin: 100px auto;*/
  /*border: 3px dashed red;*/
  /*display: inline-block;*/
}

.content{
  max-width: 800px;
  width: 100%;
  /*margin-top: 10px;*/
  /*margin-left: 250px;*/
  margin-right: 2px;
  position: relative;

}
.article-title{
  text-align: center;
  font-size: 22px;
}

.lists{
  text-align: left;
  margin: 10px 5px;
  padding: 1px 20px;
  border-radius: 10px;
  /*border: 1px solid #aaa;*/
  /*background:#fefefe url(../../static/images/tutorials/post_bg.gif) top repeat-x;*/
  background-color: #F5F5F5
}

.vhtml >>> img,p,span {
  width: 100%;
  overflow: auto;
  /*white-space: pre-wrap;*/
}

a:hover{
  color: #fa8341;
  cursor: pointer;
}

</style>
