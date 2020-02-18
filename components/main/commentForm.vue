<template>
    <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="onSubmit">
       <h2>Добавить коментарий</h2>
        <el-form-item label="Текст" prop="text">
            <el-input v-model="controls.text" type="textarea" resize="none" :rows="2"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" round native-type="submit" :loading="loading">
                Добавить коментарий
            </el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import { async } from 'q';
export default {
    props:{
        postId: {
            type:String,
            required:true
        }
    },
    data(){
        return {
            controls:{
                text:''
            },
            rules: {
                text: [
                    { required: true, message: 'Введите сообщение', trigger: 'blur' }
                ],
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
                        text: this.controls.text,
                        postId: this.postId,
                        author: this.$store.getters['auth/currentUser'].id
                    }
                    try {
                       const newComment= await this.$store.dispatch('comment/create', formData)
                        this.$message.success('Ваш коментарий добавлен')
                        this.$emit('created', {newComment})
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

</style>