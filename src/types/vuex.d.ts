import { Store } from '@/store/store';

// типизация $store
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store;
  }
}
