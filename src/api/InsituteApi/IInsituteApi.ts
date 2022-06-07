export default abstract class IInsituteApi {
  abstract isInSameInstitute(
    specialityName1: string,
    specialityName2: string,
  ): Promise<boolean>;
}
