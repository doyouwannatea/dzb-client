<template>
  <!-- Вёрстка тут трешб конечно -->
  <!-- TODO: можно раскидать как-то по компонентам мб -->
  <div :class="['wrapper', props.variant]">
    <ul :class="['list', props.variant]">
      <template v-for="link in routes" :key="link.name">
        <li :class="['item', props.variant]">
          <RouterLink
            v-if="!link.meta.links"
            :class="['action', props.variant]"
            :to="{ name: link.name }"
          >
            {{ link.meta.title }}
          </RouterLink>
          <template v-else>
            <SimpleAccordion class="accordion" default-opened>
              <template #title>
                <p :class="['action', props.variant]">
                  {{ link.meta.title }}
                </p>
              </template>
              <template #content>
                <ul :class="['list', props.variant]">
                  <li
                    v-for="childLink in link.meta.links"
                    :key="childLink.title"
                    :class="['item', props.variant]"
                  >
                    <RouterLink
                      :class="['action', props.variant]"
                      :to="childLink.location"
                    >
                      {{ childLink.title }}
                      <OnReviewProposalsLabel
                        v-if="
                          childLink.name ===
                          RouteNames.INST_DIRECTOR_PROJECT_PROPOSALS_NEW
                        "
                      />
                      <IntituteProjectsQuota
                        v-else-if="
                          childLink.name ===
                          RouteNames.INST_DIRECTOR_PROJECT_PROPOSALS_APPROVED
                        "
                      />
                    </RouterLink>
                  </li>
                </ul>
              </template>
            </SimpleAccordion>
          </template>
        </li>
      </template>

      <li :class="['item', props.variant]">
        <button :class="['action', props.variant]" @click="logout">
          Выйти из профиля
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import IntituteProjectsQuota from '@/components/project-proposal/IntituteProjectsQuota.vue';
  import SimpleAccordion from '@/components/ui/accordion/SimpleAccordion.vue';
  import { useLogoutWithModalMutation } from '@/api/AuthApi/hooks/useLogoutWithModalMutation';
  import { useRoledUserNavigationRoutes } from '@/hooks/useRoutes';
  import { RouteNames } from '@/router/types/route-names';
  import OnReviewProposalsLabel from './OnReviewProposalsLabel.vue';

  type Props = { variant: 'desktop' | 'mobile' };
  const props = withDefaults(defineProps<Props>(), { variant: 'desktop' });
  const routes = useRoledUserNavigationRoutes();

  const { logout } = useLogoutWithModalMutation();
</script>

<style lang="scss" scoped>
  .wrapper {
    overflow: hidden;
    border: 1px solid var(--gray-color-1);
    border-radius: 0.625rem;

    &.mobile {
      overflow: visible;
      border: none;
      border-radius: 0;
    }
  }

  .list {
    padding: 0 1.375rem;
    background: var(--light-color);

    &.mobile {
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      gap: 1rem;
      padding-bottom: 0.625rem;
      margin-top: -2px;
      margin-right: calc(var(--side-padding) * -1);
      margin-left: calc(var(--side-padding) * -1);
      overflow-x: auto;
      border: none;
      border-radius: 0;
      box-shadow: 0 0.25rem 0.3rem rgb(0 0 0 / 7%);
    }
  }

  .item {
    list-style: none;

    &.mobile {
      white-space: nowrap;
    }
  }

  .item:not(:last-child) {
    border-bottom: 1px solid var(--gray-color-1);

    &.mobile {
      border-bottom: none;
    }
  }

  .action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1.25rem 0;
    font-size: 1.25rem;
    line-height: 1.625rem;
    color: var(--text-color);

    /* for button */
    text-align: left;
    text-decoration: none;
    cursor: pointer;
    background: transparent;
    border: none;

    &.mobile {
      padding: 1rem;
      font-size: 0.9rem;
      color: var(--gray-color-2);
      text-transform: uppercase;
    }
  }

  .action:hover,
  .action.router-link-active {
    color: var(--accent-color-1);

    &.mobile {
      border-bottom: 2px solid var(--accent-color-1);
    }
  }

  .accordion {
    &:deep(.title) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &.opened:deep(.title) {
      border-bottom: 1px solid var(--gray-color-1);
    }
  }
</style>
