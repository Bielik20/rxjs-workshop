export async function flushPromises(): Promise<void> {
  await new Promise((res) => res());
}
