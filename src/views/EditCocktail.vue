<template>
  <div class="edit-cocktail" v-if="!dataIsLoading">
    <div class="container">
      <h2>
        Edit Cocktail -
        <em>{{cocktail.title}}</em>
      </h2>
      <form @submit.prevent="editCocktail">
        <div class="field title">
          <label for="title">Cocktail Title</label>
          <input type="text" name="title" id="title" v-model="cocktail.title">
        </div>
        <div class="chip" v-for="(ing, index) in cocktail.ingredients" :key="index">
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
        </div>
        <div class="field center-align">
          <p v-show="feedback" class="red-text lighten-2">{{feedback}}</p>
          <button
            class="btn brown darken-3"
            id="cancel-button"
            @click="takeBack"
            type="button"
          >Cancel</button>
          <button class="btn brown darken-4" id="edit-button" type="submit">Update Cocktail</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditCocktail",
  data() {
    return {
      slug: this.$route.params.id,
      cocktail: null,
      dataIsLoading: true,
      another: null,
      feedback: null
    };
  },
  methods: {
    editCocktail() {
      if (this.cocktail.title) {
        this.feedback = null;
        document.getElementById("edit-button").setAttribute("disabled", true);

        // change slug, if required
        this.cocktail.slug = slugify(this.cocktail.title, {
          replacement: "-",
          remove: /[$*_+~.()'""!\-:@]/g,
          lower: true
        });

        // create cocktail obj
        const cocktail = {
          title: this.cocktail.title,
          ingredients: this.cocktail.ingredients,
          slug: this.cocktail.slug
        };

        // add in db
        db.collection("cocktails")
          .doc(this.cocktail.id)
          .update(cocktail)
          .then(() => {
            this.$router.push({ name: "index" });
            document
              .getElementById("edit-button")
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
        this.cocktail.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter an value to add an ingredient";
      }
    },
    spliceIng(index) {
      // console.log(this.ingredients[index])
      // const pos = this.ingredients[index];
      this.cocktail.ingredients.splice(index, 1);
    },
    takeBack() {
      this.$router.go(-1);
    }
  },
  created() {
    let ref = db.collection("cocktails").where("slug", "==", this.slug);

    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.cocktail = doc.data();
        this.cocktail.id = doc.id;
        // this.title = this.cocktail.title;
        this.dataIsLoading = false;
      });
    });
  }
};
</script>

<style>
.edit-cocktail .container {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.edit-cocktail h2 {
  font-size: 2rem;
  margin: 20px auto;
}

.edit-cocktail form .field {
  margin: 20px auto;
}

#cancel-button {
  margin-right: 15px;
}
</style>


