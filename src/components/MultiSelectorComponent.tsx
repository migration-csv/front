// MultiSelectorComponent.tsx
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/extension/multi-select";
import { useCallback, useState } from "react";

const options = [
  { label: "Action", value: "Action" },
  { label: "Adventure", value: "Adventure" },
  { label: "Animation", value: "Animation" },
  { label: "Children", value: "Children" },
  { label: "Comedy", value: "Comedy" },
  { label: "Crime", value: "Crime" },
  { label: "Documentary", value: "Documentary" },
  { label: "Drama", value: "Drama" },
  { label: "Fantasy", value: "Fantasy" },
  { label: "Film-Noir", value: "Film-Noir" },
  { label: "Horror", value: "Horror" },
  { label: "IMAX", value: "IMAX" },
  { label: "Musical", value: "Musical" },
  { label: "Mystery", value: "Mystery" },
  { label: "Romance", value: "Romance" },
  { label: "Sci-Fi", value: "Sci-Fi" },
  { label: "Thriller", value: "Thriller" },
  { label: "War", value: "War" },
  { label: "Western", value: "Western" },
];

interface MultiSelectorComponentProps {
  onValuesChange: (values: string[]) => void;
}

export function MultiSelectorComponent({
  onValuesChange,
}: MultiSelectorComponentProps) {
  const [value, setValue] = useState<string[]>([]);

  const handleValuesChange = useCallback(
    (newValues: string[]) => {
      const sortedValues = newValues.sort();
      setValue(sortedValues);
      onValuesChange(sortedValues);
    },
    [onValuesChange]
  );

  return (
    <MultiSelector
      values={value}
      onValuesChange={handleValuesChange}
      loop={false}
    >
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder="Select genres" />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {options.map((option, i) => (
            <MultiSelectorItem key={i} value={option.value}>
              {option.label}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
}
