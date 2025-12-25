import { Button } from "@/components/ui/button";
import { useFormContext } from "@/hooks/forms/base/base.form-components";

export function SubscribeButton({
  label,
  name = "submit",
}: {
  label: string;
  name?: string;
}) {
  const form = useFormContext();
  const qaId = name
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "")
    .replace(/\s+/g, "_");

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          type="submit"
          disabled={isSubmitting}
          data-qa-id={`${qaId}_btn`}
        >
          {label}
        </Button>
      )}
    </form.Subscribe>
  );
}
