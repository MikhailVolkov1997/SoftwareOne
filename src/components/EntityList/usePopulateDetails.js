import { useEffect, useState } from "react";
import { getDetails } from "../../api";

const getAttributes = (entity) => {
  const [elem] = entity.data;
  if (!elem) return;
  return elem.attributes;
};
const getNumber = (entity) => {
  const value = entity["value"];
  const defaultValue = entity["default"];
  if (!value && !defaultValue) return;
  if (!value) return defaultValue;
  return value;
};
const getCssStyles = (atrs) => {
  const css = (property, cssName, add = false) => {
    const prettyName = cssName || property;
    const defaultStyle = atrs[property]["default"];
    const styleValue = atrs[property]["value"];
    if (!styleValue && !defaultStyle) return;
    if (!styleValue) return { [prettyName]: defaultStyle };
    return { [prettyName]: Boolean(add) ? styleValue + add : styleValue };
  };
  return {
    ...css("background-color", "backgroundColor"),
    ...css("width", false, "px"),
    ...css("border"),
    ...css("border-color", "borderColor"),
    ...css("font"),
    ...css("font-color", "fontColor"),
    ...css("height", false, "px"),
  };
};

const getEntityNameForPanelDetails = (entity, setLoading) => {
  const regex = /object:/gi;
  const atr = getAttributes(entity);
  if (!atr) {
    setLoading(false);
    return;
  }
  const name = atr.children && atr.children.value;
  return name.replace(regex, "");
};
const retrievePanels = async (attributes) => {
  const extractPanel = async (panelProperty) => {
    if (!attributes[panelProperty].value) return;
    const regex = /panel:/gi;
    const panelName = attributes[panelProperty].value.replace(regex, "");
    const res = await getDetails("panel", panelName);
    const atrs = getAttributes(res);
    const numberPanels = atrs["window-count"]["value"];
    const panelItem = {
      name: getNumber(atrs.name),
      title: getNumber(atrs.title),
      type: getNumber(atrs.type),
      visible: getNumber(atrs.visible),
      styles: getCssStyles(atrs),
    };
    if (numberPanels === 1) return [{ ...panelItem }];
    const result = [];
    for (let j = 0; j < numberPanels; j++) {
      result.push({ ...panelItem });
    }
    return result;
  };
  return {
    top: await extractPanel("top-panel"),
    bottom: await extractPanel("bottom-panel"),
    left: await extractPanel("left-panel"),
    right: await extractPanel("right-panel"),
  };
};

export const usePopulateDetails = (selected, setPanels, setLoading) => {
  useEffect(() => {
    if (!selected) return;
    setLoading(true);
    const { setName, entityName } = selected;
    const requests = async () => {
      const firstsResponse = await getDetails(setName, entityName);

      const panelEntity = getEntityNameForPanelDetails(
        firstsResponse,
        setLoading
      );
      if (!panelEntity) return;
      const panelsReg = await getDetails("object", panelEntity);
      const panels = await retrievePanels(getAttributes(panelsReg));
      setPanels(panels);
      setLoading(false);
    };
    requests();
  }, [selected, setPanels, setLoading]);
};
