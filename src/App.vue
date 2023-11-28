<template>
  <div class="dashboard-wrapper">
    <aside class="aside-panel">
      sidebar
    </aside>
    <main class="content">
      <router-view/>
    </main>
  </div>
</template>

<style lang="scss">
:root {
  --mc-zinc-50: #fafafa;
  --mc-zinc-100: #f4f4f5;
  --mc-zinc-200: #e4e4e7;
  --mc-zinc-300: #d4d4d8;
  --mc-zinc-400: #a1a1aa;
  --mc-zinc-500: #71717a;
  --mc-zinc-600: #52525b;
  --mc-zinc-700: #3f3f46;
  --mc-zinc-800: #27272a;
  --mc-zinc-900: #18181b;
  --mc-zinc-950: #09090b;
  --mc-status-purple: #ff53d6;
  --mc-status-red: #fc3e39;
  --mc-status-orange: #ff8400;
  --mc-status-yellow: #f4e300;
  --mc-status-green: #94cc19;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.dashboard-wrapper {
  width: 100vw;
  min-height: 100vh;
  background-color: var(--mc-zinc-900);
  color: var(--mc-zinc-100);
  display: grid;
  grid-template-columns: 200px 1fr;
}
.content {
  display: flex;
  flex-direction: column;
  padding: 0 30px 30px;
}
</style>
