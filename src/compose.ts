type Func<T extends any[], R> = (...a: T) => R

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for the
 * resulting composite function.
 *
 * @param funcs The functions to compose.
 * @returns A function obtained by composing the argument functions from right
 *   to left. For example, `compose(f, g, h)` is identical to doing
 *   `(...args) => f(g(h(...args)))`.
 */
export default function compose(): <R>(a: R) => R

export default function compose<F extends Function>(f: F): F

/* two functions */
export default function compose<A, T extends any[], R>(
  f1: (a: A) => R,
  f2: Func<T, A>
): Func<T, R>

/* three functions */
export default function compose<A, B, T extends any[], R>(
  f1: (b: B) => R,
  f2: (a: A) => B,
  f3: Func<T, A>
): Func<T, R>

/* four functions */
export default function compose<A, B, C, T extends any[], R>(
  f1: (c: C) => R,
  f2: (b: B) => C,
  f3: (a: A) => B,
  f4: Func<T, A>
): Func<T, R>

/* rest */
export default function compose<R>(
  f1: (a: any) => R,
  ...funcs: Function[]
): (...args: any[]) => R

export default function compose<R>(...funcs: Function[]): (...args: any[]) => R

// compose函数从左到右组合(compose)多个单参函数。最右边的函数可以按照定义接受多个参数，如果compose的参数为空，则返回一个空函数。如果参数长度为1，则返回函数本身。如果函数的参数为数组，这时候我们返回
// return funcs.reduce((a, b) => (...args) => a(b(...args)))
export default function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return <T>(arg: T) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce(
    (a, b) =>
      (...args: any) =>
        a(b(...args))
  )
}


// compose(f,g,h)
// 第一次执行 a的实参是函数f,b的实参是g
// 第二次调用的是，a的实参是(...args) => f(g(...args)),b的实参是h
// 最后函数返回的是(...args) =>x(h(...args)),其中x为(...args) => f(g(...args))，所以我们最后可以推导出运行compose(f,g,h)的结果是(...args) => f(g(h(...args)))


// reduceRight 
