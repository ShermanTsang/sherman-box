export function useMessage () {
  return useNuxtApp().$message as {
    info: (text: string, callback?: () => void) => void
    success: (text: string, callback?: () => void) => void
    error: (text: string, callback?: () => void) => void
    warning: (text: string, callback?: () => void) => void
  }
}
