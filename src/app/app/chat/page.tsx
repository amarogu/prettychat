'use client';
import { useSearchParams } from "next/navigation";

export default function Chat() {

    const searchParams = useSearchParams();
    const key = searchParams.get("key");

    return (
        <>
            {key}
        </>
    )
}