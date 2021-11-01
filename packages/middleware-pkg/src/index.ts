import { importantFunction } from '@local/important-function-pkg'

export async function importantFunctionWithLogging(a: number, b: number) {
  const result = await importantFunction(a, b)
  console.log(result)
}
