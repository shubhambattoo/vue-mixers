<template>
  <div id="app">
		<Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
	components : {
		Navbar
  },
  data () {
    return {
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
