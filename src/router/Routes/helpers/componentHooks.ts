import Component from "vue-class-component";


/*
*  async mounted() {
        await this.loadPage(this.$route.params.id)
  }

  async beforeRouteUpdate(to, from, next) {
        console.log(`beforeRouteUpdate ${to.params.id}`)
        await this.loadPage(to.params.id)
    next()
  }

  async loadPage(id) {
    //...
  }*/

// Register the router hooks with their names
Component.registerHooks([
    "beforeRouteEnter",
    "beforeRouteLeave",
    "beforeRouteUpdate"
]);
