import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Form, FormProps } from "./Form.tsx";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { Dispatch, DispatchWithoutAction, ReactNode } from "react";
import { PartialConfirmOptions } from "./interfaces.ts";

interface ConfirmationDialogProps<T extends FieldValues> {
    open: boolean;
    onClose: DispatchWithoutAction;
    onCancel: DispatchWithoutAction;
    onConfirm: Dispatch<T | undefined>;
    options: PartialConfirmOptions;
    formProps?: FormProps<T>;
}

export const ConfirmationDialog = <T extends FieldValues>(props: ConfirmationDialogProps<T>) => {
    const { open, onClose, options, onCancel, onConfirm, formProps } = props;

    console.log("form defaultvalues", formProps?.defaultValues);

    const formMethods = useForm({
        defaultValues: formProps?.defaultValues,
        mode: "onChange",
    });
    const {
        getValues,
        formState: { isValid },
    } = formMethods;

    const formContent = formProps ? (
        <FormProvider {...formMethods}>
            <Form {...formProps} />
        </FormProvider>
    ) : (
        <DialogContentText>{(options.description ?? "") as ReactNode}</DialogContentText>
    );

    const dialogActions = options.buttonOrder?.map((buttonType) => {
        if (buttonType === "cancel") {
            return (
                !options.hideCancelButton && (
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    <Button key={buttonType} {...options.cancellationButtonProps} onClick={() => onCancel()}>
                        {(options.cancellationText ?? "Cancel") as ReactNode}
                    </Button>
                )
            );
        }
        if (buttonType === "confirm") {
            return (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                <Button
                    key={buttonType}
                    color="primary"
                    disabled={!isValid}
                    {...options.confirmationButtonProps}
                    onClick={() => onConfirm(getValues())}
                >
                    {(options.confirmationText ?? "Confirm") as ReactNode}
                </Button>
            );
        }
    });

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Dialog open={open} onClose={options.allowClose ? onClose : null} {...options.dialogProps}>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <DialogTitle {...options.titleProps}>{(options.title ?? "") as ReactNode}</DialogTitle>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <DialogContent {...options.contentProps}>{formContent}</DialogContent>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <DialogActions {...options.dialogActionsProps}>{dialogActions}</DialogActions>
        </Dialog>
    );
};
