export default url => {
  const paramString = url.includes('?') ? url.split('?')[1].split('&') : [];
  const params = {};

  paramString.forEach(param => {
    const paramSplit = param.split('=');
    params[paramSplit[0]] = paramSplit[1];
  });

  return params;
};
