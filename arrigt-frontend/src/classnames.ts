export function insertClassName(
  classNames: string | undefined,
  condition?: boolean
) {
  return classNames && (typeof condition !== "boolean" || condition)
    ? classNames
    : "";
}

export function mergeClassNames(classNames: string[]) {
  return classNames.join(" ").replace(/\s+/g, " ").trim();
}
