/**
 * Returns true if the text should be black, false if it should be white for a given background hex color.
 */
export const shouldTextBeBlack = (hex: string) => {
  const [red, green, blue] = hex // Hex color e.g. #ff0000
    .replace('#', '')
    .match(/.{1,2}/g)
    ?.map((x) => parseInt(x, 16)) || [0, 0, 0]

  // Formula from https://stackoverflow.com/a/3943023
  return red * 0.299 + green * 0.587 + blue * 0.114 > 186
}
