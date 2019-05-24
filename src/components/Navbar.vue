<template>
  <div class="navbar navbar-fixed">
    <nav class="nav-extended deep-orange accent-2 darken-1">
      <div class="container">
        <div class="nav-content">
          <router-link to="/">
            <span class="nav-title">theka-cocktails</span>
          </router-link>
          <a class="btn-floating btn-large halfway-fab waves-effect waves-light brown darken-4">
            <router-link to="add-cocktail">
              <i class="material-icons">add</i>
            </router-link>
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {};
  }
};
</script>

<style>
</style>

