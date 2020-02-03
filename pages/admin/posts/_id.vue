<template>
  <div class="page-wrap">
    <el-breadcrumb separator="/" class="mb">
        <el-breadcrumb-item :to="{ path: '/admin/posts' }">Посты</el-breadcrumb-item>
        <el-breadcrumb-item>{{post.title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="onSubmit">
    <!-- <h2>Войти в профиль</h2> -->
        <el-form-item label="Текст" prop="text">
            <el-input type="textarea" v-model="controls.text" resize="none" 
            :rows="10"/>
        </el-form-item>
        <div class="mb">
            <small class="mr">
                <i class="el-icon-time"></i>
                <span >{{ post.date|date }}</span>
            </small>
             <small>
                <i class="el-icon-view"></i>
                <span >{{ post.views }}</span>
            </small>
        </div>
        
        <el-form-item >
            <el-button type="primary" round native-type="submit" :loading="loading">
                Сохранить
            </el-button>
        </el-form-item>
    </el-form>
      
  </div>
</template>

<script>
export default {
    layout:'admin',
    middleware: ['user-auth', 'is-admin-auth'],
    async asyncData({store, params}){
        const post= await store.dispatch('post/fetchAdminById', params.id)
        return {post}
    },
    head() {
        return {
            'title':`${process.env.appName} | Пост | ${this.post.title}`
        }
    },
    data(){
        return {
            controls:{
                text:''
            },
            rules: {
                text: [
                    { required: true, message: 'Введите текст', trigger: 'blur' }
                ]
            },
            loading: false
        }
    },
    beforeMount(){
        this.controls.text=this.post.text
    },
    methods: {
        onSubmit(){
            
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    this.loading=true;
                    const formData={
                        text: this.controls.text,
                        id: this.post._id
                    }
                    try {
                        await this.$store.dispatch('post/update', formData)
                        this.$router.push('/admin/posts')
                        // setTimeout(()=>{ this.$message.success('Ваш коментарий добавлен')
                        
                        // this.$emit('created')},2000)
                        this.$message.success('Пост обновлен')
                        this.loading=false
                    } catch (error) {
                        this.loading=false
                    }
            
                } 
            });
        }
    }   
}
</script>

<style lang="scss" scoped>
.page-wrap{
   width: 600px; 
}
.mr{
    margin-right: 2rem;
}
</style>   