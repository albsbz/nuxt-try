<template>
  <div>
      
      <el-row type="flex" justify="center">
        
        <el-col :xs="24" :sm="18" :md="12" :lg="10">   
          <h1 class="app-h1">Контакты</h1>
          <el-card :body-style="{ padding: '0px' }">
            <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d8501.437318596923!2d35.135520251948435!3d47.84375884168317!3m2!1i1024!2i768!4f13.1!5e0!3m2!1suk!2sua!4v1541447194463" 
              width="100%" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>
            <div style="padding: 14px;">
              <span>Телефон: </span>
              <span>Адрес: </span>
              <div class="bottom clearfix">
                <el-button 
                  @click="formVisible=true" type="success" round icon="el-icon-message" class="button">
                  Обратная связь
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-dialog title="Обратная связь" :visible.sync="formVisible">
        <app-contact-form :confirm="confirm" @created="closeDialog" @nonValid="confirm=false"/>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click.prevent="confirmClick">Confirm</el-button>
        </span>
      </el-dialog>
  </div>
</template>



<script>
  import appContactForm from "~/components/main/contactForm"
  export default {
    components: {
      appContactForm
    },
    data() {
      return {
        confirm: false,
        formVisible: false
      };
    },
    methods:{
      confirmClick(){
        this.confirm=true
      },
      closeDialog(){
        this.formVisible = false
        this.confirm=false
      }
    }
  };
</script>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: left;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

  .app-h1 {
    text-align: center;
  }
</style>