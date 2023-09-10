// group array by value of given key
export function groupBy<T extends { [key: string]: any }>(array: T[], key: keyof T) {
  return array.reduce((result: { [key: string]: T[] }, current: T) => ({
    ...result,
    [current[key]]: [...(result[current[key]] || []), current]
  }), {});
}
