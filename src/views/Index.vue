<template>
  <div class="home">
    <div class="progress" v-if="dataIsLoading">
      <div class="indeterminate"></div>
    </div>
    <div class="container d-grid" v-if="!dataIsLoading">
      <div class="card" v-for="cocktail in cocktails" :key="cocktail.id">
        <div class="card-content">
          <i class="material-icons del" @click="deleteCocktail(cocktail.id)">delete</i>
          <h3 class="card-title amber-text text-darken-4">{{cocktail.title}}</h3>
          <ul class="ingredients">
            <li v-for="(ingredient, index) in cocktail.ingredients" :key="index">
              <span class="chip">{{ingredient}}</span>
            </li>
          </ul>
        </div>
        <button class="btn-floating btn-large halfway-fab waves-effect waves-light brown darken-4">
          <router-link :to="{name : 'editCocktail', params : {id : cocktail.slug}}">
            <i class="material-icons">edit</i>
          </router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import db from "@/firebase/init";

export default {
  name: "index",
  data() {
    return {
      cocktails: [],
      dataIsLoading: true
    };
  },
  methods: {
    async deleteCocktail(id) {
      try {
        // delete doc from db
        await db
          .collection("cocktails")
          .doc(id)
          .delete();
        // created()
        this.cocktails = this.cocktails.filter(cocktail => cocktail.id !== id);
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
    }
  },
  created() {
    // fetch data from db
    db.collection("cocktails")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let cocktail = doc.data();
          cocktail.id = doc.id;
          this.cocktails.push(cocktail);
          this.dataIsLoading = false;
        });
      });
  }
};
</script>

<style>
.home .progress {
  margin-top: 30px;
}
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
.card i.del {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4rem;
}

@media screen and (max-width: 768px) {
  .home .d-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width: 576px) {
  .home .d-grid {
    grid-template-columns: 1fr;
    margin-bottom: 30px;
  }
}
</style>
