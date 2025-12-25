import { useStore } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "@/hooks/forms/base/base.form-components";
import { cn } from "@/lib/utils";
import { ErrorMessages } from "./ErrorMessages";

export function InputBoxField({
  placeholder,
  type = "text",
  name,
  className,
}: {
  placeholder?: string;
  type?: string;
  name?: string;
  className?: string;
}) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const fieldName = name || field.name;
  const qaId = fieldName
    ?.replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "")
    .replace(/\s+/g, "_");

  return (
    <div className="space-y-1.5">
      <Input
        type={type}
        name={fieldName}
        data-qa-id={qaId}
        value={field.state.value || ""}
        placeholder={placeholder}
        onBlur={() => {
          field.handleBlur();
        }}
        onChange={(e) => field.handleChange(e.target.value)}
        className={cn("h-12 px-4", className)}
      />
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}
