export const uniq =(a: any[], param: any) => {
  return a.filter(function (item, pos, array) {
    return (
      array
        .map(function (mapItem) {
          return mapItem[param];
        })
        .indexOf(item[param]) === pos
    );
  });
}

export const addCommas = (s: string | number) => `${s}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

export const ellipseLongString = (str: any, len: number = 8) => {
  const s = `${str}`
  // …
  return `${s.substring(0, len / 2)}...${s.substring(s.length - (len / 2), s.length)}`
}
