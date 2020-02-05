<template>
  <div id='movie-list'>
    <div class="movie" v-for='movie in FilteredMovies'>{{ movie.title }}</div>
  </div>
</template>

<script type="text/javascript">
  import genres from '../util/genres';
  export default {
    data() {
      return {
        movies: [
          { title: 'PulpFiction', genre: genres.CRIME },
          { title: 'Home Alone', genre: genres.COMEDY },
          { title: 'Austin Powers', genre: genres.COMEDY },
        ]
      }
    },
    props: ["time", "genre"],
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