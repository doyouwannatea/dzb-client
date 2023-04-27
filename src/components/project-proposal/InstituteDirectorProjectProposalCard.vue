<template>
  <ProjectProposalCard :project-proposal="props.projectProposal">
    <template #team>
      <ul :class="$style['team-list']">
        <li v-for="memberRole in teamList" :key="memberRole[0]">
          <b>{{ MemberRoleText[memberRole[0]] }}: </b>
          {{ memberRole[1].join(', ') }}
        </li>
      </ul>
    </template>

    <template #actions>
      <BaseButton
        color="red"
        variant="outlined"
        :disabled="reviewProjectProposalMutation.isLoading.value"
        @click="onReject"
      >
        отклонить
      </BaseButton>
      <BaseButton
        variant="outlined"
        :disabled="reviewProjectProposalMutation.isLoading.value"
        @click="onApprove"
      >
        одобрить
      </BaseButton>
      <BaseButton
        is="router-link"
        :to="toProjectProposalCreateRoute(props.projectProposal.id)"
        variant="primary"
      >
        Подробнее
      </BaseButton>
    </template>
  </ProjectProposalCard>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import {
    CreatedProjectProposal,
    MemberRole,
    MemberRoleText,
    ProjectProposalStateId,
  } from '@/models/ProjectProposal';

  import ProjectProposalCard from './ProjectProposalCard.vue';
  import {
    groupTeamByRoles,
    sortByRolePriority,
  } from '@/helpers/project-member-role';
  import { toProjectProposalCreateRoute } from '@/router/utils/routes';
  import { useReviewProjectProposal } from '@/queries/useReviewProjectProposal';

  interface Props {
    projectProposal: CreatedProjectProposal;
  }

  const props = defineProps<Props>();
  const reviewProjectProposalMutation = useReviewProjectProposal();

  const rejectionReason = ref<string>('');

  const teamList = computed(() =>
    sortByRolePriority(
      Array.from(
        groupTeamByRoles(props.projectProposal.supervisors, [
          MemberRole.CoMentor,
          MemberRole.Expert,
        ]),
      ),
      (role) => role[0],
    ),
  );

  function onApprove() {
    reviewProjectProposalMutation.mutate({
      project_proposal_id: props.projectProposal.id,
      state_id: ProjectProposalStateId.Approved,
    });
  }

  function onReject() {
    reviewProjectProposalMutation.mutate({
      project_proposal_id: props.projectProposal.id,
      state_id: ProjectProposalStateId.Rejected,
      rejection_reason: rejectionReason.value,
    });
  }
</script>

<style lang="scss" module>
  @import '@styles/breakpoints';

  .team-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    list-style: none;
  }
</style>
