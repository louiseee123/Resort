declare const client: {
  fetch: <T = unknown>(query: string, params?: Record<string, unknown>) => Promise<T>
}

export {client}
export default client
