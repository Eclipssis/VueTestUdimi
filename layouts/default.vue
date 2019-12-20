<template>
  <div>
    <Header></Header>
    <nuxt/>
  </div>
</template>

<script>
import Header from "@/layouts/header";

export default {
  components: {
    Header
  },

  mounted () {
    this.$store.commit('auth/setUser', {
      user: JSON.parse(window.localStorage.getItem("user")),
      token: window.localStorage.getItem("token")
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,700,900&display=swap&subset=cyrillic');

html {
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

#__layout {
  margin-top: 47px;
}

a {
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}

.page {
  min-height: calc(100vh - 47px);
}

input::placeholder {
  font-size: 14px;
  font-style: italic;
  opacity: 0.6;
}

input.error {
  border: 1px solid red;
}

.form-group {
  position: relative;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.text-left {
  text-align: left;
}

input, 
textarea {
  border: 1px solid #4b84da;
  border-radius: 5px;
  padding: 15px;
  width: 100%;
  outline: none;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

