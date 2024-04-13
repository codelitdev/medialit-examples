'use client'

import { useFormState, useFormStatus } from "react-dom";
import { uploadFormData } from "./actions";

export default function Home() {
    const [formState, formAction] = useFormState(uploadFormData, {})

    return (
        <main className="flex min-h-screen flex-col gap-8 items-center p-8">
            <h1 className="text-4xl font-bold">Upload a file</h1>
            <form action={formAction} className="flex flex-col gap-4 items-center">
                {formState.error && (
                    <p className="text-red-500 text-sm">{formState.error}</p>
                )}
                <input type="file" name="file" />
                <Submit />
            </form>
            {formState.file && (
                <img 
                    className="w-[400px] h-auto border rounded-md"
                    src={formState.file} />
                )}
        </main>
    );
}

function Submit() {
    const status = useFormStatus();

    return (
        <input 
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            type="submit" 
            disabled={status.pending} 
            value={status.pending ? "Uploading..." : "Upload"} />
    )
}
