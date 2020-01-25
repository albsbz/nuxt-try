<template>
     <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="onSubmit">
        <h2>создать пользователя</h2>
            <el-form-item label="Логин" prop="login">
                <el-input v-model.trim="controls.login"/>
            </el-form-item>
            <div class="mb2"><el-form-item label="Пароль" prop="password">
                <el-input v-model.trim="controls.password" resize="none" type="password"/>
            </el-form-item></div>
            <el-form-item >
                <el-button type="primary" round native-type="submit" :loading="loading">
                    Создать
                </el-button>
            </el-form-item>
        </el-form>
</template>

<script>
export default {
    head() {
        return {
            'title':`${process.env.appName} | Создать пользователя`
        }
    },
    layout:'admin',
    middleware: ['admin-auth'],
    data(){
        return {
            controls:{
                login:'',
                password:''
            },
            rules: {
                login: [
                    { required: true, message: 'Введите логин', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Введите пароль', trigger: 'blur' },
                    {min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: 'blur' }
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
                        login: this.controls.login,
                        password: this.controls.password,
                    }
                    try {
                        await this.$store.dispatch('auth/createUser', formData)
                        this.$message.success('пользователь создан')
                        this.controls.login=''
                        this.controls.password=''
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
    form{width: 600px;}
</style>