import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";

const options = {
  autoHide: true,
  todayBtn: true,
  clearBtn: true,
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-theme-color-1",
    todayBtn: "bg-theme-color-1 text-skin-base focus:ring-0",
    clearBtn: "bg-theme-color-1",
    icons: "bg-theme-color-1 text-skin-base",
    text: "text-skin-base hover:bg-theme-color-2",
    disabledText: "text-skin-base hover:bg-theme-color-2",
    input: "bg-theme-color-1  border border-theme-color-2 text-skin-base",
    inputIcon: "bg-theme-color-1",
    selected: "text-skin-base",
  },
  datepickerClassNames: "top-17",
  defaultDate: new Date(),
  language: "en",
};

export default function StyledDatepicker({
  onSelectionChange,
}: {
  onSelectionChange: (d: Date) => void;
}) {
  const [show, setShow] = useState<boolean>(false);
  const handleChange = (selectedDate: Date) => {
    onSelectionChange?.(selectedDate);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    <div>
      <Datepicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
      />
    </div>
  );
}
