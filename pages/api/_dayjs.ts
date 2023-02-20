import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function fromNow(date: string): string {
  const d = dayjs(date);
  if (d.isValid()) {
    return d.fromNow();
  }
  return 'null';
}
