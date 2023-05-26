import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useFormConfirmContext } from "./ui-form-confirm";

function App() {
    const [count, setCount] = useState(0);

    const { confirm } = useFormConfirmContext();

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button
                    onClick={() => {
                        setCount((count) => count + 1);
                        confirm(
                            {},
                            {
                                defaultValues: { name: "abcd", age: 15 },
                                fields: {
                                    name: {
                                        tooltipProps: { title: "hahahaha" },
                                    },
                                    age: {
                                        tooltipProps: { title: "age age" },
                                    },
                                },
                            }
                        )
                            .then((v) => console.log(v))
                            .catch(() => console.log("cancelled"));
                    }}
                >
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
