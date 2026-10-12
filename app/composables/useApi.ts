type RequestOptions = Record<string, any>

export function useApi () {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$api as {
    request: (url: string, options?: RequestOptions) => Promise<any>
    get: (url: string, options?: RequestOptions) => Promise<any>
    post: (url: string, body?: any, options?: RequestOptions) => Promise<any>
    put: (url: string, body?: any, options?: RequestOptions) => Promise<any>
    delete: (url: string, options?: RequestOptions) => Promise<any>
    $get: (url: string, options?: RequestOptions) => Promise<any>
    $post: (url: string, body?: any, options?: RequestOptions) => Promise<any>
    $put: (url: string, body?: any, options?: RequestOptions) => Promise<any>
  }
}
