import {  getPresignedUrl } from "../../api/file.api";
import Notify from "../../utils/notify";
export const handleOnFileSelect = async (file, type, setFieldValue) => {
    if (!file) {
        setFieldValue(type, "");
    } else {
       try {
        const fileUrl = await getPresignedUrl({ fileName: file.name });
        console.log(" File type ::>", fileUrl);
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
       } catch (error) {
        // Notify.error(error.message);
       }
    }
};
