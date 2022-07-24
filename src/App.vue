<template>
  <div id="app">
    <div id="nav">
      <b-navbar type="success" variant="success">
        <b-navbar-brand @click="home" style="cursor:pointer;">App</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <div style="cursor: pointer" @click="replace()">Kuesioner</div>
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
              Temukan rekomendasi instrumen investasi pilihan berdasarkan
              kriteria
            </b-card-text>

            <b-button href="/#/rekomendasi" variant="outline-success"
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
              Akurasi pengujian sistem dengan menggunakan MAE
            </b-card-text>

            <b-button href="/#/pengujian"  variant="outline-success"
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
import { numerator, denominator, getTopN } from "../src/functions/functions.js";
import { getData } from "../src/database/config.js";
export default {
  data() {
    return {
      child_index: true,
      investor: [],
      input: {},
      arrayRanking: [],
    };
  },
  methods: {
    home(){
      this.$router.replace("/")
    },
    replace() {
      this.$router.replace("/kuesioner");
    },
    test() {
      let arrayIndex = 0;
      for (let index in this.investor) {
        let result =
          numerator(this.input, this.investor[index]) /
          denominator(this.input, this.investor[index]);

        this.arrayRanking.push({
          id: this.investor[index].id,
          similarity: result,
          instrumen_investasi: this.investor[index].instrumen_investasi,
        });

        arrayIndex++;
      }
      console.log(this.arrayRanking);
      let topScorer = getTopN(this.arrayRanking, "similarity",3);
      console.log(topScorer);
    },
    refreshChildIndex() {
      this.child_index = !this.child_index;
    },
  },
  created() {
    getData.then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        this.investor.push({ ...doc.data(), id: doc.id });
      });
      this.input = this.investor[2];
      // this.test();
      console.log(this.investor);
    });
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
.categories img {
  width: 50%;
  margin: auto;
  padding-top: 20px;
}
.categories {
  text-align: center;
}
#nav {
  margin-bottom: 10px;
  color: #ffffff;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
