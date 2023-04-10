function stringWithComas(x: string) {
  return Number(x)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export default stringWithComas;
