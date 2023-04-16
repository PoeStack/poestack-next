import { useTheme } from 'next-themes';
import Select from '@components/core/select';

export default function ThemeChanger({
  onChange = () => {},
}: {
  onChange?: (e: string) => void;
}) {
  const { theme, setTheme } = useTheme();

  const themes = ['Dark', 'Original', 'Vaal'];

  return (
    <>
      <Select
        options={themes}
        onChange={(e) => {
          setTheme(e);
          onChange?.(e);
        }}
        selected={theme ?? themes[0]}
      />
    </>
  );
}
