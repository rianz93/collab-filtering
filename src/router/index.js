import Vue from "vue";
import VueRouter from "vue-router";
import kuesioner from "../views/kuesioner/kuesioner.vue";
import rekomendasi from "../views/rekomendasi/rekomendasi.vue";
import pengujian from "../views/pengujian/pengujian.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/kuesioner",
    component: kuesioner,
    name: "kuesioner",
    props: true,
  },
  {
    path: "/rekomendasi",
    component: rekomendasi,
    name: "rekomendasi",
    props: true,
  },
  {
    path: "/pengujian",
    component: pengujian,
    name: "pengujian",
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
