<template>
<div>
  <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="18" :md="12" :lg="10" >
        <app-post  v-for="post in postsList" :key="post._id" :post="post">
        </app-post>
      </el-col>
  </el-row>
  <el-pagination
    layout="sizes, prev, pager, next"
    :total="totalPages"
    :page-size="pageSize"
    :page-sizes="[2, 10, 25, 50, 100]"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange">
</el-pagination>
</div>
</template>

<style lang="scss">
</style>

<script>
  import AppPost from '@/components/main/post'
  export default {
    head: {
      'title':`${process.env.appName} | Главная`
    },
    computed:{
      totalPages(){
        return this.posts.length
      },
      postsList () {
        return this.posts.slice(((this.currentPage - 1) * this.pageSize), (this.pageSize * this.currentPage))
      }
    },
    data: function(){
      return {
        pageSize: 2,
        currentPage: 1
      }
    },
    components:{
      AppPost
    },
    async asyncData({store}) {
      const posts = await store.dispatch('post/fetch')
      return {posts}
    },
    methods: {
      handleSizeChange (size) {
          this.pageSize = size
      },
      handleCurrentChange (value) {
          this.currentPage = value
      }
    }
  }
</script>