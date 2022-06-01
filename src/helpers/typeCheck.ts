import { Candidate } from '@/models/Candidate';
import { Supervisor } from '@/models/Supervisor';

export function isCandidate(obj: any): obj is Candidate {
  return obj.training_group !== undefined;
}

export function isSupervisor(obj: any): obj is Supervisor {
  return obj.position !== undefined;
}
