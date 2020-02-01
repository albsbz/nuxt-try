<template>
  <div class="page-wrap">
    <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="onSubmit">
        <h1 class="mb">Создать новый пост</h1>
        <el-form-item label="Заголовок" prop="title">
            <el-input v-model="controls.title" />
        </el-form-item>
         
        <el-form-item label="Текст" prop="text">
            <el-input type="textarea" v-model="controls.text" resize="none" 
            :rows="10"/>
        </el-form-item>
        <el-upload
        class="mb"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-change="handleImageChange"
        :auto-upload="false"
        ref="upload"
        >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Перетащите картинку<em>Нажмите для загрузки</em></div>
        <div class="el-upload__tip" slot="tip">jpg/png файлы меньше 500kb</div>
        </el-upload>

        
        
        <el-form-item >
            <el-button type="success" plain @click="previewDialog=true">Предпросмотр </el-button>
            <el-button type="primary" round native-type="submit" :loading="loading">
                Создать пост
            </el-button>
        </el-form-item>
    </el-form>
    <el-dialog
        title="Предпросмотр"
        :visible.sync="previewDialog"
    >
     <div :key="controls.text">
        <vue-markdown>{{controls.text}}</vue-markdown>
      </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="previewDialog = false">Confirm</el-button>
        </span>
    </el-dialog>

      
  </div>
</template>

<script>

export default {
    layout:'admin',
    middleware: ['user-auth', 'is-admin-auth'],
    head(){
        return{
       'title':`${process.env.appName} | Пост | Создать новый`
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
            previewDialog: false,
            loading: false,
            image:null
        }
    },
    methods: {
        onSubmit(){
            
            this.$refs['form'].validate(async (valid) => {
                if (valid && this.image) {
                    this.loading=true;
                    const formData={
                        title: this.controls.title,
                        text: this.controls.text,
                        image: this.image
                    }
                    try {
                        await this.$store.dispatch('post/create', formData)
                        this.controls.title=''
                        this.controls.text=''
                        this.image=null
                        this.$refs['upload'].clearFiles()
                        this.$message.success('Пост создан')
                        this.loading=false
                    } catch (error) {
                        this.loading=false
                    }
            
                } else {
                    this.$message.warning('форма не валидна')
                }
            });
        },
        handleImageChange(file, fileList){
            this.image=file.raw
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