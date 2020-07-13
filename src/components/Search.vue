<template>
  <div class="search">
    <form id="form" name="form" method="GET" action="/search/">
        <span>
        <input name="q" type="text" class="keywords" id="textfield" maxlength="50" value=" query|escape }}" placeholder="Search..." />
         </span>
      <input name="b" type="image" src="../static/images/tutorials/search.gif" class="button" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'search'
}
</script>

<style scoped>

</style>
