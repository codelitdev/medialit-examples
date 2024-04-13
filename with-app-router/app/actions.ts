'use server'

export async function uploadFormData(
    prevState: Record<string, unknown>,
    formData: FormData
): Promise<{
    file?: string,
    error?: string 
}> {
    const file = formData.get("file") as File;
    if (file.size === 0) {
        return {error: `No file selected`};
    }

    if (!process.env.MEDIALIT_API_KEY) {
        return {error: `No API key set`};
    }

    formData.append("apikey", process.env.MEDIALIT_API_KEY);

    const response: any = await fetch(`${process.env.MEDIALIT_ENDPOINT}/media/create`, {
        method: "POST",
        body: formData,
    });

    const resp = await response.json() 

    if (!response.ok) {
        return { error: resp.error }
    } 
        
    return { file: resp.file }
}