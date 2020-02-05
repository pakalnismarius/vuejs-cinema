<template>
  <div id='movie-list'>
    <div class="movie" v-for='movie in FilteredMovies'>{{ movie.movie.Title }}</div>
  </div>
</template>

<script type="text/javascript">
  import genres from '../util/genres';
  export default {
    props: ["time", "genre", "movies"],
    methods: {
      moviePassesGenreMovies(movie) {
        if (this.genre.length) {
          return this.genre.find(genre => movie.genre === genre);
        } else {
          return true;
        }
      }
    },
    computed: {
      FilteredMovies() {
        return this.movies.filter(this.moviePassesGenreMovies);
      }
    }
  }
</script>