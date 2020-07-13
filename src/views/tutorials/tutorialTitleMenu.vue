<template>
    <div class="gadget">
        <!-- <h3>内容节点</h3> -->
        <div class="container">
            <div class="menu">
                <ul class="menu-list">
                    <li v-for="(nav, index) in navList"
　　　　　　　　　　　　　　:key="index"
　　　　　　　　　　　　　　:class="{on: activeIndex === index}">
<!-- 　　　　　　　　　　　　　　@click="currentClick(index)"> -->
                        <a href="javascript:;" @click="pageJump(nav.index)">{{nav.title.substring(0,12)}}</a>
                        <div v-if="nav.children.length > 0 && activeIndex === index"
　　　　　　　　　　　　　　　　class="menu-children-list">
                            <ul class="nav-list">
                                <li v-for="(item, idx) in nav.children"
　　　　　　　　　　　　　　　　　　　　　:key="idx"
　　　　　　　　　　　　　　　　　　　　　:class="{on: childrenActiveIndex === idx}">
<!-- 　　　　　　　　　　　　　　　　　　　　　@click.stop="childrenCurrentClick(idx)"> -->
                                    <a href="javascript:;" @click="pageJump(item.index)">{{item.title.substring(0,10)}}</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- <div class="help-center-content" v-html="compiledMarkdown"
 　　　　　　　ref="helpDocs" @scroll="docsScroll"></div> -->
        </div>
    </div>
</template>

<script>
import marked from 'marked';

// let rendererMD = new marked.Renderer();
// marked.setOptions({
//     renderer: rendererMD,
//     gfm: true,
//     tables: true,
//     breaks: false,
//     pedantic: false,
//     sanitize: false,
//     smartLists: true,
//     smartypants: false
// });

export default {
    // props: ['mdContent'],
    props: {
        navList: {
            type: Array,
            required: true,
            default: ''
        },
        activeIndex: {
            type: Number,
            default: 0
        },
        childrenActiveIndex: {
            type: Number,
            default: 0
        }
    // category_id: Number
    },
    // data() {
    //     return {
    //         // navList: [],
    //         activeIndex: 0,
    //         docsFirstLevels: [],
    //         docsSecondLevels: [],
    //         childrenActiveIndex: 0
    //     }
    // },
    // mounted() {
    //     // this.navList = this.handleNavTree();
    //     // this.getDocsFirstLevels(0);
    // },
    methods: {
        pageJump(id) {
            // alert(id)
            this.$emit('jumpId', id)
            // this.titleClickScroll = true;
            // this.$refs.helpDocs.scrollTop = this.$el.querySelector(`#data-${id}`).offsetTop - 40;
            // setTimeout(() => this.titleClickScroll = false, 100);
        },
        // childrenCurrentClick(index) {
        //     this.childrenActiveIndex = index
        // },
        // getDocsFirstLevels(times) {
        //     // 解决图片加载会影响高度问题
        //     setTimeout(() => {
        //         let firstLevels = [];
        //         Array.from(document.querySelectorAll('h1'), element => {
        //             firstLevels.push(element.offsetTop - 60)
        //         })
        //         this.docsFirstLevels = firstLevels;

        //         if (times < 8) {
        //             this.getDocsFirstLevels(times + 1);
        //         }
        //     }, 500);
        // },
        // getDocsSecondLevels(parentActiveIndex) {
        //     let idx = parentActiveIndex;
        //     let secondLevels = [];
        //     let navChildren = this.navList[idx].children

        //     if(navChildren.length > 0) {
        //         secondLevels = navChildren.map((item)=>{
        //             return this.$el.querySelector(`#data-${item.index}`).offsetTop - 60
        //         })
        //         this.docsSecondLevels = secondLevels;
        //     }
        // },
        // docsScroll() {
        //     if (this.titleClickScroll) {
        //         return;
        //     }

        //     let scrollTop = this.$refs.helpDocs.scrollTop
        //     let firstLevelIndex = this.getLevelActiveIndex(scrollTop, this.docsFirstLevels)
        //     this.currentClick(firstLevelIndex)

        //     let secondLevelIndex = this.getLevelActiveIndex(scrollTop, this.docsSecondLevels)
        //     this.childrenCurrentClick(secondLevelIndex)
        // },
        // getLevelActiveIndex(scrollTop, docsLevels) {
        //     let currentIdx = null;
        //     let nowActive = docsLevels.some((currentValue, index) => {
        //         if(currentValue >= scrollTop) {
        //             currentIdx = index
        //             return true
        //         }
        //     })

        //     currentIdx = currentIdx - 1

        //     if (nowActive && currentIdx === -1) {
        //         currentIdx = 0
        //     } else if (!nowActive && currentIdx === -1) {
        //         currentIdx = docsLevels.length - 1
        //     }
        //     return currentIdx
        // },

        // currentClick(index) {
        //    this.activeIndex = index
        //    this.getDocsSecondLevels(index)
        // },
        // getTitle(content) {
        //     let nav = [];
        //     let tempArr = [];
        //     // let preObj = {
        //     //             title: '',
        //     //             level: 3,
        //     //             children: [],
        //     // };

        //     content.replace(/(#{2,6})[^#][^\n]*?(?:\n)/g, function(match, m1, m2) {
        //             let title = match.replace('\n', '');
        //             let level = m1.length;
        //             let curObj = {
        //                 title: title.replace(/^#+/, '').replace(/\([^)]*?\)/, ''),
        //                 level: level,
        //                 children: [],
        //             };
        //             // 三级以下标题舍弃，三级标题放在二级标题的children数组里面
        //             // if (level > 3) {
        //             //     return
        //             // } else if (level > preObj.level) {
        //             //     preObj.children.push(curObj);
        //             // } else {
        //             //     tempArr.push(curObj);
        //             //     preObj = curObj;
        //             // };
        //             tempArr.push(curObj);
        //         }
        //     );
        //     // console.log(tempArr)
        //     // 只处理二级三级标题，以及添加与id对应的index值
        //     nav = tempArr.filter(item => 1 < item.level <= 3);
        //     let index = 0;
        //     return nav = nav.map(item => {
        //         item.index = index++;
        //         return item;
        //     });
        // },
        // // 将一级二级标题数据处理成树结构
        // handleNavTree() {
        //     let navs = this.getTitle(this.content)
        //     let navLevel = [2, 3];
        //     let retNavs = [];
        //     let toAppendNavList;

        //     navLevel.forEach(level => {
        //         // 遍历一级二级标题，将同一级的标题组成新数组
        //         toAppendNavList = this.find(navs, {
        //             level: level
        //         });

        //         if (retNavs.length === 0) {
        //             // 处理一级标题
        //             retNavs = retNavs.concat(toAppendNavList);
        //         } else {
        //             // 处理三级标题，并将三级标题添加到对应的父级标题的children中
        //             toAppendNavList.forEach(item => {
        //                 item = Object.assign(item);
        //                 let parentNavIndex = this.getParentIndex(navs, item.index);
        //                 return this.appendToParentNav(retNavs, parentNavIndex, item);
        //             });
        //         }
        //     });
        //     console.log(retNavs)
        //     return retNavs;
        // },
        // find(arr, condition) {
        //     return arr.filter(item => {
        //         for (let key in condition) {
        //             if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
        //                 return false;
        //             }
        //         }
        //         return true;
        //     });
        // },
        // getParentIndex(nav, endIndex) {
        //     for (var i = endIndex - 1; i >= 0; i--) {
        //         if (nav[endIndex].level > nav[i].level) {
        //             return nav[i].index;
        //         }
        //     }
        // },
        // appendToParentNav(nav, parentIndex, newNav) {
        //     let index = this.findIndex(nav, {
        //         index: parentIndex
        //     });
        //     nav[index].children = nav[index].children.concat(newNav);
        // },
        // findIndex(arr, condition) {
        //     let ret = -1;
        //     arr.forEach((item, index) => {
        //         for (var key in condition) {
        //             if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
        //                 return false;
        //             }
        //         }
        //         ret = index;
        //     });
        //     return ret;
        // },
    },
    computed: {
        // navList () {
        //     return this.handleNavTree()
        // },
        // content() {
        //     // console.log(this.mdContent)
        //     return this.mdContent
        // },
        // compiledMarkdown: function() {
        //     let index = 0;
        //     rendererMD.heading = function(text, level) {
        //         if (level <= 2) {
        //             return `<h${level} id="data-${index++}">${text}</h${level}>`;
        //         } else {
        //             return `<h${level}>${text}</h${level}>`;
        //         }
        //     };
        //     rendererMD.code = function(code, language) {
        //         code = code.replace(/\r\n/g,"<br>")
        //         code = code.replace(/\n/g,"<br>");
        //         return `<div class="text">${code}</div>`;
        //     };
        //     return marked(this.content);
        // }
    }
}
</script>


<style scoped>
.gadget {
  /*position: relative;*/
  /*float: right;*/
  right: 50px;
  position:fixed;
  margin:10px 5px;
  padding:10px 10px;
  width:110px;
  /*border:1px solid #d8d6d6;*/
  border-radius: 5px;
  background:#fefefe url(../../static/images/tutorials/post_bg.gif) top repeat-x;
}
.menu {
    margin-top: 20px;
}

h3 {
  margin: 0;
}

ul {
  margin:0 0 0 8px;
  padding:5px 0 0 0;
  /*border: 1px solid red;*/
  text-align: left;
  /*list-style:none;*/
  /*标记是实心方块*/
  list-style-type: square;
  /*标记放置在文本以内*/
  /*list-style-position:inside;*/
  color:#959595;

}
li {
  /*border: 1px solid green;*/
  border-bottom:1px solid #dedede;
  /*line-height:20px;*/
}
/*.J_subView {*/
/*  height: 20px;*/
/*}*/
li{ padding:1px 0 1px 1px; text-align: left}
li a { color:#959595; text-decoration:none; margin-left:-8px;}
li a:hover { color:#2cadff; text-decoration:underline;}
/*.child_menu{visibility: hidden;}*/
/*.sb_menu li a:hover ~ .child_menu{ visibility: visible;}*/
dl {
  margin: 0;
}
dd {
  margin-left: 10px;
  border-bottom:1px solid #dedede;
}

.wise {
  text-align: center;
}
.wise > img {
  height: 10px;
}
.ww-author {
  /*position: absolute;*/
  margin-top: -12px;
  /*padding-top: -10px;*/
  /*padding: 10px auto;*/
}
em {
  font-size: 10px;
}

.recommend {
  font-size: 8px;
}
</style>