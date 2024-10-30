import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "src/index.tsx",
            name: "ui-form-confirm",
            formats: ["es", "umd"],
            fileName: (format) => `your-library.${format}.js`,
        },
    },
});
