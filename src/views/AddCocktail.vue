<template>
  <div class="add-cocktail">
    <div class="container">
      <h2 class="center-align amber-text text-darken-4">Add New Cocktail Recipe</h2>
      <form @submit.prevent="addCocktail">
        <div class="field title">
          <label for="title">Cocktail Title</label>
          <input type="text" name="title" id="title" v-model="title">
        </div>
        <div class="chip" v-for="(ing, index) in ingredients" :key="index">
          {{ing}}
          <i class="close material-icons" @click="spliceIng(index)">close</i>
        </div>
        <div class="field ingredient">
          <label for="ingredient">Add an Ingredient</label>
          <input
            type="text"
            name="ingredient"
            @keydown.tab.prevent="addIngredient"
            v-model="another"
            id="ingredient"
          >
          <i class="material-icons add" v-if="another" @click="addIngredient">add</i>
        </div>
        <div class="field center-align">
          <p v-show="feedback" class="red-text lighten-2">{{feedback}}</p>
          <button
            class="btn brown darken-3"
            id="cancel-button"
            @click="takeBack"
            type="button"
          >Cancel</button>
          <button class="btn brown darken-4" id="add-button" type="submit">Add Cocktail</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "AddCocktail",
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    };
  },
  methods: {
    addCocktail() {
      if (this.title) {
        this.feedback = null;
        document.getElementById("add-button").setAttribute("disabled", false);

        // create slug
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'""!\-:@]/g,
          lower: true
        });

        // create cocktail obj
        const cocktail = {
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug
        };

        // add in db
        db.collection("cocktails")
          .add(cocktail)
          .then(() => {
            this.$router.push({ name: "index" });
            document
              .getElementById("add-button")
              .setAttribute("disabled", false);
          })
          .catch(err => {
            // eslint-disable-next-line
            console.log(err);
          });
      } else {
        this.feedback = "You must enter a cocktail title";
      }
    },
    addIngredient() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter an value to add an ingredient";
      }
    },
    spliceIng(index) {
      // console.log(this.ingredients[index])
      // const pos = this.ingredients[index];
      this.ingredients.splice(index, 1);
    },
    takeBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.add-cocktail .container {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.add-cocktail h2 {
  font-size: 2rem;
  margin: 20px auto;
}

.add-cocktail form .field {
  position: relative;
  margin: 20px auto;
}

.add-cocktail form .field i.add {
  position: absolute;
  right: 0;
  top: 30px;
}

#cancel-button {
  margin-right: 15px;
}
</style>

