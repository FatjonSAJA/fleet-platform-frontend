import { createFormHook } from "@tanstack/react-form";
import { AutocompleteField } from "@/components/forms/shared/AutocompleteField";
import { Checkbox } from "@/components/forms/shared/Checkbox";
import { InputBoxField } from "@/components/forms/shared/InputBoxField";
import { Slider } from "@/components/forms/shared/Slider";
import { SubscribeButton } from "@/components/forms/shared/SubscribeButton"; 
import { fieldContext, formContext } from "./base.form-components.ts";

export const { useAppForm: useBaseForm, withForm: withBaseForm } =
  createFormHook({
    fieldComponents: {
      AutocompleteField,
      InputBoxField,
      Slider, 
      Checkbox,
    },
    formComponents: {
      SubscribeButton,
    },
    fieldContext,
    formContext,
  });
