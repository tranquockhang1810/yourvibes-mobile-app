export const TransferToFormData = (data: any) => {
    const formData = new FormData();
    for (const key in data) {
        if (Array.isArray(data[key])) {
            data[key].forEach((element: any) => {
                formData.append(key, element);
            });
        } else {
            formData.append(key, data[key]);
        }
    }
    return formData;
}