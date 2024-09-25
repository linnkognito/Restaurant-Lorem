////////////////////////////////////////////////////////
const replaceWithHtml = (template, menuItem) => {
  let output = template.replace(/{%MENU_ITEM_NAME%}/g, menuItem.name);
  output = template.replace(/{%MENU_ITEM_PRICE%}/g, menuItem.price);
  output = template.replace(/{%MENU_ITEM_DESCRIPTION%}/g, menuItem.description);
  output = template.replace(/{%MENU_ITEM_IMG%}/g, menuItem.img);
  output = template.replace(/{%MENU_ITEM_NAME%}/g, menuItem.imgAlt);
  return output;
};
