<template>
  <BasePanel class="card">
    <header class="header">
      <RouterLink class="title" :to="toProjectRoute(props.projectProposal.id)">
        {{ props.projectProposal.title }}
      </RouterLink>
      <ProjectProposalStatus
        class="status"
        :state="props.projectProposal.state"
      />
      <p class="subtitle">
        {{ props.projectProposal.goal }}
      </p>
    </header>
    <footer class="footer">
      <p class="subtitle">
        <template v-if="currentUserRoleList">
          Роли в проекте: <b>{{ currentUserRoleList.join(', ') }}</b>
        </template>
        <template v-else>Ваша роль в проекте не установлена</template>
      </p>
      <div class="actions">
        <!-- TODO: вернуть после добавления функций удаления и редактирования -->
        <!-- <BaseButton color="red" variant="inline-link">
          <span class="icon" v-html="trashIcon"></span> удалить черновик
        </BaseButton>
        <BaseButton variant="inline-link">
          <span class="icon" v-html="penIcon"></span>
          редактировать заявку
        </BaseButton> -->
        <BaseButton
          is="router-link"
          :to="toProjectRoute(props.projectProposal.id)"
          variant="inline-link"
        >
          <span class="icon">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.7637 22.0663C18.2865 22.0663 22.7637 17.5891 22.7637 12.0663C22.7637 6.54344 18.2865 2.06628 12.7637 2.06628C7.24082 2.06628 2.76367 6.54344 2.76367 12.0663C2.76367 17.5891 7.24082 22.0663 12.7637 22.0663Z"
                stroke="var(--accent-color-1)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.85352 9.06627C10.0886 8.39794 10.5527 7.83438 11.1635 7.47541C11.7743 7.11643 12.4924 6.98521 13.1907 7.10499C13.889 7.22476 14.5223 7.5878 14.9786 8.1298C15.4349 8.67181 15.6846 9.3578 15.6835 10.0663C15.6835 12.0663 12.6835 13.0663 12.6835 13.0663"
                stroke="var(--accent-color-1)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.7637 17.0663H12.7737"
                stroke="var(--accent-color-1)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          подробнее
        </BaseButton>
      </div>
    </footer>
  </BasePanel>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import { toProjectRoute } from '@/router/utils/routes';
  import ProjectProposalStatus from '@/components/project/ProjectProposalStatus.vue';
  import {
    CreatedProjectProposal,
    MemberRoleText,
  } from '@/models/ProjectProposal';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import trashIcon from '@/assets/icons/trash.svg?raw';
  import penIcon from '@/assets/icons/pen.svg?raw';

  interface Props {
    projectProposal: CreatedProjectProposal;
  }

  const props = defineProps<Props>();
  const authStore = useAuthStore();

  const currentUser = computed(() =>
    props.projectProposal.supervisors.find(
      (member) => member.supervisor.id === authStore.profileData?.id,
    ),
  );
  const currentUserRoleList = computed(() =>
    currentUser.value?.roles.map((role) => MemberRoleText[role.id]),
  );
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .actions {
    display: flex;
    gap: 1.25rem;
    align-items: center;
  }

  .icon {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 1.6em;

    &:deep(svg) {
      height: 100%;
    }
  }

  .header {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.8125rem;
    align-items: center;
    padding-bottom: 1.25rem;
  }

  .status {
    align-self: flex-start;
    justify-self: flex-end;
    white-space: nowrap;

    @media (max-width: $tablet) {
      grid-column: 2;
      padding-right: 1rem;
      padding-left: 1rem;
    }
  }

  .card {
    padding: 1.375rem 1.3125rem;
  }

  .footer {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
  }

  .title {
    max-width: 26.375rem;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.9375rem;
    color: #4f5569;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .subtitle {
    grid-column: 1 / -1;
    max-width: 26.3125rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.25rem;
    color: #4f5569;

    &:nth-child(3) {
      grid-row: 2;
    }

    &:nth-child(4) {
      grid-row: 3;
    }
  }
</style>
