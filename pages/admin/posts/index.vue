<template>
  <el-table
    :data="posts"
    style="width: 100%">
    <el-table-column
      label="Название"
      width="180"
      prop="title"
      />
    <el-table-column
      label="Дата"
      width="180">

      <template slot-scope="{row: {date}}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ new Date(date).toLocaleString() }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Просмотры" width="180">
      <template slot-scope="{row: {views}}">
        <i class="el-icon-view"></i>
        <span style="margin-left: 10px">{{ views }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Коментарии" width="180">
      <template slot-scope="{row: {comments}}">
        <i class="el-icon-message"></i>
        <span style="margin-left: 10px">{{ comments.length }}</span>
      </template>
    </el-table-column>
    
    <el-table-column
      label="Действия">
      <template slot-scope="scope">
        <el-tooltip  effect="light" content="Редактировать" placement="top">
            <el-button
            circle
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"/>
        </el-tooltip>
        <el-tooltip effect="light" content="Удалить" placement="top">  
            <el-button
            circle
            icon="el-icon-delete"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"/>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    layout:'admin',
    middleware: ['admin-auth'],
    async asyncData({store}) {
        const posts= await store.dispatch('post/fetchAdminPosts')
        return {posts}
    },

    methods: {
      handleEdit(index, {_id}) {
        this.$router.push(`/admin/posts/${_id}`)
      },
      async handleDelete(index, {_id}) {
        try{
          await this.$confirm('Удалить', 'Внимание', {
            confirmButtonText: 'Удалить',
            cancelButtonText: 'Отмена',
            type: 'warning'
          }) 
          
          await this.$store.dispatch('post/delete', _id)
          
          this.posts=this.posts.filter(p=>p._id!==_id)
          debugger
          this.$message.success('пост удален')
           debugger
        } catch (e){
            
        }

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
