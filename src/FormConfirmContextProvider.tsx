import {
    Dispatch,
    Fragment,
    ReactNode,
    useCallback,
    useMemo,
    useState,
} from "react";
import { FormConfirmContext } from "./useFormConfirmContext.ts";
import { FieldValues } from "react-hook-form";
import { ConfirmationDialog } from "./ConfirmationDialog.tsx";
import { PartialConfirmOptions } from "./interfaces.ts";
import { FormProps } from "./Form.tsx";

const DEFAULT_OPTIONS = {
    title: "Are you sure?",
    description: "",
    content: null,
    confirmationText: "Ok",
    cancellationText: "Cancel",
    dialogProps: {},
    dialogActionsProps: {},
    confirmationButtonProps: {},
    cancellationButtonProps: {},
    titleProps: {},
    contentProps: {},
    allowClose: true,
    confirmationKeywordTextFieldProps: {},
    hideCancelButton: false,
    buttonOrder: ["cancel", "confirm"],
};

const buildOptions = (
    defaultOptions: PartialConfirmOptions,
    options: PartialConfirmOptions
): PartialConfirmOptions => {
    const dialogProps = {
        ...(defaultOptions.dialogProps || DEFAULT_OPTIONS.dialogProps),
        ...(options.dialogProps || {}),
    };
    const dialogActionsProps = {
        ...(defaultOptions.dialogActionsProps ||
            DEFAULT_OPTIONS.dialogActionsProps),
        ...(options.dialogActionsProps || {}),
    };
    const confirmationButtonProps = {
        ...(defaultOptions.confirmationButtonProps ||
            DEFAULT_OPTIONS.confirmationButtonProps),
        ...(options.confirmationButtonProps || {}),
    };
    const cancellationButtonProps = {
        ...(defaultOptions.cancellationButtonProps ||
            DEFAULT_OPTIONS.cancellationButtonProps),
        ...(options.cancellationButtonProps || {}),
    };
    const titleProps = {
        ...(defaultOptions.titleProps || DEFAULT_OPTIONS.titleProps),
        ...(options.titleProps || {}),
    };
    const contentProps = {
        ...(defaultOptions.contentProps || DEFAULT_OPTIONS.contentProps),
        ...(options.contentProps || {}),
    };
    const confirmationKeywordTextFieldProps = {
        ...(defaultOptions.confirmationKeywordTextFieldProps ||
            DEFAULT_OPTIONS.confirmationKeywordTextFieldProps),
        ...(options.confirmationKeywordTextFieldProps || {}),
    };

    return {
        ...DEFAULT_OPTIONS,
        ...defaultOptions,
        ...options,
        dialogProps,
        dialogActionsProps,
        confirmationButtonProps,
        cancellationButtonProps,
        titleProps,
        contentProps,
        confirmationKeywordTextFieldProps,
    };
};

export const FormConfirmProvider = <T extends FieldValues>(props: {
    children: ReactNode;
    defaultOptions?: PartialConfirmOptions;
}) => {
    const { children, defaultOptions } = props;

    const [count, setCount] = useState(0);
    const [uiOptions, setUiOptions] = useState<
        PartialConfirmOptions | undefined
    >();
    const [formProps, setFormProps] = useState<FormProps<T> | undefined>();

    const [{ resolve, reject }, setResolveReject] = useState<{
        resolve?: Dispatch<PromiseLike<T> | T>;
        reject?: (reason?: unknown) => void;
    }>({});

    const confirm = useCallback(
        (ui: PartialConfirmOptions, form: FormProps<T>) => {
            setCount((c) => c + 1);
            return new Promise<T>((resolve, reject) => {
                setUiOptions(ui);
                setFormProps(form);
                setResolveReject({ resolve, reject });
            });
        },
        []
    );

    const builtOptions = useMemo(() => {
        return buildOptions(defaultOptions ?? {}, uiOptions ?? {});
    }, [uiOptions]);

    const handleClose = useCallback(() => {
        setResolveReject({});
        setUiOptions(undefined);
        setFormProps(undefined);
    }, []);

    const handleCancel = useCallback(() => {
        if (reject) {
            reject();
            handleClose();
        }
    }, [reject, handleClose]);

    const handleConfirm = useCallback(
        (t?: T) => {
            if (resolve) {
                if (t) {
                    resolve(t);
                }
                handleClose();
            }
        },
        [resolve, handleClose]
    );

    return (
        <Fragment>
            <FormConfirmContext.Provider value={{ confirm }}>
                {children}
            </FormConfirmContext.Provider>
            {!!resolve && (
                <ConfirmationDialog
                    key={count}
                    open={!!resolve}
                    onClose={handleClose}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                    options={builtOptions}
                    formProps={formProps}
                />
            )}
        </Fragment>
    );
};
