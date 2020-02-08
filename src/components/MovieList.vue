<template>
  <div id='movie-list'>
    <div v-if="FilteredMovies.length">
      <movie-item v-for='movie in FilteredMovies'
                  v-bind:movie="movie.movie"
                  v-bind:sessions="movie.sessions"
                  v-bind:day="day">
      </movie-item>
    </div>
    <div v-else-if="movies.length" class="no-results">
      No results.
    </div>
    <div v-else class="no-results">
      Loading...
    </div>
  </div>
</template>

<script type="text/javascript">
  import genres from '../util/genres';
  import MovieItem from './MovieItem.vue';
  export default {
    props: ["time", "genre", "movies", "day"],
    methods: {
      moviePassesGenreMovies(movie) {
        if (this.genre.length) {
          let movieGenres = movie.movie.Genre.split(', ');
          let matched = true;
          this.genre.forEach(genre => {
            if (movieGenres.indexOf(genre) === -1) {
              matched = false;
            }
          });
          return matched;
        } else {
          return true;
        }
      }
    },
    computed: {
      FilteredMovies() {
        return this.movies.filter(this.moviePassesGenreMovies);
      }
    },
    components: {
      MovieItem
    }
  }
</script>
