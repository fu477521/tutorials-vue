<template>
    <div class="wrapper">
        <h3>文章目录</h3>
        <div class="container">
            <div class="menu">
                <ul class="menu-list">
                    <li v-for="(nav, index) in navList"
　　　　　　　　　　　　　　:key="index"
　　　　　　　　　　　　　　:class="{on: activeIndex === index}"
　　　　　　　　　　　　　　@click="currentClick(index)">
                        <a href="javascript:;" @click="pageJump(nav.index)">{{nav.title}}</a>
                        <div v-if="nav.children.length > 0 && activeIndex === index"
　　　　　　　　　　　　　　　　class="menu-children-list">
                            <ul class="nav-list">
                                <li v-for="(item, idx) in nav.children"
　　　　　　　　　　　　　　　　　　　　　:key="idx"
　　　　　　　　　　　　　　　　　　　　　:class="{on: childrenActiveIndex === idx}"
　　　　　　　　　　　　　　　　　　　　　@click.stop="childrenCurrentClick(idx)">
                                    <a href="javascript:;" @click="pageJump(item.index)">{{item.title}}</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="help-center-content" v-html="compiledMarkdown"
 　　　　　　　ref="helpDocs" @scroll="docsScroll"></div>
        </div>
    </div>
</template>

<script>
import marked from 'marked';

let rendererMD = new marked.Renderer();
marked.setOptions({
    renderer: rendererMD,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

export default {
    // props: ['mdContent'],
    // props: {
    //     mdContent: {
    //         type: String,
    //         required: true,
    //         default: '#Array \n## Bre\n\n#xx'
    //     }
    // // category_id: Number
    // },
    data() {
        return {
            mdContent: "## Docker三大核心概念 \
                - 容器（Container）\n \
                - 镜像（Image）\
                - 仓库（Repository）\
                \n\
## 安装\n\
### 常规安装\n\
安装建议看官方文档，这样才是最新最靠谱最安全（Chrome浏览器下没有看不懂的英文）：\n\
Docker[安装](https://docs.docker.com/install/)\n\
\n\
### 使用脚本自动安装\n\
在测试或开发环境中 Docker 官方为了简化安装流程，提供了一套便捷的安装脚本，CentOS 系统上可以使用这套脚本安装，另外可以通过 --mirror 选项使用国内源进行安装：\n\
```bash\n\
$ curl -fsSL get.docker.com -o get-docker.sh\n\
$ sudo sh get-docker.sh --mirror Aliyun\n\
# $ sudo sh get-docker.sh --mirror AzureChinaCloud\n\
```\n\
执行这个命令后，脚本就会自动的将一切准备工作做好，并且把 Docker CE 的稳定(stable)版本安装在系统中。\n\
\n\
## Docker 版本说明\n\
Docker CE 在 17.03 版本之前叫 Docker Engine,  版本号范围: 0.1.0 ~ 1.13.1",
            // navList: [],
            activeIndex: 0,
            docsFirstLevels: [],
            docsSecondLevels: [],
            childrenActiveIndex: 0
        }
    },
    mounted() {
        // this.navList = this.handleNavTree();
        this.getDocsFirstLevels(0);
    },
    methods: {
        childrenCurrentClick(index) {
            this.childrenActiveIndex = index
        },
        getDocsFirstLevels(times) {
            // 解决图片加载会影响高度问题
            setTimeout(() => {
                let firstLevels = [];
                Array.from(document.querySelectorAll('h1'), element => {
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
            let firstLevelIndex = this.getLevelActiveIndex(scrollTop, this.docsFirstLevels)
            this.currentClick(firstLevelIndex)

            let secondLevelIndex = this.getLevelActiveIndex(scrollTop, this.docsSecondLevels)
            this.childrenCurrentClick(secondLevelIndex)
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
        pageJump(id) {
            alert(id)
            this.titleClickScroll = true;
            // this.$refs.helpDocs.scrollTop = this.$el.querySelector(`#data-${id}`).offsetTop - 40;
            this.$el.querySelector(`#data-2`).scrollIntoView()
            setTimeout(() => this.titleClickScroll = false, 100);
        },
        currentClick(index) {
           this.activeIndex = index
           this.getDocsSecondLevels(index)
        },
        getTitle(content) {
            let nav = [];

            let tempArr = [];
            content.replace(/(#{2,6})[^#][^\n]*?(?:\n)/g, function(match, m1, m2) {
                    let title = match.replace('\n', '');
                    let level = m1.length;
                    tempArr.push({
                        title: title.replace(/^#+/, '').replace(/\([^)]*?\)/, ''),
                        level: level,
                        children: [],
                    });
                });

            // 只处理一级二级标题，以及添加与id对应的index值
            nav = tempArr.filter(item => 1 < item.level <= 3);
            let index = 0;
            return nav = nav.map(item => {
                item.index = index++;
                return item;
            });
        },
        // 将一级二级标题数据处理成树结构
        handleNavTree() {
            let navs = this.getTitle(this.content)
            let navLevel = [1, 2];
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
                    // 处理二级标题，并将二级标题添加到对应的父级标题的children中
                    toAppendNavList.forEach(item => {
                        item = Object.assign(item);
                        let parentNavIndex = this.getParentIndex(navs, item.index);
                        return this.appendToParentNav(retNavs, parentNavIndex, item);
                    });
                }
            });
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
    computed: {
        navList () {
            return this.handleNavTree()
        },
        content() {
            // console.log(this.mdContent)
            return this.mdContent
        },
        compiledMarkdown: function() {
            let index = 0;
            rendererMD.heading = function(text, level) {
                if (level <= 2) {
                    return `<h${level} id="data-${index++}">${text}</h${level}>`;
                } else {
                    return `<h${level}>${text}</h${level}>`;
                }
            };
            rendererMD.code = function(code, language) {
                code = code.replace(/\r\n/g,"<br>")
                code = code.replace(/\n/g,"<br>");
                return `<div class="text">${code}</div>`;
            };
            return marked(this.content);
        }
    }
}
</script>


<style scoped>
h3 {
  margin: 0;
}

ul {
  margin:0 0 0 8px;
  padding:1px 0 0 0;
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