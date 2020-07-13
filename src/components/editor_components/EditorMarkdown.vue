<template>
  <div id="markdown">
    <!-- Main pane -->
    <!-- <section class="content box"> -->
      <div class="edit-form box">
        <fieldset>
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
          <CategorySelect v-model="articleData.category" v-on:selectCategoryhandle="listenToCategory"></CategorySelect>
          <div class="form-row field-edit_mode" style="float: right; margin-right: 10px">
            <div>
              <label class="required" for="id_edit_mode">编辑器切换:</label>
              <select name="edit_mode" id="id_edit_mode" v-model.number="articleData.edit_mode" @change="changeEditMode(articleData.edit_mode)">
                <option value="1" >markdown</option>
                <option value="2" >ckeditor</option>
              </select>
            </div>
          </div>

          <div class="form-row field-content">
            <label for="id_content">文章内容:</label>
            <textarea name="content" cols="40" rows="10" class="vLargeTextField" id="id_content" v-model="articleData.content"></textarea>
          </div>
          <div class="toolbar status-bar">
            <span class="date">
              <span class="label">Created</span>
              <span class="value">{{ articleData.create_time | date }}</span>
            </span>
            <span class="lines">
              <span class="label">Lines</span>
              <span class="value">{{ linesCount }}</span>
            </span>
            <span class="words">
              <span class="label">Words</span>
              <span class="value">{{ wordsCount }}</span>
            </span>
            <span class="characters">
              <span class="label">Characters</span>
              <span class="value">{{ charactersCount }}</span>
            </span>
          </div>
        </fieldset>
      </div>
    <!-- </section> -->

    <!-- Preview pane -->
    <aside class="preview box">
      <div class="preview-content" v-html="articlePreview"></div>
    </aside>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import marked from 'marked'
import CategorySelect from '../../components/CategorySelect'
Vue.filter('date', time => moment(time).format('YYYY-MM-DD HH:mm'))

export default {
  name: 'EditorMarkdown',
  props: {
    article: {
      type: Object,
      default: function () {
        return { title: '123', description: '', content: '', status: 1, edit_mode: 1, category: 0, create_time: '' }
      }
    }
    // category_id: Number
  },
  components: {
    CategorySelect
  },
  data () {
    return {
      selectedCategory: 0,
      // articleData: this.article
    }
  },
  created () {
    console.log(this.article)
  },
  // Computed properties
  computed: {
    articleData () {
      return this.article
    },
    articlePreview () {
      // Markdown rendered to HTML
      return this.articleData.content ? marked(this.articleData.content) : ''
    },

    // sortedNotes () {
    //   return this.notes.slice().sort((a, b) => a.created - b.created)
    //     .sort((a, b) => (a.favorite === b.favorite) ? 0 : a.favorite ? -1 : 1)
    // },
    linesCount () {
      if (this.articleData.content) {
        // Count the number of new line characters
        return this.articleData.content.split(/\r\n|\r|\n/).length
      }
      return 0
    },
    wordsCount () {
      if (this.articleData.content) {
        var s = this.articleData.content
        // Turn new line cahracters into white-spaces
        s = s.replace(/\n/g, ' ')
        // Exclude start and end white-spaces
        s = s.replace(/(^\s*)|(\s*$)/gi, '')
        // Turn 2 or more duplicate white-spaces into 1
        s = s.replace(/[ ]{2,}/gi, ' ')
        // Return the number of spaces
        return s.split(' ').length
      }
      return 0
    },

    charactersCount () {
      if (this.articleData.content) {
        return this.articleData.content.split('').length
      }
      return 0
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
      handler: 'saveNotes',
      // We need this to watch each note's properties inside the array
      deep: true
    },
    // Let's save the selection too
    selectedId (val) {
      localStorage.setItem('selected-id', val)
    }
  },

  methods: {
    changeEditMode (mode) {
      this.$emit('selectedMode', mode)
      // store.state.create_article.edit_mode = mode
    },
    pushArticle () {
      this.$emit('pullArticle', this.articleData)
    },
    listenToCategory: function (cateid) {
      this.articleData.category = cateid
      // store.state.create_article.category = cateid
    },
    // Remove the selected note and select the next one
    removeNote () {
      if (this.selectedArticle && confirm('Delete the note?')) {
        // Remove the note in the notes array
        const index = this.notes.indexOf(this.selectedArticle)
        if (index !== -1) {
          this.notes.splice(index, 1)
        }
      }
    },
    saveNotes () {
      // Don't forget to stringify to JSON before storing
      localStorage.setItem('notes', JSON.stringify(this.notes))
      // console.log('Notes saved!', new Date())
    },

    favoriteNote () {
      // this.selectedNote.favorite = !this.selectedNote.favorite
      // this.selectedNote.favorite = this.selectedNote.favorite ^ true
      this.selectedArticle.favorite ^= true
    }
  }
}

</script>

<style scoped>

#markdown {
  margin: 10px 0;
  align-items : flex-end;
  width: auto;
  /*border: 2px solid red;*/
  /*min-width: 900px;*/
  min-height: 800px;
  /*沿水平主轴让元素从左向右排列*/
  /*flex-direction:row;*/
}

.box {
  border: solid 3px #cccccc;
  box-sizing: border-box;
  -moz-box-sizing: border-box; /* Firefox */
  -webkit-box-sizing: border-box; /* Safari */
  width: 50%;
  min-height: 800px;
  float: left;
  border-radius: 10px;
  background: #fefefe url(../../static/images/tutorials/post_bg.gif) top repeat-x;
}
.edit-form {
  margin: 0;
  display: flex;
  /*沿垂直主轴让元素从上向下排列*/
  flex-direction: column;
  /*border: 2px solid red;*/
}

.preview {
  /*height: 600px;*/
  /*height: 700px;*/
  overflow: auto;
  border: solid 3px #cccccc;
  border-radius: 10px;
}
.preview-content {
  height: 750px;
  padding: 10px;
  text-align: left;
  display: block;
  overflow: auto;
  /*white-space:nowrap;  /*强制文字在同一行显示*/
  /*word-wrap: break-word;*/
}
fieldset {
  height: inherit;
  width: 96%;
  margin: 2px;
  border: 2px;
  border-radius: 10px;
  padding: 2px;
  text-align: left;
  /*min-height: 95%;*/
}
.field-content {
  height: 680px;
  margin: 2px 0;

}

textarea {
  width: 100%;
  min-height: 95%;
  resize: none;
  /*border: none;*/
  box-sizing: border-box;
  margin: 0 4px;
  font-family: monospace;
}

button,
input,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  box-sizing: border-box;
  outline: none !important;
}

input {
  width: 80%;
  border: solid 1px #ade2ca;
  border-radius: 3px;
  padding: 2px 10px;
  background: #f0f9f5;
  color: #666;
}

input {
  height: 28px;
}

.toolbar {
  padding: 4px;
  box-sizing: border-box;
}

.status-bar {
  margin-top: -5px;
  margin-left: 5px;
  font-size: 12px;
  /*margin: 0 10px;*/
  padding: 0 20px;
  color: #777;
  background-color: #eeeeee;
  border-radius: 5px;
}
.status-bar > span {
  margin-right: 30px;
}
.status-bar > span .label{
  color: #40b883;
}

a {
  color: #40b883;
}
</style>
