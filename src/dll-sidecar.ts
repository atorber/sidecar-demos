/**
 *   Sidecar - https://github.com/huan/sidecar
 *
 *   @copyright 2021 Huan LI (李卓桓) <https://github.com/huan>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */
import {
  Sidecar,
  SidecarBody,
  Call,
  ParamType,
  RetType,
  Ret,
  exportTarget,
}                 from 'frida-sidecar'

import path from 'path'

/**
 * Factorial Library
 *  See: https://github.com/huan/ffi-adapter/tree/master/tests/fixtures/library
 */
const dllFile = 'libfactorial-x86.dll'
const dllPath = path.join(
  __dirname,
  dllFile,
).replace(/\\/g, '\\\\')

const initAgentScript = `
  Module.load('${dllPath}')
`

@Sidecar(
  ['C:\\Windows\\notepad.exe'],
  initAgentScript,
)
class DllSidecar extends SidecarBody {

  @Call(exportTarget('factorial', dllFile))
  @RetType('uint64')
  factorial (
    @ParamType('int') n: number,
  ): Promise<number> { return Ret(n) }

}

export { DllSidecar }
