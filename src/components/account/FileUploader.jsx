import {  getPresignedUrl } from "../../api/file.api";

export const handleOnFileSelect = async (file, type, setFieldValue) => {
    if (!file) {
        setFieldValue(type, "");
    } else {
        const fileUrl = await getPresignedUrl({ fileName: file.name });
        setFieldValue(type, fileUrl.data.path);
        const formData = new FormData();
        formData.append('file', file);
        const requestOptions = {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type,
            }
        };
        await fetch(fileUrl.data.url, requestOptions);
    }
};
