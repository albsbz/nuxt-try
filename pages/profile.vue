<template>
  <div>
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="18" :md="12" :lg="10">   
          <h1 class="app-h1">Профиль</h1>
            <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="onSubmit">
              <el-card class="box-card">
                <div slot="header" class="box-header">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                  <div class="text"> 
                    <h5>Имя: 
                      <span class="pointer" v-if="!showFormItem1" @click="showFormItem1=!showFormItem1">
                        {{controls.name}}
                      </span>
                    </h5>
                    <el-form-item prop="name" v-if="showFormItem1" @click="showFormItem1=!showFormItem1">
                      <el-input v-model="controls.name"/>
                    </el-form-item>
                  </div>
                  
                  <el-button style="float: right; padding: 3px 0" type="text" class="button" native-type="submit">
                    Сохранить измененмя
                  </el-button>
                </div>
                <h5>Описание: </h5>
                <div v-if="!showFormItem2" @click="showFormItem2=!showFormItem2" class="pointer">
                  {{controls.description||'Нет описания'}}
                </div>
                <el-form-item prop="description" v-if="showFormItem2" @click="showFormItem2=!showFormItem2">
                  <el-input v-model="controls.description" type="textarea" resize="none" :rows="2"/>
                </el-form-item>
              </el-card>
            </el-form>
        </el-col>
      </el-row>

    
  </div>
</template>



<script>
  
  export default {
    components: {
      
    },
    data() {
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        formLabelWidth: '120px',
        showFormItem1:false,
        showFormItem2:false,
        controls:{
            name:'',
            description:''
        },
        rules: {
            name: [
                { required: true, message: 'Имя не должно быть пустым', trigger: 'blur' }
            ],
            description: [
                { required: true, message: 'Введите описание', trigger: 'blur' }
            ],
        },
        loading: false,
      };
    },
    async asyncData({store}) {
        const user = await store.dispatch('user/fetchCurrentUser') 
        return {user}
    },
    mounted(){
      this.controls.name=this.user.name,
      this.controls.description=this.user.description
    },
    methods:{
        onSubmit(){     
          this.$refs['form'].validate(async (valid) => {
            if (valid) {
              this.loading=true
              const formData={
                  name: this.controls.name,
                  description: this.controls.description
              }
              try {
                  
                  await this.$store.dispatch('user/updateCurrentUser', formData)
                  this.$message.success('Данные профиля изменены')
                  this.$router.push('/')
              } catch (error) {
                  this.loading=false
              }
            } 
          });
        }
    }
  };
</script>

<style lang="scss" scoped>
.box-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-header button{
  align-self: flex-start
}
.box-header .text{
  flex-grow: 2;
  padding: 5px
}
.pointer{
   cursor: pointer;
}


</style>