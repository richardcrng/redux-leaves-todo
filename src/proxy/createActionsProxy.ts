import wrapWithCreate from './wrapWithCreate'
import { DefaultCreators, CreateFn } from '../types'

type CreateT<LeafT, TreeT> = DefaultCreators<LeafT, TreeT> & CreateFn<DefaultCreators<LeafT, TreeT>>

export type ActionsProxy<LeafT, TreeT> = {
  create: CreateT<LeafT, TreeT>
} & {
  [K in keyof LeafT]: ActionsProxy<LeafT[K], TreeT>
}

function createActionsProxy<LeafT, TreeT>(
  leafState: LeafT,
  path: (string|number)[] = []
): ActionsProxy<LeafT, TreeT> {

  const proxy = new Proxy(wrapWithCreate(leafState, path), {
    get: (target, prop: Extract<keyof LeafT, string | number> | 'create') => {
      if (prop === 'create') return target.create

      return createActionsProxy(target[prop], [...path, propForPath(prop)])
    }
  })

  return proxy as unknown as ActionsProxy<LeafT, TreeT>
}

const propForPath = (prop: string | number): string | number => (
  isFixedString(prop)
    ? parseInt(String(prop))
    : prop
)

const isFixedString = (s: string | number) => !isNaN(+s) && isFinite(+s) && !/e/i.test(String(s))

export default createActionsProxy