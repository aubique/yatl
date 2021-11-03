import { TaskFull } from '@models/task-full';

// Keep up to date the order after DragAndDrop
export function updateOrderByIndex(items: TaskFull[]): void {
  for (let index in items) {
    if (items.hasOwnProperty(index)) {
      items[index].core.order = Number(index) + Number(1);
    }
  }
}

// Sort items on View by order field
export const compareByOrderFn = ((a: TaskFull, b: TaskFull) => a.core.order - b.core.order);

/**
 * Angular CDK function rewritten to work with NgRx and immutability
 *
 * Moves an item one index in an array to another.
 * @param arraySource Array in which to move the item.
 * @param fromIndex Starting index of the item.
 * @param toIndex Index to which the item should be moved.
 */
export function moveItemInArray<T = any>(arraySource: T[], fromIndex: number, toIndex: number): T[] {
  const array = JSON.parse(JSON.stringify(arraySource));
  const from = clamp(fromIndex, array.length - 1);
  const to = clamp(toIndex, array.length - 1);

  if (from === to) {
    return [];
  }

  const target = array[from];
  const delta = to < from ? -1 : 1;

  for (let i = from; i !== to; i += delta) {
    array[i] = array[i + delta];
  }

  array[to] = target;
  return array;
}

function clamp(value: number, max: number): number {
  return Math.max(0, Math.min(max, value));
}
