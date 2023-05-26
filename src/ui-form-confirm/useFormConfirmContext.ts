import { createContext, useContext } from "react";
import { FieldValues } from "react-hook-form";
import { PartialConfirmOptions } from "./interfaces.ts";
import { FormProps } from "./Form.tsx";

interface FormConfirmContextType<T extends FieldValues> {
    confirm: (
        uiOptions: PartialConfirmOptions,
        formProps: FormProps<T>
    ) => Promise<T>;
}

export const FormConfirmContext = createContext<
    FormConfirmContextType<unknwon> | undefined
>(undefined);

export const useFormConfirmContext = () => {
    const context = useContext(FormConfirmContext);
    if (context === undefined) {
        throw new Error(
            "useFormConfirmContext can only be used inside FormConfirmContext.Provider"
        );
    }
    return context;
};
