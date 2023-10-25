function SafeAsync(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value
  if (originalMethod instanceof Function) {
    descriptor.value = async function (...args: any[]) {
      try {
        const result = await originalMethod.apply(this, args)
        if (result === null || result === undefined) {
          throw new Error('Return value was null or undefined')
        }
        return result
      } catch (error) {
        throw error
      }
    }
  }
  return descriptor
}

export default SafeAsync
