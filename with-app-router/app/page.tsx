'use client'

import { useFormState, useFormStatus } from "react-dom";
import { uploadFormData } from "./actions";

export default function Home() {
    const [formState, formAction] = useFormState(uploadFormData, {})

    return (
        <main className="flex min-h-screen flex-col gap-4 items-center p-24">
            <h1 className="text-4xl font-bold">Upload a file</h1>
            <form action={formAction} className="flex gap-2">
                {formState.error && (
                    <p className="text-red-500">{formState.error}</p>
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
            type="submit" 
            disabled={status.pending} 
            value={status.pending ? "Uploading..." : "Upload"} />
    )
}
