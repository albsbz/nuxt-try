<template>
<div>
  <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="18" :md="12" :lg="10" >
        <app-post  v-for="post in posts" :key="post.id" :post="post">
        </app-post>
      </el-col>
  </el-row>
</div>
</template>

<style lang="scss">
</style>

<script>
  import AppPost from '@/components/main/post'
  export default {
   head: {
     'title':'Главная'
   },
   components:{
     AppPost
   },
   data(){
     return {
        posts:[
         {'id':1, 'title': 'first'},
         {'id':2, 'title': 'second'}
       ]
     }   
   }

  }
</script>