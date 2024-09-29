import axios from "axios";

function Axios() {
    if (window.localStorage.getItem('jwt') === null) {
        window.localStorage.setItem('jwt', 'None');
    }
    let jwt = `Bearer ${window.localStorage.getItem('jwt')}`;
    console.log('JWT:', jwt); // 調試資訊
    const res = axios.create({
        baseURL: 'http://140.133.74.162:12345/',
        timeout: 10000,
        headers: {
            'Authorization': jwt,
            'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    });
    
// 改善攔截器
res.interceptors.response.use(
    function (res) {
        return res;
    },
    function (err) {
        if (err.response && err.response.status === 401) {
            alert("您的憑證已失效，請重新登入");
            window.localStorage.removeItem('jwt');
            // 使用其他方法進行重定向，例如使用 React Router 的 useNavigate
            window.location.href = "/LoginPage";
        }
        return Promise.reject(err);
    }
);
    return res;
}


// 驗證 token 的有效性
export const checkTokenValidity = () => {
    const jwtToken = window.localStorage.getItem('jwt');
    if (!jwtToken || jwtToken === 'None') {
        return false;
    }
    // 進行 token 驗證請求
    return Axios().post('api/token/verify/', { token: jwtToken })
      .then((res) => {
          return res.status === 200;
      })
      .catch((err) => {
          console.error('Invalid token:', err);
          return false;
      });
}


export default Axios;
