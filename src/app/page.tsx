import Popup from "./Popup";
import axios from "axios";

async function checkServerStatus(value: string) {
  'use server';
  axios.get(`${value}${value.endsWith('/') ? '' : '/'}check-status`).then(() => {
    return true;
  }).catch(err => {
    return false;
  });
}

export default async function Home() {
  return (
    <main className="h-screen p-4">
        <div className="h-full flex items-center justify-center">
          <Popup title='Welcome! ✨' action={checkServerStatus} type="input" btn="Continue" input="Server URL" message={['PrettyChat was designed to run on-device, so you will need to host its server and database yourself. Pretty simple stuff, though. Check the docs at ', <a key={0} className="underline" href="https://github.com/amarogu/prettychat" target="_blank">https://github.com/amarogu/prettychat.</a>, ' In order to continue, please insert the url that points to your self-managed server.']} />
        </div>
    </main>
  )
}
