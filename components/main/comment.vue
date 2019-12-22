<template>
    <el-card class="comment">
        <div class="comment-header">
            <span class="person-name">Person name</span>
            <span><small class="el-icon-time">{{new Date().toLocaleString()}}</small></span>
        </div>
        <small class="comment-text">Lorem ipsum dolor sit amet.</small>
    </el-card>
</template>
<script>
export default {
    props:[
        'comment'
    ]
}
</script>
<style lang="scss" scoped>
 .comment{
     margin-bottom: 1rem;
 }
 .comment-header{
     display:flex;
     justify-content:space-between;
     margin-bottom: 0.5rem;
      font-size: 0.8rem;
 }
 .comment-text{
     white-space: pre-line;
 }
//  .person-name{
    
//  }
</style>