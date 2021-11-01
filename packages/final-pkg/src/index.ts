import { importantFunction } from '@local/important-function-pkg'

async function entrypoint() {
  const impFnResult = await importantFunction(10, 20)
  console.log(impFnResult)
}

entrypoint()
