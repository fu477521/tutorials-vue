<template>
    <div id="tinymce-editor">
        <!-- Main pane -->
        <section class="content box">
            <div class="edit-form">
                <fieldset class="module aligned ">
                    <div class="form-row field-title">
                        <div>
                            <label class="required" for="id_title">标题:</label>
                            <input type="text" name="title" maxlength="255" required="" id="id_title" v-model="articleData.title">
                        </div>
                    </div>
                    <div class="form-row field-description">
                        <div>
                            <label for="id_description">摘要:</label>
                            <input type="text" name="description" maxlength="1024" id="id_description" v-model="articleData.description">
                        </div>
                    </div>
                    <CategorySelect v-model="selectedCategoryId" v-on:selectCategoryhandle="listenToCategory"></CategorySelect>
                    <div class="form-row field-edit_mode" style="float: right; margin-right: 10px" >
                        <div>
                            <label class="required" for="id_edit_mode">编辑器切换:</label>
                            <select name="edit_mode" id="id_edit_mode" v-model.number="articleData.edit_mode" @change="changeEditMode(articleData.edit_mode)">
                                <option value="1">markdown</option>
                                <option value="2">ckeditor</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row field-content">
                        <label for="id_content">文章内容:</label>
                        <Editor id="id_content" v-model="article.content"
                                :init="init" :disabled="disabled"></Editor>
<!--                        <div v-html="articleData.content"></div>-->
<!--                        <textarea class="tinymce" name="content" cols="40" rows="10" id="id_content" v-model="articleData.content"></textarea>-->
                    </div>
                </fieldset>

<!--                <div class="submit-row">-->
<!--                    <button @click="updateArticleData" title="_save">保存</button>-->
<!--                    <button @click="" title="_addanother">草稿</button>-->
<!--                    <button @click="" title="_continue">保存并增加另一个</button>-->
<!--                </div>-->
            </div>
        </section>
    </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'

import Vue from 'vue'
import moment from 'moment'
import CategorySelect from '../../components/CategorySelect'
import {getArticle, updateArticle, createArticle, uploadimg} from '../../api/api'
Vue.filter('date', time => moment(time).format('YYYY-MM-DD HH:mm'))

export default {
    name: 'EditorRichText',
    components: {
        CategorySelect,
        Editor
    },
    props: {
        category_id: Number,
        article: {
            type: Object,
            default: function () {
                return { title: '123', description: '', content: '', status: 1, edit_mode: 1, category: 0, create_time: '' }
            }
        },
        // tinymce参数
        disabled: {
            type: Boolean,
            default: false
        },
        plugins: {
            type: [String, Array],
            default: 'link lists image code table colorpicker textcolor wordcount contextmenu'
        },
        toolbar: {
            type: [String, Array],
            default: 'undo redo | formatselect | bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | outdent indent blockquote | lists link unlink image media table code | removeformat'
        }
    },

    data () {
        return {
            init: {
                selector: '#id_content', // DOM选择器
                language_url: '/tinymce/langs/zh_CN.js',
                language: 'zh_CN',
                skin_url: '/tinymce/skins/ui/oxide',
                height: 680,
                branding: false,//是否禁用“Powered by TinyMCE” > 去水印
                menubar: false,//顶部菜单栏显示
                plugins: this.plugins, // 插件
                toolbar: this.toolbar,  // 工具栏，false时隐藏工具栏
                // statusbar: false, // 隐藏底部状态栏
                elementpath: false, // 禁用下角的当前标签路径
                paste_data_images: true, // 允许粘贴图片
                browser_spellcheck: false, // 拼写检查
                //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
                //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
                images_upload_handler: (blobInfo, success, failure) => {
                    // const img = 'data:image/jpeg;base64,' + blobInfo.base64()
                    // success(img)
                    this.handleImgUpload(blobInfo, success, failure)
                }
            },
        }
    },
    mounted () {
      tinymce.init({})
    },
    created () {
        // (typeof(localStorage.username) !== 'undefined')
        this.articleId = this.$route.params.articleId
        // 如果存在articleId，就获取文章数据进行更新
        if (this.articleId) {
            this.getArticleData()
        }
    },
    // Computed properties
    computed: {
        articleData () {
            return this.article
        },
        selectedCategoryId () {
            return this.article.category
        }
    },

    // Change watchers
    watch: {
        articleData: {
            handler: 'pushArticle',
            deep: true
        },
        // When our notes change, we save them
        notes: {
            // The method name
            handler: 'saveNotes',
            // We need this to watch each note's properties inside the array
            deep: true
        },
    },

    methods: {
        changeEditMode (mode) {
            this.$emit('selectedMode', mode)
        },
        pushArticle () {
            this.$emit('pullArticle', this.articleData)
        },
        listenToCategory: function (cateid) {
            this.articleData.category = cateid
        },
        getArticleData () {
            getArticle(this.articleId).then((response) => {
                // console.log(response.data)
                this.articleData = response.data
            })
                .catch(function (error) {
                    console.log(error)
                })
        },
        updateArticleData () {
            // 如果存在articleId，就获取文章数据进行更新
            if (this.articleId) {
                updateArticle(this.articleData).then((response) => {
                    // this.articleData = response.data
                    var type = this.$route.matched[0].path
                    if (type === '/blogs') {
                        this.$router.push({name: 'blogsDetail', params: { articleId: id }})
                    }
                    if (type === '/forums') {
                        this.$router.push({name: 'forumsDetail', params: { articleId: id }})
                    }
                    if (type === '/tutorials') {
                        this.$router.push({name: 'tutorialsDetail', params: { articleId: id }})
                    }
                })
                    .catch(function (error) {
                        console.log(error)
                    })
            } else {
                createArticle(this.articleData).then((response) => {
                    this.articleId = response.data.id
                    // this.articleData = response.data
                    var type = this.$route.matched[0].path
                    if (type === '/blogs') {
                        this.$router.push({name: 'blogsDetail', params: { articleId: id }})
                    }
                    if (type === '/forums') {
                        this.$router.push({name: 'forumsDetail', params: { articleId: id }})
                    }
                    if (type === '/tutorials') {
                        this.$router.push({name: 'tutorialsDetail', params: { articleId: id }})
                    }
                })
            }
        },
        handleImgUpload (blobInfo, success, failure) {
            let formdata = new FormData()
            formdata.set('upload_file', blobInfo.blob())
            formdata.set('content_type', 'tutorials')
            uploadimg(formdata).then(res => {
                success(res.data.url)
            }).catch(res => {
                failure('error')
            })
        }
    }
}
</script>

<style scoped>

    /*#markdown > * {*/
    /*  margin: 10px;*/
    /*  float: left;*/
    /*  display: flex;*/
    /*  flex-direction: column;*/
    /*  !*width: 150px;*!*/
    /*  min-height: 500px;*/
    /*  border: 4px solid red;*/
    /*  !*> * {*!*/
    /*  !*  flex: auto 0 0;*!*/
    /*  !*}*!*/
    /*  }*/

    #tinymce-editor {
        margin-left: 20px;
        margin-top: 10px;
        align-items : flex-end;
        /*width: auto;*/
        min-width: 1600px;
        min-height: 800px;
        /*沿水平主轴让元素从左向右排列*/
        /*flex-direction:row;*/
    }

    .box {
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
        width:45%;
        min-height: inherit;
        float:left;
        border-radius: 10px;
        background:#fefefe url(../../static/images/tutorials/post_bg.gif) top repeat-x;
    }
    .content {
        min-width: 53%;
        display: flex;
        /*沿垂直主轴让元素从上向下排列*/
        flex-direction: column;
    }
    .edit-form{
        min-height: inherit;
    }
    fieldset {
        min-height: inherit;
        margin-top: 2px;
        border-radius: 10px;
        padding: 5px 10px;
        text-align: left;
    }
    .field-content {
        height: 400px;
    }

    textarea {
        width: 100%;
        min-height: 92%;
        resize: none;
        /*border: none;*/
        box-sizing: border-box;
        margin: 0 4px;
        font-family: monospace;
    }

    input, textarea {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        box-sizing: border-box;
        outline: none !important;
    }

    input {
        width: 400px;
        border: solid 1px #CCCCCC;
        border-radius: 3px;
        padding: 2px 10px;
        background: #f0f9f5;
        color: #666;
    }

    button,
    input {
        height: 34px;
    }
    a {
        color: #40b883;
    }
</style>
