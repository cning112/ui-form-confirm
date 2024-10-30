
# UI Form Confirm

[![npm version](https://badge.fury.io/js/ui-form-confirm.svg)](https://www.npmjs.com/package/ui-form-confirm)

`ui-form-confirm` is a React component that provides a customizable form confirmation dialog, based on Material-UI and React Hook Form. It’s ideal for scenarios where users need to confirm form submissions.

## Features

- Material-UI styling for consistent dialog design.
- Integrated with React Hook Form for streamlined form handling.
- Configurable buttons and messages.
- **Supports form fields in the confirmation popup**: The confirmation popup can include simple form fields, allowing for user input directly in the dialog.
- **Promise-based confirmation**: If the confirmation popup is confirmed, the form data is returned in a promise, providing a convenient way to handle form data.

## Inspiration

This project is inspired by `material-ui-form`. Compared to `material-ui-form`, `ui-form-confirm` extends functionality by allowing simple form fields in the confirm dialog and supports returning form data as a promise upon confirmation.

## Installation

Install via npm:

```bash
npm install ui-form-confirm
```

Or via Yarn:

```bash
yarn add ui-form-confirm
```

## Usage

Example usage of `ui-form-confirm`:

```typescript
import { ConfirmDialog } from 'ui-form-confirm';

const MyComponent = () => (
  <ConfirmDialog
    onConfirm={handleConfirm}
    onCancel={handleCancel}
    confirmationText="Are you sure you want to submit?"
  />
);
```

## Props

| Prop               | Type       | Default     | Description                          |
|--------------------|------------|-------------|--------------------------------------|
| `onConfirm`        | `function` | required    | Callback for confirmation action     |
| `onCancel`         | `function` | required    | Callback for cancellation action     |
| `confirmationText` | `string`   | "Confirm"   | Text for the confirmation button     |
| `cancellationText` | `string`   | "Cancel"    | Text for the cancellation button     |

## Development & Build

- **Development**: Run `npm run dev`
- **Build for Production**: Run `npm run build`

## GitHub Actions for Publishing

A GitHub Actions workflow is set up for automated version bumping and publishing. Trigger manually with `major`, `minor`, or `patch` to publish to npm.
