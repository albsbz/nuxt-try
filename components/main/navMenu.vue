<template>
   <nav>
      <el-menu :default-active="activeLink" :router="true" class="el-menu" mode="horizontal">
         <el-menu-item 
            v-for="(item) in menu"
            :route="item.path"
            :key="item.name" 
            :index="item.path">
            {{item.name}}
         </el-menu-item>
      </el-menu>
  </nav> 
</template>

<script>
  export default {
    data() {
      return {
        activeLink: '1'
      }
    },
    computed:{
        menu(){
          return [
            {name:'Главная', path:'/'},
            {name:'Контакты', path:'/contacts'},
            !this.$store.getters['auth/isAuth']?{name:'Войти', path:'/auth/login'}:{name:'Выйти', path:'/auth/logout'},
            !this.$store.getters['auth/isAuth']?{name:'Регистрация', path:'/auth/registration'}:{},
            this.$store.getters['auth/isAdmin']?{name:'Админпанель', path:'/admin'}:{},
          ]
        }
    },
    methods: {
      handleSelect(key, keyPath) {
      }
    },
    mounted () {
      this.activeLink = this.$route.path
    },
    watch: {
      $route (newVal, oldVal) {
        this.activeLink = newVal.path
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