<script setup>
import SiteNav from '@/components/portfolio/SiteNav.vue'
import SiteFooter from '@/components/portfolio/SiteFooter.vue'
import portfolio from '@/data/portfolio.json'
</script>

<template>
  <div class="not-found">
    <SiteNav :email="portfolio.email" />
    <main>
      <h1>404</h1>
      <p>That page doesn't exist.</p>
      <a href="/" class="btn">Back to home</a>
    </main>
    <SiteFooter :email="portfolio.email" />
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  min-height: 100vh;
  background: $page-bg;
  color: $text-primary;
  display: flex;
  flex-direction: column;

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 8rem 1.5rem 4rem;
    text-align: center;

    h1 {
      font-size: 6rem;
      font-weight: 700;
      color: $orange;
      margin: 0;
      line-height: 1;
    }

    p {
      font-size: 1.25rem;
      color: $text-secondary;
      margin: 0 0 1rem;
    }
  }

  .btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: $text-primary;
    color: $surface;
    text-decoration: none;
    border-radius: 980px;
    font-weight: 600;
    transition: background 0.2s ease;

    &:hover {
      background: $orange;
    }
  }
}
</style>
