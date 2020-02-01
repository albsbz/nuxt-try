<template>
   <nav>
      <el-menu :default-active="activeLink" :router="true" class="el-menu" mode="horizontal">
         <template 
            v-for="menuItem in menu"
          >
            <el-submenu :key="menuItem.name" v-if="menuItem.submenu" :index="menuItem.index" :route="menuItem.path">
                <template slot="title">
                  {{menuItem.name}}
                </template>
                <template  v-for="submenuItem in menuItem.submenu">
                  <el-menu-item
                    v-if="submenuItem"
                    :route="submenuItem.path" 
                    :index="submenuItem.index"
                    :key="submenuItem.name"
                  > 
                    {{submenuItem.name}}                
                  </el-menu-item> 
                </template>
            </el-submenu>
            <el-menu-item 
              v-else
              :route="menuItem.path" 
              :key="menuItem.name"
              :index="menuItem.index"
            >
              {{menuItem.name}}
            </el-menu-item>
         </template>
      </el-menu>
  </nav> 
</template>

<script>
  export default {
    data() {
      return {
        activeLink: ''
      }
    },
    computed:{
        menu(){
          return [
            {name:'Главная', path:'/', index:'1'},
            {name:'Контакты', path:'/contacts', index:'2'},
            {name: 'Профиль', path:'/profile', index:'5', submenu:[
                !this.$store.getters['auth/isAuth']?{name:'Войти', path:'/auth/login', index:'5-1'}:{name:'Выйти', path:'/auth/logout', index:'5-1'},
                !this.$store.getters['auth/isAuth']?{name:'Регистрация', path:'/auth/registration', index:'5-2'}:undefined,
                this.$store.getters['auth/isAdmin']?{name:'Админпанель', path:'/admin', index:'5-3'}:undefined,
                this.$store.getters['auth/isAuth']?{name:'Редактировать профиль', path:'/profile', index:'5-4'}:undefined
              ]
            }
          ]
        }
    },
    methods: {
      handleSelect(key, keyPath) {
      }
    },
    created () {
      this.activeLink =this.menu.find((o,i)=>{
        if (o.path===this.$route.path){return this.menu[i]}
      }).index
       
      // this.activeLink = this.$route.path
    },
    // watch: {
    //   $route (newVal, oldVal) {
    //     this.activeLink = newVal.path
    //   }
    // }
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