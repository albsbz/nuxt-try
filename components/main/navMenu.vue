<template>
   <nav>
      <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect">
         <el-menu-item index="1">
            <nuxt-link to="/">Главная</nuxt-link>
         </el-menu-item>
        
         <el-menu-item index="2">
            <nuxt-link to="/contacts">Контакты</nuxt-link>
         </el-menu-item>
      </el-menu>
  </nav> 
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss" scoped>
 
   nav {
    display: flex;
    align-items:center;
    justify-content:center;
    height:100%;
    border-bottom: 1px solid #e6e6e6;
   }
   .el-menu{ 
      a {
         text-decoration: none;
      }

   }
 
</style>