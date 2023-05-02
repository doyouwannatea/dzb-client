import {
  Participation,
  ParticipationState,
  ParticipationPriority,
} from '@/models/Participation';

export function filterValidParticipations(
  participations: Participation[],
): Participation[] {
  return participations.filter(
    ({ state_id }) =>
      state_id !== ParticipationState.Archived &&
      state_id !== ParticipationState.Rejected,
  );
}

export function isAutoParticipation(priority: ParticipationPriority): boolean {
  return (
    priority === ParticipationPriority.AutoWithApplication ||
    priority === ParticipationPriority.AutoWithoutApplication
  );
}
