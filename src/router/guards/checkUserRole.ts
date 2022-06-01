import { projectIncludesCandidateSpeciality } from '@/helpers/project';
import { useCheckRole } from '@/hooks/useCheckRole';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { useProjectsStore } from '@/stores/projects/useProjectsStore';
import { NavigationGuard } from 'vue-router';
import { RouteNames } from '../types/route-names';

export const checkUserRole: NavigationGuard = (to, from, next) => {
  const role = to.meta.role;
  const isPass = useCheckRole(role);

  if (!role || isPass) {
    return next();
  }

  return next(
    from || {
      name: RouteNames.HOME,
    },
  );
};

export const checkUserSpeciality: NavigationGuard = async (to, from, next) => {
  const projectsStore = useProjectsStore();
  const authStore = useAuthStore();

  await projectsStore.getSingleProject(Number(to.params.id));
  if (!authStore.profileData) return next();
  if (!projectsStore.openedProject) return next();
  if (
    await projectIncludesCandidateSpeciality(
      authStore.profileData,
      projectsStore.openedProject,
    )
  ) {
    return next();
  }
  projectsStore.openedProject = undefined;
  window.alert('Вы не можете просматривать проекты не вашей специальности 😥');
  return next(
    from || {
      name: RouteNames.HOME,
    },
  );
};
