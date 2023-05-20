import { ProjectDuration } from '@/models/ProjectProposalForm';
import {
  calcProjectDate,
  projectDurationFromDate,
} from '../projectProposalForm';

describe('projectProposalForm.ts', () => {
  it('calcProjectDate()', () => {
    const currentYear = new Date(Date.now()).getFullYear();
    expect(calcProjectDate(ProjectDuration.FallSemester)).toEqual({
      start: `${currentYear}-09-01`,
      end: `${currentYear}-12-30`,
    });
    expect(calcProjectDate(ProjectDuration.SpringSemester)).toEqual({
      start: `${currentYear + 1}-02-01`,
      end: `${currentYear + 1}-05-30`,
    });
    expect(calcProjectDate(ProjectDuration.FullYear)).toEqual({
      start: `${currentYear}-09-01`,
      end: `${currentYear + 1}-05-30`,
    });
  });
  it('projectDurationFromDate()', () => {
    const currentYear = new Date(Date.now()).getFullYear();
    const format = 'yyyy-MM-dd';
    expect(
      projectDurationFromDate(
        {
          start: `${currentYear}-09-01`,
          end: `${currentYear}-12-30`,
        },
        format,
      ),
    ).toBe(ProjectDuration.FallSemester);
    expect(
      projectDurationFromDate(
        {
          start: `${currentYear + 1}-02-01`,
          end: `${currentYear + 1}-05-30`,
        },
        format,
      ),
    ).toBe(ProjectDuration.SpringSemester);
    expect(
      projectDurationFromDate(
        {
          start: `${currentYear}-09-01`,
          end: `${currentYear + 1}-05-30`,
        },
        format,
      ),
    ).toBe(ProjectDuration.FullYear);
  });
});
