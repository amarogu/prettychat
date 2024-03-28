import Res from "../../../../Classes/Res";
import axiosInstance from "../../../../axiosInstance";

export default async function Chat({searchParams}: {searchParams: {key: string}}) {

    const key = searchParams.key;
    const res = await axiosInstance.post('/validate-key', {key: key});
    const data: Res = res.data;

    return (
        <>
            {data.message}
        </>
    )
}