
export const fileUpload = async( file ) => {
 
    const cloudUrl = `https://api.cloudinary.com/v1_1/drwrqecjq/image/upload`

    const formDataBody = new FormData();

    formDataBody.append('upload_preset','journal-app');
    formDataBody.append('file', file);

    try {
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formDataBody,
        });

        if(!resp.ok) throw new Error.json();

        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    }catch(error){
        throw new Error(error.message)
    }

}
