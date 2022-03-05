<template>
  <nav class="nav">
    <ul class="nav-list">
      <template v-for="link in $router.options.routes" :key="link.name">
        <li v-if="link.meta?.nav" class="nav-item">
          <RouterLink class="nav-link" :to="{ name: link.name }">
            {{ link.meta.title }}
          </RouterLink>
        </li>
      </template>
    </ul>
  </nav>
</template>

<style scoped>
  .nav {
    color: var(--text-color);
  }
  .nav-list {
    list-style: none;
    display: flex;
    align-items: center;
    z-index: 1;
    padding-left: 0;
    height: 100%;
  }

  .nav-item {
    height: 100%;
  }

  .nav-link {
    font-family: inherit;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.25em;
    text-transform: uppercase;
    color: inherit;

    padding-left: 1.9em;
    padding-right: 1.9em;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    border-bottom: 0.25rem solid transparent;
  }

  .nav-link.router-link-exact-active {
    border-bottom-color: var(--accent-color-2);
  }

  .nav-link:hover {
    border-bottom-color: var(--accent-color-2);
  }
</style>
