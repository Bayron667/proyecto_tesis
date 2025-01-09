import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import parseJwt from "../components/parseJwt";

const firebaseConfig = {
    apiKey: "AIzaSyDxE9C2SDt5bCRrF7jXnC82FIbSsf26UuE",
    authDomain: "trabajodegrado-4c56f.firebaseapp.com",
    projectId: "trabajodegrado-4c56f",
    storageBucket: "trabajodegrado-4c56f.appspot.com",
    messagingSenderId: "561263054678",
    appId: "1:561263054678:web:2ed6b606416e13c07190f7"
  };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFoto(file) {
    const id = parseJwt(localStorage.getItem("token")).id
    const storageRef = ref(storage, `perfil/${"id:"+id}`)
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    return url
}
