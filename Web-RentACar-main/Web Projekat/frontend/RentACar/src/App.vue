<template>
  <div class="page-container">
    <app-header></app-header>
    <navigation-bar></navigation-bar>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/header.vue';
import Footer from './components/Footer.vue';
import NavigationBar from './components/NavigationBar.vue';

export default {
  components:{
    'app-header':Header,
    'app-footer':Footer,
    'navigation-bar':NavigationBar
  },
  data () {
    return {
    }
  }
}
</script>

