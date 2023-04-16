import clsx from 'clsx';

export interface OptionProps<T> {
  active?: boolean;
  selected?: boolean;
  disabled?: boolean;
  data: T;
}

type DefaultOptionProps = OptionProps<string>;

export function DefaultOption({ selected, data }: DefaultOptionProps) {
  return (
    <div className='flex items-center'>
      <span
        className={clsx(
          selected ? 'font-semibold text-content-accent' : 'font-normal',
          'ml-3 block text-base'
        )}
      >
        {data}
      </span>
    </div>
  );
}
