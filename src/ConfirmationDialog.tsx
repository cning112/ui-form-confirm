import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { Form, FormProps } from "./Form.tsx";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { Dispatch, DispatchWithoutAction } from "react";
import { PartialConfirmOptions } from "./interfaces.ts";

interface ConfirmationDialogProps<T extends FieldValues> {
    open: boolean;
    onClose: DispatchWithoutAction;
    onCancel: DispatchWithoutAction;
    onConfirm: Dispatch<T | undefined>;
    options: PartialConfirmOptions;
    formProps?: FormProps<T>;
}

export const ConfirmationDialog = <T extends FieldValues>(
    props: ConfirmationDialogProps<T>
) => {
    const { open, onClose, options, onCancel, onConfirm, formProps } = props;

    const formMethods = useForm({
        defaultValues: formProps?.defaultValues ?? {},
        mode: "onChange",
    });
    const {
        getValues,
        formState: { isValid },
    } = formMethods;

    const formContent = formProps ? (
        <FormProvider {...formMethods}>
            <Form fields={formProps.fields} stackProps={formProps.stackProps} />
        </FormProvider>
    ) : options?.description ? (
        <DialogContentText>{options.descriptions}</DialogContentText>
    ) : (
        <></>
    );

    const dialogActions = options.buttonOrder.map((buttonType) => {
        if (buttonType === "cancel") {
            return (
                !options.hideCancelButton && (
                    <Button
                        key={buttonType}
                        {...options.cancellationButtonProps}
                        onClick={() => onCancel()}
                    >
                        {options.cancellationText}
                    </Button>
                )
            );
        }
        if (buttonType === "confirm") {
            return (
                <Button
                    key={buttonType}
                    color="primary"
                    disabled={!isValid}
                    {...options.confirmationButtonProps}
                    onClick={() => onConfirm(getValues())}
                >
                    {options.confirmationText}
                </Button>
            );
        }
    });

    return (
        <Dialog
            open={open}
            onClose={options.allowClose ? onClose : null}
            {...options.dialogProps}
        >
            <DialogTitle {...options.titleProps}>{options.title}</DialogTitle>
            <DialogContent {...options.contentProps}>
                {formContent}
            </DialogContent>
            <DialogActions {...options.dialogActionsProps}>
                {dialogActions}
            </DialogActions>
        </Dialog>
    );
};
