import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";

const options = {
  autoHide: true,
  todayBtn: true,
  clearBtn: true,
  theme: {
    background: "bg-color-primary",
    todayBtn:
      "bg-color-primary text-content-base focus:ring-0  hover:bg-color-accent text-content-base hover:text-content-inverted ",
    clearBtn:
      "bg-color-primary border-none hover:bg-color-accent text-content-base hover:text-content-inverted focus:ring-0",
    icons:
      "bg-color-primary text-content-base hover:bg-color-accent hover:text-content-inverted",
    text: "text-content-base hover:text-content-inverted",
    disabledText: "text-content-base hover:bg-color-primary",
    input: "bg-color-primary border border-color-secondary text-content-base",
    inputIcon: "bg-color-primary",
    selected:
      "bg-color-secondary-variant  text-content-base hover:bg-color-accent",
  },

  datepickerClassNames: "top-17",
  defaultDate: undefined,
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
