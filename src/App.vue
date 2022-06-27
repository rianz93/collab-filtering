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
    <div class="db-jumbotron p-2 m-2" v-if="child_index">
      <b-jumbotron
        header="UKDLSM"
        lead="Sistem Rekomendasi Instrumen Investasi Menggunakan Algoritma Collaborative-filtering"
      >
        <hr />
        <p>
          Selamat datang di Sistem Rekomendasi Instrumen Investasi Menggunakan
          Algoritma Collaborative-filtering
        </p>
      </b-jumbotron>
      <div class="categories">
        <hr />
        <b-card-group deck>
        <b-card
          title="Rekomendasi"
          img-src="investment.png"
          img-alt="../src/assets/recommendations.png"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-2 mr-2"
        >
          <b-card-text>
            Temukan rekomendasi instrumen investasi pilihan berdasarkan kriteria
          </b-card-text>

          <b-button href="#" variant="outline-success"
            >Mulai rekomendasi<b-icon
              class="ml-1"
              icon="box-arrow-in-right"
            ></b-icon
          ></b-button>
        </b-card>
        <b-card
          title="Pengujian"
          img-src="pengujian.png"
          img-alt="../src/assets/recommendations.png"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-2"
        >
          <b-card-text>
            Akurasi pengujian sistem dengan menggunakan SVM
          </b-card-text>

          <b-button href="#" variant="outline-success"
            >Lihat pengujian<b-icon
              class="ml-1"
              icon="box-arrow-in-right"
            ></b-icon
          ></b-button>
        </b-card>
        </b-card-group>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getData } from "../src/database/config.js";
export default {
  data() {
    return {
      child_index: true,
      investor: [],
    };
  },
  created() {
    getData.then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        this.investor.push({ ...doc.data(), id: doc.id });
      });
    });
    console.log(this.investor);
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

.db-jumbotron {
  text-align: left;
  border-radius: 40px;
}
.categories img{
  width: 50%;
  margin: auto;
  padding-top: 20px;
}
.categories{
  text-align: center;
}
#nav {
  margin-bottom: 10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
