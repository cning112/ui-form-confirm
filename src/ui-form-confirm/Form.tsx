import {
    Controller,
    FieldPath,
    FieldValues,
    useFormContext,
} from "react-hook-form";
import {
    Stack,
    TextField,
    TextFieldProps,
    Tooltip,
    TooltipProps,
} from "@mui/material";
import _ from "lodash";

export interface FormProps<T extends FieldValues> {
    defaultValues: T;
    fields: Record<
        FieldPath<T>,
        {
            componentProps?: TextFieldProps;
            tooltipProps?: Omit<TooltipProps, "children">;
        }
    >;
}

export const Form = <T extends FieldValues>(
    props: Pick<FormProps<T>, "fields">
) => {
    const { fields } = props;
    const { control } = useFormContext();

    return (
        <Stack spacing={1}>
            {_.map(
                fields,
                ({ componentProps, tooltipProps = { title: "" } }, key) => (
                    <Tooltip {...tooltipProps} key={key}>
                        <>
                            <Controller
                                name={key as FieldPath<T>}
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <TextField
                                        label={key}
                                        value={value ?? ""}
                                        onChange={(e) =>
                                            onChange(e.target.value)
                                        }
                                        {...componentProps}
                                    />
                                )}
                            />
                        </>
                    </Tooltip>
                )
            )}
        </Stack>
    );
};
