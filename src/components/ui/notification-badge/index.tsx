import { Props } from './types';

export const NotificationBadgeUI = ({ count }: Props) => {
  return (
    <div
      className={`w-[20px] h-[19px] bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-semibold ${
        count > 0 ? 'flex' : 'hidden'
      }`}
    >
      {count > 0 && count}
    </div>
  );
};
