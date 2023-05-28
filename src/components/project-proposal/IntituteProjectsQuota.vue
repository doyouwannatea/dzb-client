<template>
  <span :class="{ [$style['limit-exceeded']]: approvedProjectsLimitExceeded }">
    <template v-if="isLoading">...</template>
    <template v-else>
      ({{ proposalsCount[ProjectProposalStateId.Approved] }}/{{
        intituteProjectsQuota
      }})
    </template>
  </span>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useInstituteProposalsMetaData } from '@/hooks/useInstituteProposalsMetaData';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import { ProjectProposalStateId } from '@/models/ProjectProposal';

  const authStore = useAuthStore();
  const { isInstDirector, intituteProjectsQuota } = storeToRefs(authStore);

  const { proposalsCount, approvedProjectsLimitExceeded, isLoading } =
    useInstituteProposalsMetaData({
      enabled: isInstDirector,
    });
</script>

<style lang="scss" module>
  .limit-exceeded {
    color: var(--red-color-1);
  }
</style>
