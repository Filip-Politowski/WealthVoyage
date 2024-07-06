import "./styledSelect.scss";
import Select from "react-select";
type Props = {
  value: any;
  onChange: any;
  options: any;
  defaultValue?: any;
};

const StyledSelect = (props: Props) => {
  return (
    <>
      <Select
        className="my-select-container"
        classNamePrefix="my-select"
        value={props.value}
        onChange={props.onChange}
        options={props.options}
        defaultValue={props.defaultValue}
      />
    </>
  );
};

export default StyledSelect;
