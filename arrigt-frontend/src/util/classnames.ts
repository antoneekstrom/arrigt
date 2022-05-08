export function insertClassName(
  classNames: string | undefined,
  condition?: boolean,
  falseByDefault = false
) {
  return classNames &&
    ((typeof condition !== "boolean" && !falseByDefault) || condition)
    ? classNames
    : "";
}

export function mergeClassNames(classNames: string[]) {
  return classNames.join(" ").replace(/\s+/g, " ").trim();
}
