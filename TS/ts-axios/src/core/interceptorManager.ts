import { RejectedFn, ResolvedFn } from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected: RejectedFn
}

export default class InterceptorManager<T> {
  private intercptors: Array<Interceptor<T> | null>

  constructor() {
    this.intercptors = []
  }

  use(resolved: ResolvedFn<T>, rejected: RejectedFn): number {
    this.intercptors.push({
      resolved,
      rejected
    })
    return this.intercptors.length - 1
  }

  eject(id: number): void {
    if (this.intercptors[id]) {
      this.intercptors[id] = null
    }
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.intercptors.forEach(interceptor => {
      if (interceptor) {
        fn(interceptor)
      }
    })
  }
}
