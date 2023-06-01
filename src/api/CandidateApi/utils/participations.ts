import {
  Participation,
  ParticipationPriority,
  ParticipationState,
} from '@/models/Participation';

export function filterValidParticipations(
  participations: Participation[],
): Participation[] {
  return participations.filter(
    ({ state }) =>
      state.id !== ParticipationState.Archived &&
      state.id !== ParticipationState.Rejected,
  );
}

export function isAutoParticipation(priority: ParticipationPriority): boolean {
  return (
    priority === ParticipationPriority.AutoWithApplication ||
    priority === ParticipationPriority.AutoWithoutApplication
  );
}
