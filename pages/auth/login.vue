<template>
    <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="18" :md="12" :lg="10" >
            <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="onSubmit">
                <h2>Войти</h2>
                    <el-form-item label="Логин" prop="login">
                        <el-input v-model.trim="controls.login"/>
                    </el-form-item>
                    <div class="mb2"><el-form-item label="Пароль" prop="password">
                        <el-input v-model.trim="controls.password" resize="none" type="password"/>
                    </el-form-item></div>
                    <el-form-item >
                        <el-button type="primary" round native-type="submit" :loading="loading">
                            Войти
                        </el-button>
                    </el-form-item>
                </el-form>
        </el-col>
    </el-row>
</template>

<script>
export default {
    head() {
        return {
            'title':`${process.env.appName} | Вход`
        }
    },
    layout:'default',
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
                    { required: true, message: 'Введите пароль', trigger: 'blur' }
                ],
            },
            loading: false
        }
    },
    mounted(){
        const {message}=this.$route.query
        if (message==='login'){
            this.$message.info('Войдите в систему')
        } else if (message==='logout'){
            this.$message.info('Вы вышли из профиля')
        } else if (message==='session'){
            this.$message.warning('Время сессии истекло, зайдите заново')
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
                       await this.$store.dispatch('auth/login', formData)
                       .then(()=>{
                            this.$message.success(`С возвращением, ${formData.login}!`)
                            this.$router.push('/')
                        })       
                        .catch(()=>{
                            this.controls.password=''
                        })
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