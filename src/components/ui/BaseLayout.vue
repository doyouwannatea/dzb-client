<template>
  <slot name="header"></slot>
  <main class="main">
    <slot name="content"></slot>
  </main>
  <slot name="footer"></slot>
</template>

<style lang="scss" scoped>
  .main {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
</style>
