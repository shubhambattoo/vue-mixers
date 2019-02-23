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
        </div>
        <div class="field center-align">
          <p v-show="feedback" class="red-text lighten-2">{{feedback}}</p>
          <button class="btn brown darken-4">Add Cocktail</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddCocktail",
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null
    };
  },
  methods: {
    addCocktail() {
      console.log(this.title, this.ingredients);
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
    spliceIng (index) {
      // console.log(this.ingredients[index])
      const pos = this.ingredients[index];
      this.ingredients.splice(index,1);
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
  margin: 20px auto;
}
</style>

