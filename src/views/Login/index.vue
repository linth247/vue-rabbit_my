<script setup>

// 表單校驗功能(帳號名+密碼)

import { ref } from 'vue'
// import{ loginAPI } from '@/apis/user'
//如果使用 unplugin-element-plus 并且只使用组件 API，你需要手动导入样式。
// import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import {useRouter} from 'vue-router'

import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

//1.準備表單對象
const form = ref({
  account:'13123456789',
  password:'123456',
  agree: true
})

//2.準備規則對象
const rules = {
  account:[
    {required: true, message:'用戶名不能為空', trigger:'blur'}
  ],
  password:[
    {required: true, message:'密碼不能為空', trigger:'blur'},
    {min: 6, max: 14, message:'密碼長度為6-14個字符', trigger:'blur'}
  ],
  agree:[
    {
      validator:(rule, value, callback) => {
        // console.log(value)
        // 自定義校驗邏輯
        // 勾選就通過 不勾選就不通過
        if(value){
          callback()
        }else{
          callback(new Error('請勾選協議'))
        }
      }
    }
  ]
}

//3.獲取form實例做統一校驗
// 測試帳號:13123456789
// 密碼：123456
const formRef = ref(null)
const router = useRouter()
const doLogin = () => {
  const {account, password} = form.value
  //調用實例方法
  formRef.value.validate(async (valid)=>{
    //valid: 所有表單都通過校驗 才為true
    console.log(valid)
    // 以valid做為判斷條件 如果通過校驗才執行登入邏輯
    if(valid){
      // TODO LOGIN
      // const res = await loginAPI({account, password})
      // console.log(res)
      await userStore.getUserInfo({account, password})
      // 1.提示用戶
      ElMessage({type:'success', message:'登入成功'})
      // 2.跳轉首頁
      router.replace({path:'/'})
    }
  })
}

// 1.用戶名和密碼 只需要通過簡單的配置 (看文檔的方式 - 複雜功能通過多個不同組件拆解)
// 2.同意協議 自定義規則 validator:(rule,value,callback)=>{}
// 3.統一校驗 通過調用form實例的方法 validate -> true
</script>


<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">小兔鮮</RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          進入網站首頁
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">帳號登入</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="60px"
              status-icon>
              <el-form-item prop="account" label="帳號">
                <el-input v-model="form.account"/>
              </el-form-item>
              <el-form-item prop="password" label="密碼">
                <el-input v-model="form.password"/>
              </el-form-item>
              <el-form-item prop="agree" label-width="22px">
                <el-checkbox size="large" v-model="form.agree">
                  我已同意隱私條款和服務條款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="doLogin">點擊登入</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">關於我們</a>
          <a href="javascript:;">幫助中心</a>
          <a href="javascript:;">售後服務</a>
          <a href="javascript:;">配送與驗收</a>
          <a href="javascript:;">商務合作</a>
          <a href="javascript:;">搜索推薦</a>
          <a href="javascript:;">友情連接</a>
        </p>
        <p>CopyRight &copy; 小兔鮮兒</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang='scss'>
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}
</style>