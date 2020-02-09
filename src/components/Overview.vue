<template>
  <div id="overview">
    <div class="main">
      <movie-list v-bind:time="time"
                  v-bind:genre="genre"
                  v-bind:movies="movies"
                  v-bind:day="day">
      </movie-list>
      <movie-filter><movie-filter/>
    </div>
  </div>
</template>

<script type="text/javascript">
  import MovieList from './MovieList.vue';
  import MovieFilter from './MovieFilter.vue';
  export default {
    props: ["time", "genre", "movies", "day"],
    components: {
      MovieList,
      MovieFilter
    }
  }
</script>