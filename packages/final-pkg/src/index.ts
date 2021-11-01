import { importantFunction } from '@local/important-function-pkg'
import { importantFunctionWithLogging } from '@local/middleware-pkg'

async function entrypoint() {
  const impFnResult = await importantFunction(10, 20)
  console.log(impFnResult)

  const impFnLogResult = await importantFunctionWithLogging(30, 40)
  console.log(impFnLogResult)
}

entrypoint()
