<template>
    <div id="editor">
        <div v-if="article.edit_mode===2">
            <editor-rich-text v-bind:article="article" @selectedMode="listenEditMode" @pullArticle="pullArticle"></editor-rich-text>
        </div>
        <div v-else>
            <editor-markdown v-bind:article="article" @selectedMode="listenEditMode" @pullArticle="pullArticle"></editor-markdown>
        </div>
        <div class="submit-row">
            <button @click="updateData" title="save">保存</button>
            <button @click="" title="addanother">草稿</button>
            <!-- <button @click="" title="continue">保存并增加另一个</button> -->
        </div>
    </div>
</template>

<script>
    import EditorMarkdown from "./editor_components/EditorMarkdown";
    import EditorRichText from "./editor_components/EditorRichText";
    // import EditorRichText from "./editor_components/tinymce_test";
    import {getArticle, updateArticle, createArticle, createNote, createPost} from '../api/api'
    export default {
        name: "Edit",
        data () {
            return {
                selectedCategory: 0,
                article: {
                    title: '',
                    description: '',
                    content: '',
                    status: 1,
                    edit_mode: 1,
                    category: 0,
                    create_time: ''
                }
            }
        },
        components: {
            EditorMarkdown,
            EditorRichText
        },
        methods: {
            getData () {
                var type = this.$route.matched[0].path
                if (type === '/tutorials') {
                    getArticle(this.articleId).then((response) => {
                        // alert('数据请求成功！')
                        // console.log(response.data)
                        this.article = response.data.result
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                }
                if (type === '/blogs') {
                    getPost(this.articleId).then((response) => {
                        // alert('数据请求成功！')
                        // console.log(response.data)
                        this.article = response.data.result
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                }
                if (type === '/forums') {
                    getNote(this.articleId).then((response) => {
                        // alert('数据请求成功！')
                        // console.log(response.data)
                        this.article = response.data.result
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                }
            },
            updateData () {
                // 如果存在articleId，就获取文章数据进行更新
                if (this.articleId) {
                    console.log(this.article)
                    var type = this.$route.matched[0].path
                    if (type === '/blogs') {
                        updatePost(this.article).then((response) => {
                            this.articleId = response.data.id
                            this.$router.push({name: 'blogsDetail', params: { articleId: this.articleId }})
                        })
                        .catch((error) => {
                            console.log(error.data)
                        })
                    }
                    if (type === '/forums') {
                        updateNote(this.article).then((response) => {
                            this.articleId = response.data.id
                            this.$router.push({name: 'forumsDetail', params: { articleId: this.articleId }})
                        })
                        .catch((error) => {
                            console.log(error.data)
                        })
                    }
                    if (type === '/tutorials') {
                        updateArticle(this.article).then((response) => {
                        this.articleId = response.data.id
                        this.$router.push({name: 'tutorialsDetail', params: { articleId: this.articleId }})
                        })
                        .catch((error) => {
                            console.log(error.data)
                        })
                    }
                } else {
                    console.log(this.article)
                    var type = this.$route.matched[0].path
                    if (type === '/blogs') {
                        createPost(this.article).then((response) => {
                            this.articleId = response.data.id
                            this.$router.push({name: 'blogsDetail', params: { articleId: this.articleId }})
                        })
                        .catch((error) => {
                            console.log(error.data)
                        })
                    }
                    if (type === '/forums') {
                        createNote(this.article).then((response) => {
                            this.articleId = response.data.id
                            this.$router.push({name: 'forumsDetail', params: { articleId: this.articleId }})
                        })
                        .catch((error) => {
                            console.log(error.data)
                        })
                    }
                    if (type === '/tutorials') {
                        createArticle(this.article).then((response) => {
                        this.articleId = response.data.id
                        this.$router.push({name: 'tutorialsDetail', params: { articleId: this.articleId }})
                        })
                        .catch((error) => {
                            console.log(error.data)
                        })
                    }
                    
                    // console.log(this.$store.state.create_article)
                    
                }
            },
            listenEditMode (mode) {
                this.article.edit_mode = mode
            },
            pullArticle (article) {
                this.article = article
            }
        },
        created () {
            // (typeof(localStorage.username) !== 'undefined')
            this.articleId = this.$route.params.articleId
            // 如果存在articleId，就获取文章数据进行更新
            if (this.articleId) {
                this.getData()
            }
        }
    }
</script>

<style scoped>
    #main{
        width: 100%;
        /*border: 2px solid green;*/
    }
    .submit-row{
        /*float: left;*/
    }
    button {
        background: #CCCCCC;
        color: white;
        margin: 5px 30px;
        border-radius: 3px;
        border: none;
        display: inline-block;
        padding: 8px 12px;
        cursor: pointer;
    }

    button:hover {
        background: #aaaaaa;
    }
</style>
