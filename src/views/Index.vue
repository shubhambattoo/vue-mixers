<template>
  <div class="home">
    <div class="container d-grid">
      <div class="card" v-for="cocktail in cocktails" :key="cocktail.id">
        <div class="card-content">
          <i class="material-icons" @click="deleteCocktail(cocktail.id)" >delete</i>
          <h3 class="card-title amber-text text-darken-4">{{cocktail.title}}</h3>
          <ul class="ingredients">
            <li v-for="(ingredient, index) in cocktail.ingredients" :key="index">
              <span class="chip">{{ingredient}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "index",
  data() {
    return {
      cocktails: [
        {
          title: "Crantini Cocktail",
          slug: "crantini-cocktail",
          ingredients: ["vodka", "cranberry liqueur", "fresh cranberries"],
          id: "1"
        },
        {
          title: "Cuba Libre",
          slug: "cuba-libre",
          ingredients: ["light rum", "lime (juiced)", "Coca-Cola"],
          id: "2"
        }
      ]
    };
  },
  methods : {
    deleteCocktail (id) {
      this.cocktails = this.cocktails.filter((cocktail) => cocktail.id !== id)
    }
  }
};
</script>

<style>
.home .d-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin-top: 60px;
}

.card h3 {
  font-size: 1.8rem;
  text-align: center;
  margin-top: 0;
}

.card ul.ingredients {
  margin: 30px auto;
}

.card ul li {
  display: inline-block;
}
.card i {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size:1.4rem;
}
</style>
