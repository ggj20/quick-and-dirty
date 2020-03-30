const countDamagesByToolType = (scene, toolType) => {
  const filterByToolType = array =>
    array.filter(d => d.damageType === toolType);

  const { damageGoupColliding, damageGroupNotColliding } = scene;

  const { entries: collidingEntries } = damageGoupColliding.children;
  const collidingCount = filterByToolType(collidingEntries).length;

  const { entries: notCollidingEntries } = damageGroupNotColliding.children;
  const notCollidingCount = filterByToolType(notCollidingEntries).length;

  return collidingCount + notCollidingCount;
};

export default countDamagesByToolType;
