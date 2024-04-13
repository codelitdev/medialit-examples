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

    let response: any = await fetch(`${process.env.MEDIALIT_ENDPOINT}/media/create`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        console.error(await response.text())
    } 

    const resp = await response.json();
    console.log(resp)
    return {file: resp.file};
}