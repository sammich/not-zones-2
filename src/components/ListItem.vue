<template>
  <div class="list-item wrapper no-select" :class="element.rowClasses" @click="itemClicked">
    <div class="row">
      <div class="block left-block align-right">
        <slot name="left"></slot>
      </div>
      <div class="block right-block align-left">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hover: Boolean
  },
  methods: {
    itemClicked: function () {
      this.$emit('click')
    }
  },
  data() {
    console.log(this.hover)
    return {
      nope: 'nope',
      element: {
        rowClasses: {
          hover: this.hover
        }
      }
    }
  }
}
</script>

<style>
  .list-item {
    display: table;
    table-layout: fixed;
    border-collapse: collapse;

    width: 100%;
    margin: 0.25em 0;
  }

  .list-item .row {
    display: table-row;
  }

  .list-item.hover:hover .row {
    background-color: #eee;
  }

  .list-item .block {
    display: table-cell;
    width: 50%;

    padding: 4px 8px;
  }

  .list-item .align-left {
    text-align: left;
  }

  .list-item .align-right {
    text-align: right;
  }
</style>
