export const getBasicParams = (item) => {
  return {
    left: item.rectDotLeft,
    top: item.rectDotTop,
    name: item.entityName,
    property: item.setName,
  };
};
