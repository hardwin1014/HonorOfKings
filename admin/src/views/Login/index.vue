<template>
  <div class="login">
    <el-card class="card">
      <h2>Login</h2>
      <el-form :model="loginModel" class="form">
        <el-form-item label="name" class="form-item">
          <input
            v-model="loginModel.username"
            class="input"
            placeholder="username"
          />
        </el-form-item>
        <el-form-item label="password" class="form-item">
          <input
            v-model="loginModel.password"
            class="input"
            type="password"
            placeholder="password"
          />
        </el-form-item>
        <el-button class="btn" @click="loginBtn">Login</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from "api/login";
export default {
  name: "Index",
  data() {
    return {
      labelPosition: "right",
      loginModel: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async loginBtn() {
      const res = await login(this.loginModel);
      localStorage.token = res.data.token; // token 包含加密的ID
      // sessionStorage.token = JSON.parse(res.data).token; 会话结束就没了
      // 一般放cookie里面
      await this.$router.push("/");
      this.$message.success("login success！");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.gooleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(
    -30deg,
    #03a9f4 0%,
    #3a78b7 50%,
    #262626 50%,
    #607d8b 100%
  );
  /*filter: hue-rotate(120deg);*/
  animation: animate 10s linear infinite;
}
@keyframes animate {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

.card {
  position: relative;
  padding: 50px;
  width: 360px;
  height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  box-shadow: 0 5px 35px rgba(0, 0, 0, 0.2);
}

.card:after {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 5px;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.1) 15%,
    transparent 50%,
    transparent 85%,
    rgba(255, 255, 255, 0.3) 100%
  );
}
.card h2 {
  color: #fff;
}

.form {
  position: relative;
  width: 100%;
}

.el-card .el-form h2 {
  color: #fff;
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 30px;
}

.form-item {
  position: relative;
  width: 100%;
  color: #000;
}

.form-item .el-form-item__label {
  color: #fff;
}

.btn,
.input {
  width: 100%;
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  padding: 8px 10px;
  border-radius: 6px;
  color: #fff;
  font-size: 16px;
  font-width: 300;
  box-shadow: inset 0 0 25px rgba(0, 0, 0, 0.2);
}
.btn {
  height: 40px;
  width: 40%;
  margin-top: 20px;
  background-color: #fff;
  color: #000;
  border: 0;
}
input::-webkit-input-placeholder {
  color: #ccc;
}
</style>
