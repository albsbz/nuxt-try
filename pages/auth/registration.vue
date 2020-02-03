<template>
    <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="18" :md="12" :lg="10" >
            <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="onSubmit">
                <h2>Зарегистрироваться</h2>
                <el-form-item label="Имя" prop="name">
                    <el-input v-model.trim="controls.name"/>
                </el-form-item>
                <el-form-item label="Е-меил" prop="email">
                    <el-input v-model.trim="controls.email"/>
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
        </el-col>
    </el-row>
</template>

<script>
export default {
    head() {
        return {
            'title':`${process.env.appName} | Регистрация`
        }
    },
    layout:'default',
    data(){
        return {
            controls:{
                name:'',
                email:'',
                password:''
            },
            rules: {
                name: [
                    { required: true, message: 'Введите имя', trigger: 'blur' }
                ],
                email: [
                    {type: 'email', required: true, message: 'Введите е-меил', trigger: 'blur' }
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
                        name: this.controls.name,
                        email: this.controls.email,
                        password: this.controls.password,
                    }
                    try {
                        await this.$store.dispatch('auth/createUser', formData)
                        this.$message.success('пользователь создан')
                        this.controls.email=''
                        this.controls.name=''
                        this.controls.password=''
                        this.loading=false
                        await this.$store.dispatch('auth/login', formData)
                        this.$router.push('/')
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