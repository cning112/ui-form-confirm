import { useState } from "react";
import "./App.css";
import { useFormConfirmContext } from "ui-form-confirm";

function App() {
    const [formData, setFormData] = useState<any>({});

    const { confirm } = useFormConfirmContext();

    return (
        <>
            <h1>Demo of ui-form-confirm</h1>
            <div className="card">
                <button
                    onClick={() => {
                        confirm(
                            {
                                dialogProps: {
                                    maxWidth: "lg",
                                    fullWidth: true,
                                },
                                contentProps: {
                                    sx: { height: 200 },
                                },
                            },
                            {
                                stackProps: { spacing: 2, sx: { mt: 2 } },
                                defaultValues: {
                                    firstName: "Chao",
                                    lastName: "Ning",
                                },
                                fields: {
                                    firstName: {
                                        tooltipProps: { title: "First Name" },
                                    },
                                    lastName: {
                                        tooltipProps: { title: "Last Name" },
                                    },
                                },
                            }
                        )
                            .then((v) => {
                                setFormData(v);
                            })
                            .catch(() => console.log("cancelled"));
                    }}
                >
                    Click to show the confirm popup
                </button>
            </div>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
        </>
    );
}

export default App;
