<template>
  <el-container>
  <el-header>
    <nav-menu></nav-menu>
  </el-header>
  <el-main><nuxt/></el-main>
  <el-footer>Footer</el-footer>
</el-container>
</template>

<script>
import navMenu from '~/components/main/navMenu'
export default {
  components: {navMenu},
   pageTransition: 'page'
}
</script>
<style>

</style>

