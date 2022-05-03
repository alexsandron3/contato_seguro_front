export default function removeDuplicatedValues(array) {
  return array.filter(
    (item, index, array) => index === array.findIndex((t) => t.id === item.id),
  );
}
