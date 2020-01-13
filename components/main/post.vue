<template>
   <el-card shadow="hover" :body-style="{padding:0}" class="post">
       <header slot="header" class="post-header">
           <h3>{{post.title}}</h3>
           <small class="el-icon-time">{{post.date|date('time')}}</small>
       </header>
       <div class="post-body">
           <img 
            :src="post.imageUrl" 
            alt="post-image" 
            class="post-img"
           >
       </div>
       <footer class="post-footer">
           <el-button round @click="openPost">Открыть</el-button>
           <span><i class="el-icon-s-comment"></i>{{post.comments.length}}</span>
       </footer>
   </el-card>
</template>

<script>
export default {
 props : {
     post: {
         type: Object,
         required:true
     }
 }, 
 methods:{
     openPost(){
         this.$router.push(`posts/${this.post._id}`)
     }
 }
}
</script>

<style lang="scss" scoped>
 .post {
    //  height:200px;
    //  border: solid 1px black;
     margin-bottom: 2rem;
 }
 .post-img {
     width: 100%;
     height: auto;
 }
 .post-header {
     display:flex;
     justify-content: space-between;
     align-items: center;
 }
//  .post-body {
//     //  margin-bottom: 1rem;
//  }
 .post-footer{
     padding: 1rem;
     display:flex;
     justify-content: space-between;
     align-items:center;
 }

</style>