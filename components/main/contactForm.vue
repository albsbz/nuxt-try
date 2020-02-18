<template>
    <div>
        <el-form :model="controls" :rules="rules" ref="form">
            <el-form-item label="Имя" prop="name">
                <el-input v-model="controls.name"/>
            </el-form-item>
            <el-form-item label="E-mail" prop="email">
                <el-input v-model="controls.email"/>
            </el-form-item>
            <el-form-item label="Текст" prop="text">
                <el-input v-model="controls.text" type="textarea" resize="none" :rows="2"/>
            </el-form-item>
        </el-form>
        </div>
</template>
<script>
import { async } from 'q';
export default {
    props:{
        confirm: {
            type:Boolean,
            required:true
        }
    },
    computed: {
      submitForm(){
          return this.$props.confirm
      }
    },
    watch:{
        submitForm: function(submit){
            if (submit) {
                this.onSubmit()
            }
        }
    },
    data(){
        return {
            formLabelWidth: '120px',
            controls:{
                name:'',
                email:'',
                text:''
            },
            rules: {
                name: [
                    { required: true, message: 'Имя не должно быть пустым', trigger: 'blur' }
                ],
                email: [
                    { required: true, type: 'email', message: 'Введите e-mail', trigger: 'blur' }
                ],
                text: [
                    { required: true, message: 'Введите сообщение', trigger: 'blur' }
                ],
            },
            loading: false,
        }
    },
    methods: {
        onSubmit(){
            
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    this.loading=true
                    const formData={
                        name: this.controls.name,
                        email: this.controls.email,
                        text: this.controls.text
                    }
                    try {
                        await this.$axios.post('/api/feedback', formData)
                        this.$message.success('Ваш отзыв отправлен')
                        this.$emit('created')
                    } catch (error) {
                        this.loading=false
                    }
            
                } else{
                    this.$emit('nonValid')
                }
            });
        }
    }    
}
</script>
<style lang="scss" scoped>

</style>