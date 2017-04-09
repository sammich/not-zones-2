<template>
  <div id="app" :class="currentTheme">
    <nav>
      <li><router-link to="/settings" title="Settings">Settings</router-link></li>
      <li><router-link to="/home" title="Home">Main</router-link></li>
      <li><router-link to="/add" title="Add city">Add</router-link></li>

      <h2>{{$route.meta.name}}</h2>
    </nav>

    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => {
    return {
      transitionName: ''
    }
  },
  computed: {
    currentTheme: function () {
      return this.$store.getters.currentTheme
    }
  },
  watch: {
    '$route'(to, from) {
      let toIndex, fromIndex
      switch (to.name) {
        case 'settings': toIndex = 1; break
        case 'home': toIndex = 2; break
        case 'add': toIndex = 3; break
      }
      switch (from.name) {
        case 'settings': fromIndex = 1; break
        case 'home': fromIndex = 2; break
        case 'add': fromIndex = 3; break
      }

      let transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left'
      if (Math.abs(toIndex - fromIndex) > 1) {
        transitionName += '-far'
      }

      this.transitionName = transitionName
    }
  }
}
</script>

<style scoped>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
}

#app > nav {
  position: fixed;
  width: 100%;
  padding-top: 30px;

  z-index: 100;
}

.sam-view {
  padding-top: 140px
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  text-decoration: none;
}
</style>

<!-- themes -->

<style>

/* WHITE */

#app.white {
  color: #2c3e50;
}

#app.white > nav {
  background: rgba(240,240,240,0.95);
}

#app.white a {
  color: #42b983;
}

#app.white a.router-link-active {
  border-bottom: 1px solid #42b983;
}


/* BLACK */

#app.black {
  color: white;
}

#app.black > nav {
  background: rgba(0,0,0,0.95);
}

#app.black > nav * {
  color: white;
}

#app.black {
  color: #2c3e50;
}

#app.black a.router-link-active {
  border-bottom: 1px solid white;
}


/* RED */

#app.red {
  color: #2c3e50;
}

#app.red > nav {
  background: rgba(256, 240, 240, 0.95);
}

#app.red a {
  color: red;
}

#app.red a.router-link-active {
  border-bottom: 1px solid red;
}

</style>

<style>
body {
  margin: 0;
  position: relative;
}

.sam-input {
  outline: none;
  border: none;

  background: #fafafa;
  font-size: 150%;

  margin-bottom: 4px;
  padding: 4px 7px;
}

.text-center {
  text-align: center;
}

.feint {
  color: #999;
}

.child-view {
  width: 100%;
  position: absolute;
  transition: all .5s cubic-bezier(.55,0,.1,1);
}

.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                supported by Chrome and Opera */
}

.reset-select {
  -ms-user-select: initial; /* Internet Explorer/Edge */
  user-select: initial; /* Non-prefixed version, currently
                                supported by Chrome and Opera */
}
</style>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(65px, 0);
    transform: translate(65px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-65px, 0);
    transform: translate(-65px, 0);
  }
  .slide-left-far-enter, .slide-right-far-leave-active {
    opacity: 0;
    -webkit-transform: translate(130px, 0);
    transform: translate(130px, 0);
  }
  .slide-left-far-leave-active, .slide-right-far-enter {
    opacity: 0;
    -webkit-transform: translate(-130px, 0);
    transform: translate(-130px, 0);
  }
</style>
