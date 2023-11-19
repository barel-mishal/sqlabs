export async function tryOption<T extends unknown[], R>(
    func: (...args: T) => Promise<R>,
    ...args: T
  ): Promise<R | void> {
    try {
      return await func(...args);
    } catch (error) {
      console.error(error);
    }
  }
  