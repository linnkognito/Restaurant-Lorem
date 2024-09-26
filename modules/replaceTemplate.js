////////////////////////////////////////////////////////
module.exports.replaceTemplate = (template, menuItem) => {
  let output = template.replace(/{%MENU_ITEM_ID%}/g, menuItem.id);
  output = output.replace(/{%MENU_ITEM_NAME%}/g, menuItem.name);
  output = output.replace(/{%MENU_ITEM_PRICE%}/g, menuItem.price);
  output = output.replace(/{%MENU_ITEM_DESCRIPTION%}/g, menuItem.description);
  output = output.replace(/{%MENU_ITEM_IMG%}/g, menuItem.img);
  output = output.replace(/{%MENU_ITEM_IMG_ALT%}/g, menuItem.imgAlt);
  return output;
};

// could check if lunch is true/false
