<template>
  <div id="app">
    <div id="nav">
      <b-navbar type="dark" variant="info">
        <b-navbar-brand>App</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#/kuesioner">Kuesioner</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getData } from "../src/database/config.js";
export default {
  data() {
    return {
      investor: [],
    };
  },
  created() {
    getData.then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        this.investor.push({ ...doc.data(), id: doc.id });
      });
    });
    // console.log(this.investor);
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  margin-bottom: 40px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
