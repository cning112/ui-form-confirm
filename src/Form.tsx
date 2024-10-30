import { Controller, DeepPartial, FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { Stack, StackProps, TextField, TextFieldProps, Tooltip, TooltipProps } from "@mui/material";

export interface FormProps<T extends FieldValues> {
    defaultValues: DeepPartial<T>;
    stackProps?: StackProps;
    fields: Record<
        FieldPath<T>,
        {
            componentProps?: TextFieldProps;
            tooltipProps?: Omit<TooltipProps, "children">;
        }
    >;
}

export const Form = <T extends FieldValues>(props: FormProps<T>) => {
    const { fields, stackProps } = props;
    const { control } = useFormContext();

    return (
        <Stack {...stackProps}>
            {Object.keys(fields).map((key) => {
                const { componentProps, tooltipProps = { title: "" } } = fields[key as FieldPath<T>];
                return (
                    <Tooltip {...tooltipProps} key={key}>
                        <>
                            <Controller
                                name={key as FieldPath<T>}
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextField
                                        label={key}
                                        value={value ?? ""}
                                        onChange={(e) => onChange(e.target.value)}
                                        {...componentProps}
                                    />
                                )}
                            />
                        </>
                    </Tooltip>
                );
            })}
        </Stack>
    );
};
