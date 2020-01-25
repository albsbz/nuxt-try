<template>
  <el-table
    :data="users"
    style="width: 100%">
    <el-table-column
      label="Имя"
      width="180"
      prop="login"
      />
    <el-table-column
      label="Статус"
      width="180">

      <template slot-scope="{row: {isAdmin}}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{isAdmin?'Админ':'Пользователь'}}</span>
      </template>
    </el-table-column>
    
    
    <el-table-column
      label="Действия">
      <template slot-scope="scope">
        <el-tooltip  effect="light" content="Сменить статус" placement="top">
            <el-button
            circle
            type="primary"
            icon="el-icon-medal"
            @click="handleStatus(scope.$index, scope.row)"/>
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
    head() {
        return {
            'title':`${process.env.appName} | Все пользователи`
        }
    },
    layout:'admin',
    middleware: ['admin-auth'],
    async asyncData({store}) {
        const users= await store.dispatch('user/fetchAdminUsers')
        return {users}
    },

    methods: {
      async handleStatus(index, {_id}) {
        try{
          await this.$store.dispatch('user/toggleStatus', _id)
          this.users[index].isAdmin=!this.users[index].isAdmin

          this.$message.success('Статус изменен')
        } catch (e){
            
        }
      },
      async handleDelete(index, {_id}) {
        try{
          await this.$confirm('Удалить', 'Внимание', {
            confirmButtonText: 'Удалить',
            cancelButtonText: 'Отмена',
            type: 'warning'
          }) 
          
          await this.$store.dispatch('user/delete', _id)
          
          this.users=this.users.filter(u=>u._id!==_id)
          this.$message.success('Пользователь удален')
        } catch (e){
            
        }

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
