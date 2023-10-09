// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4-SKCACpS71Lwj-lBnG0VktbUPnpl2vg",
  authDomain: "market-phone.firebaseapp.com",
  projectId: "market-phone",
  storageBucket: "market-phone.appspot.com",
  messagingSenderId: "432726370298",
  appId: "1:432726370298:web:13769aa03c730e1b5a6643",
  measurementId: "G-PZ86GSNQBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

/**
 * 
 * @param {*} urlFolderStr : Đường dẫn muốn lưu trong storage của firebase
 * @param {*} img : File ảnh từ front-end
 */
const upImg = (urlFolderStr, img) => {
  const imgRef = ref(storage, urlFolderStr)
  console.log(img);
  uploadBytes(imgRef, img)
    .then((snapshot) => {
      console.log('Uploaded');
    })
}

/**
 * Nhớ await khi sử dụng hàm. Hàm dùng để lấy ảnh từ firebase
 * @param {*} urlFolderStr :Đường dẫn muốn lưu trong storage của firebase
 * @returns 
 */
const getImg = async (urlFolderStr) => {
  try {
    const storageRef = ref(storage, urlFolderStr);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (err) {
    console.error("Lỗi khi tải ảnh:", err);
    return null;
  }
}


export { upImg, getImg };