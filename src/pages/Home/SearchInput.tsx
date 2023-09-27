import * as React from "react";
import { Input } from "@/components/Input";
import { Icon } from "@/components/Icon";
import SearchIcon from "@/assets/images/searchIcon.svg?react";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const DEBOUNCE_TIME = 400;

interface SearchInputProps {
  initialValue?: string;
  onChange: (newValue: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ initialValue, onChange }) => {
  const [query, setQuery] = useState(() => initialValue || "");
  const debouncedOnChange = useDebounce(onChange, DEBOUNCE_TIME);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setQuery(event.target.value);
    debouncedOnChange(event.target.value);
  };

  return (
    <Input
      value={query}
      addonLeft={<Icon Svg={SearchIcon} />}
      area-label="Search"
      placeholder="Search..."
      onChange={changeHandler}
    />
  );
};
