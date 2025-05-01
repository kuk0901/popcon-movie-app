interface ActorObj {
  actorNm: string;
  actorEnNm: string;
  actorId: string;
}

export const getActorNamesToJoinStr = (actorObjArr: ActorObj[]): string => {
  const actorNameArr: string[] = [];

  actorObjArr
    .filter((obj, i) => i < 10)
    .forEach((actorObj) => {
      actorNameArr.push(actorObj.actorNm);
    });

  return actorNameArr.join(", ");
};
