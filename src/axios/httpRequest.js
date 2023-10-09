import request from "./requestConfig";

export const postRequest = async (url, data) => {
  try {
    const res = await request.post(url, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const putRequest = async (url, data) => {
  try {
    const res = await request.put(url, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getRequest = async (url) => {
  try {
    const res = await request.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRequest = async (url, chosenId) => {
  try {
    const res = await request.delete(url, {
      params: {
        id: chosenId,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Hàm xử lý axios
 * @param {*} url : đường dẫn controller
 * @param {*} typeSend : POST hoặc GET
 * @param data : dũ liệu sẽ gửi đi, có hoặc không
 */
export const fetchApi = async (url,typeSend,data)=>{
  const result = null;
  if(typeSend === 'POST'){
    result = await postRequest(url,data);
  }else{
    result = await getRequest(url);
  }
  return result
}

