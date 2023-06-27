<template>
  <BasePanel :class="$style.card">
    <header :class="$style.header">
      <RouterLink
        :class="$style.title"
        :to="toProjectProposalCreateRoute(props.projectProposal.id)"
      >
        {{ props.projectProposal.title }}
      </RouterLink>
      <ProjectProposalStatus
        :class="$style.status"
        :state="props.projectProposal.state"
      />
      <p :class="$style.subtitle">
        {{ props.projectProposal.goal }}
      </p>
    </header>
    <footer :class="$style.footer">
      <slot name="team">
        <ul :class="$style['team-list']">
          <li v-for="teamMember in teamList" :key="teamMember.id">
            <slot
              name="team-member"
              :teamMember="teamMember"
              :teamList="teamList"
            ></slot>
          </li>
        </ul>
      </slot>

      <div :class="$style.actions">
        <slot name="actions"></slot>
      </div>
    </footer>
  </BasePanel>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import ProjectProposalStatus from '@/components/project/ProjectProposalStatus.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import { toProjectProposalCreateRoute } from '@/router/utils/routes';
  import { CreatedProjectProposal } from '@/models/ProjectProposal';

  interface Props {
    projectProposal: CreatedProjectProposal;
  }

  const props = defineProps<Props>();

  const teamList = computed(() => props.projectProposal.supervisors);
</script>

<style lang="scss" module>
  @import '@styles/breakpoints';

  .actions {
    display: flex;
    gap: 0.8125rem;
    align-items: center;
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
    padding: 1.375rem 1.3125rem !important;
  }

  .footer {
    display: flex;
    gap: 0.5rem;
    align-items: flex-end;
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

  .team-list {
    flex: 1;
    list-style: none;

    li:empty {
      display: none;
    }
  }
</style>
