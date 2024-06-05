import { Bounce, toast } from 'react-toastify';

export function showAlert(message, toastType) {
    const config = {
        position: "bottom-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    }

    switch (toastType) {
        case AlertType.Info:
            toast.info(message, config);
            break;
        case AlertType.Success:
            toast.success(message, config);
            break;
        case AlertType.Error:
            toast.error(message, config);
            break;
        default:
            toast(message, config);
            break;
    }
}

export const AlertType = Object.freeze({
    Error: "error",
    Success: "success",
    Info: "info"
});