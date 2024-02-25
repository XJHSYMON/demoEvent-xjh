import axios from 'axios'
import {useUserStore} from "@/stores/index.js";
import {ElMessage} from 'element-plus'
import router from "@/router/index.js";
const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
    // TODO 1. 基础地址，超时时间
    baseURL,
    timeout:10000
})

//请求拦截器
instance.interceptors.request.use(
    (config) => {
        // TODO 2. 携带token
        const useStore = useUserStore()
        if (useStore.token){
            config.headers.Authorization = useStore.token
        }
        return config
    },
    (err) => Promise.reject(err)
)

//响应拦截器
instance.interceptors.response.use(
    (res) => {
        // TODO 3. 处理业务失败
        // TODO 4. 摘取核心响应数据
        if(res.data.code === 0){
            return res
        }
        // TODO 3. 处理业务失败
        // 处理业务失败，给出错误提示，抛出错误
        ElMessage.error('res.data.message' || '服务异常' )
        return Promise.reject(res.data)
    },

    (err) => {
        //错误的默认情况,只给提示
        ElMessage.error('err.response.data.message' || '服务异常' )
        return Promise.reject(err)
        // TODO 5. 处理401错误 特殊情况
        // 说明权限不足 或 Token过期 => 拦截到首页
        if(err.response?.status === 401){
            router.push('/login')
        }

    }
)

export default instance