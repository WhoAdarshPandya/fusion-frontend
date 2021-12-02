import axios from "axios";
import { getBaseUrl, getToken, getUserId, sanitizer } from ".";

// const axiosrequest1 = axios.get("https://httpbin.org/get");
// const axiosrequest2 = axios.get("https://httpbin.org/get");
// const axiosrequest3 = axios.get("https://httpbin.org/get");
// // you could also use destructuring to have an array of responses
// await axios.all([axiosrequest1, axiosrequest2, axiosrequest3]).then(
//   axios.spread(function (res1, res2, res3) {
//     console.log(res1);
//     console.log(res2);
//     console.log(res3);
//   })
// );

export interface User {
  user_id: string;
  name: string;
  user_name: string;
  email: string;
  friend_id: string;
  chat_id: string;
  todo_id: string;
  request_id: String;
  theme: string;
  password: string;
  profile_url: string;
  joined_at: string;
  dnd: Boolean;
  notification: Boolean;
}

export interface QuoteResponse {
  id: string;
  author: string;
  authorSlug: string;
  content: string;
  dateAdded: string;
  dateModified: string;
  length: number;
  tags: Array<String>;
}

export interface helperResponse {
  content?: string;
  author?: string;
  err?: string | null | undefined;
  success: boolean;
}

export interface RequestHelperResponse {
  result?: any;
  err?: string | null | undefined;
  success: boolean;
}

export const getRandomQuote = async (): Promise<helperResponse> => {
  let send: helperResponse = { success: false };
  await axios
    .get<QuoteResponse>("https://api.quotable.io/random")
    .then((res) => {
      send = {
        success: true,
        content: res.data.content,
        author: res.data.author,
        err: null,
      };
    })
    .catch((err) => {
      send = { success: false, err: JSON.stringify(err) };
    });
  return send;
};

export const imageUploader = async (
  formData: any
): Promise<RequestHelperResponse> => {
  let resp: RequestHelperResponse = await axios
    .post(`${getBaseUrl()}/api/v1/uploadimage`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      return { success: true, err: null, result: res.data };
    })
    .catch((err) => ({ success: false, err: String(err) }));
  return resp;
};

export const loginReq = async (email: string, password: string) => {
  const resp = await axios
    .post(
      `${getBaseUrl()}/api/v1/login`,
      { type: "email", email, password },
      { headers: { "Content-Type": "application/json" } }
    )
    .then((res) => res.data)
    .catch((err) => err);
  return resp;
};

export const getUserData = async (): Promise<RequestHelperResponse> => {
  const token = getToken();
  let resp: RequestHelperResponse = { success: false };
  await axios
    .get<User>(`${getBaseUrl()}/api/v1/user/getalldata/${getUserId()}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token!,
      },
    })
    .then((result) => {
      resp = { success: true, err: null, result: result.data };
    })
    .catch((err) => {
      resp = { success: false, err };
      console.log(resp);
    });
  return resp;
};

export const updateUserDndReq = async (
  dnd: boolean
): Promise<RequestHelperResponse> => {
  const token = getToken();
  const id = getUserId();
  let resp: RequestHelperResponse = { success: false };
  await axios
    .post(
      `${getBaseUrl()}/api/v1/user/updatednd`,
      { id, dnd },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token!,
        },
      }
    )
    .then((result) => {
      resp = { success: true, err: null, result: result.data };
    })
    .catch((err) => {
      resp = { success: false, err };
      console.log(resp);
    });
  return resp;
};

export const updateUserNotificationReq = async (
  notification: boolean
): Promise<RequestHelperResponse> => {
  const token = getToken();
  const id = getUserId();
  let resp: RequestHelperResponse = { success: false };
  await axios
    .post(
      `${getBaseUrl()}/api/v1/user/updatenotification`,
      { id, notification },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token!,
        },
      }
    )
    .then((result) => {
      resp = { success: true, err: null, result: result.data };
    })
    .catch((err) => {
      resp = { success: false, err };
      console.log(resp);
    });
  return resp;
};

export const signupUserReq = async (
  name: string,
  user_name: string,
  profile_url: string,
  password: string,
  email: string
): Promise<RequestHelperResponse> => {
  let resp: RequestHelperResponse = { success: false };
  await axios
    .post(
      `${getBaseUrl()}/api/v1/signup`,
      {
        name: sanitizer(name),
        user_name: sanitizer(user_name),
        profile_url: sanitizer(profile_url),
        password: sanitizer(password),
        email: sanitizer(email),
        confirm_password: sanitizer(password),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((result) => {
      resp = { success: true, err: null, result: result.data };
    });
  // .catch((err) => {
  //   resp = { success: false, err: String(err.msg) };
  //   console.log(resp);
  // });
  return resp;
};

export const updatePasswordReq = async (
  id: string,
  old_pass: string,
  new_pass: string,
  email: string
): Promise<RequestHelperResponse> => {
  let resp: RequestHelperResponse = { success: false };
  const token = getToken();
  // const id = getUserId();
  console.log(email, id, old_pass, new_pass);
  resp = await axios
    .post(
      `${getBaseUrl()}/api/v1/user/updatepassword`,
      {
        id: id,
        email: email,
        old_pass: old_pass,
        new_pass: new_pass,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token!,
        },
      }
    )
    .then((result) => {
      return { success: true, err: null, result: result.data };
    })
    .catch((err) => ({ success: false, err: String(err) }));
  return resp;
};

export const deleteAccountReq = async (): Promise<RequestHelperResponse> => {
  const token = getToken();
  const id = getUserId();
  let resp: RequestHelperResponse = { success: false };
  resp = await axios
    .get(`${getBaseUrl()}/api/v1/user/deleteuser/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token!,
      },
    })
    .then((result) => {
      return { success: true, err: null, result };
    })
    .catch((err) => ({ err: String(err), success: false }));
  return resp;
};

export const updateUserProfile = async (
  url: string
): Promise<RequestHelperResponse> => {
  const token = getToken();
  const id = getUserId();
  let resp: RequestHelperResponse = { success: false };
  resp = await axios
    .post(
      `${getBaseUrl()}/api/v1/user/updateprofile`,
      {
        id,
        url,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token!,
        },
      }
    )
    .then((result) => {
      return { success: true, err: null, result };
    })
    .catch((err) => ({ err: String(err), success: false }));
  return resp;
};

export const updateUserInfo = async (
  name: string,
  user_name: string,
  email: string
): Promise<RequestHelperResponse> => {
  const token = getToken();
  const id = getUserId();
  let resp: RequestHelperResponse = { success: false };
  resp = await axios
    .post(
      `${getBaseUrl()}/api/v1/user/updateinfo`,
      {
        id,
        name,
        user_name,
        email,
        theme: "",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token!,
        },
      }
    )
    .then((result) => {
      return { success: true, err: null, result };
    })
    .catch((err) => ({ err: String(err), success: false }));
  return resp;
};
