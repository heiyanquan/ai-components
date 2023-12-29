import { spawn } from 'child_process'

function exec(command, args, opts) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      shell: true,
      stdio: 'inherit',
      env: process.env,
      ...opts
    })
    child.once('error', (err) => {
      console.log('exec error', err)
      reject(err)
    })
    child.once('close', (code) => {
      if (code === 1) {
        process.exit(1)
      } else {
        resolve()
      }
    })
  })
}

export default exec
