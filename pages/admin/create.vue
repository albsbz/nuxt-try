<template>
  <div class="page-wrap">
    <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="onSubmit">
        <h1 class="mb">Создать новый пост</h1>
        <el-form-item label="Заголовок" prop="title">
            <el-input v-model.trim="controls.title" />
        </el-form-item>
        
        <el-form-item label="Текст" prop="text">
            <el-input type="textarea" v-model.trim="controls.text" resize="none" 
            :rows="10"/>
        </el-form-item>
        
        
        <el-form-item >
            <el-button type="primary" round native-type="submit" :loading="loading">
                Создать пост
            </el-button>
        </el-form-item>
    </el-form>
      
  </div>
</template>

<script>
export default {
    layout:'admin',
    middleware: ['admin-auth'],
    head(){
        return{
        title: `Пост | Создать новый`
        }
    },
    data(){
        return {
            controls:{
                title:'',
                text:''
            },
            rules: {
                title: [
                    { required: true, message: 'Введите заголовок', trigger: 'blur' }
                ],
                text: [
                    { required: true, message: 'Введите текст', trigger: 'blur' }
                ]
            },
            loading: false
        }
    },
    methods: {
        onSubmit(){
            
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    this.loading=true;
                    const formData={
                        title: this.controls.title,
                        text: this.controls.text,
                    }
                    try {
                        await this.$store.dispatch('post/create', formData)
                        this.controls.title=''
                        text: this.controls.text=''
                        this.$message.success('Пост создан')
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