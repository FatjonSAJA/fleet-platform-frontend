import { useStore } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";
import { Slider as ShadcnSlider } from "@/components/ui/slider";
import { useFieldContext } from "@/hooks/forms/base/base.form-components";
import { ErrorMessages } from "./ErrorMessages";

export function Slider({ label }: { label: string }) {
  const field = useFieldContext<number>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  const qaId = field.name
    ?.replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "")
    .replace(/\s+/g, "_");

  return (
    <div>
      <Label htmlFor={label} className="mb-2 text-xl font-bold">
        {label}
      </Label>
      <ShadcnSlider
        id={label}
        data-qa-id={qaId ? `${qaId}_slider` : undefined}
        onBlur={() => {
          field.handleBlur();
        }}
        value={[field.state.value]}
        onValueChange={(value) => field.handleChange(value[0])}
      />
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}
