<template>
  <BasePanel :class="['card']">
    <div class="header">
      <div class="title">
        {{ props.title }}
      </div>
      <ProjectProposalStatus
        class="status"
        :state="props.state"
        :use-acronyms="isMobile"
      />
      <div class="subtitle">
        {{ props.goal }}
      </div>
    </div>
    <footer class="footer">
      <div class="subtitle">
        Роль в проекте: <b>{{ RoleText }}</b>
      </div>
      <div v-if="state.id === 7" class="link">
        <BaseButton
          is="router-link"
          variant="inline-link"
          case="uppercase"
          :to="toProjectRoute(props.id)"
          color="red"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 6H5H21"
              stroke="#E24C4C"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
              stroke="#E24C4C"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          Удалить черновик
        </BaseButton>
        <BaseButton
          is="router-link"
          variant="inline-link"
          case="uppercase"
          :to="toProjectRoute(props.id)"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z"
              stroke="#3D68ED"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          Редактировать заявку
        </BaseButton>
      </div>
      <div v-if="state.id === 8" class="link">
        <BaseButton
          is="router-link"
          variant="inline-link"
          case="uppercase"
          :to="toProjectRoute(props.id)"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#3D68ED"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.09009 9.00002C9.32519 8.33169 9.78924 7.76813 10.4 7.40915C11.0108 7.05018 11.729 6.91896 12.4273 7.03873C13.1255 7.15851 13.7589 7.52154 14.2152 8.06355C14.6714 8.60555 14.9211 9.29154 14.9201 10C14.9201 12 11.9201 13 11.9201 13"
              stroke="#3D68ED"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 17H12.01"
              stroke="#3D68ED"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Узнать причину отклонения
        </BaseButton>
      </div>
    </footer>
  </BasePanel>
</template>

<script setup lang="ts">
  import BasePanel from '@/components/ui/BasePanel.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import { toProjectRoute } from '@/router/utils/routes';
  import ProjectProposalStatus from '@/components/project/ProjectProposalStatus.vue';
  import { useSmallDevice, useDesktop, useMobile } from '@/helpers/breakpoints';

  import {
    CreatedProjectProposal,
    MemberRole,
    MemberRoleText,
    ProjectProposalStateId,
  } from '@/models/ProjectProposal';

  const isSmallDevice = useSmallDevice();
  const isDesktop = useDesktop();
  const isMobile = useMobile();

  type Id = CreatedProjectProposal['id'];
  type Role = MemberRole;
  type State = CreatedProjectProposal['state'];
  type Title = CreatedProjectProposal['title'];
  type Goal = CreatedProjectProposal['goal'];

  type Props = {
    id?: Id;
    role?: Role;
    state?: State;
    title?: Title;
    goal?: Goal;
  };

  const props = withDefaults(defineProps<Props>(), {
    id: 5,
    role: 1, //undefined,
    state: () => ({
      id: ProjectProposalStateId.Rejected,
      state: 'Отклонена',
    }),
    title: 'Платформа для размещения вузовских олимпиад', //undefined,
    goal: 'Создать платформу (страничку) для рекламы олимпиад.', //undefined,
  });

  const RoleText = MemberRoleText[props.role];
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    padding-left: 0;
    list-style: none;
  }

  .link {
    display: flex;
    gap: 1.75rem;
    align-items: center;
    font-size: 1.25rem;
    font-weight: normal;
    line-height: 1.625rem;
    color: var(--text-color);
    text-align: center;
    text-decoration: none;
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

  .card-content {
    display: grid;
    grid-template-columns: auto minmax(min-content, 16.25rem) min-content;
    column-gap: 0.9375rem;
    align-items: flex-start;

    @media (max-width: $tablet) {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  .container {
    padding-right: 1.25rem;
    padding-left: 1.25rem;
  }

  .footer {
    display: flex;
    flex-wrap: wrap;
    gap: 3.375rem;
    align-content: space-between;
    align-items: center;
    justify-content: space-between;

    @media (max-width: $tablet) {
      flex-direction: column;
      gap: 18px;
      align-items: initial;
    }
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
