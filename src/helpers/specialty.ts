import { SpecialtyCourse, SpecialtyName } from '@/models/Specialty';

export function specialtyFullName(
  name: string,
  course: SpecialtyCourse,
): string {
  return `${name}, ${SpecialtyName[course]}`;
}
