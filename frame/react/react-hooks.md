# React Hooks

## 实现状态管理

```js
// store/context.tsx
import React, { useReducer, createContext, FC, useContext } from 'react'
import { ActionType } from './types'
import { initialState, reducer } from './reducer'

const StateCtx = createContext(initialState)
const DispatchCtx = createContext((() => {}) as React.Dispatch<ActionType>)

export const Provider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <DispatchCtx.Provider value={dispatch}>
      <StateCtx.Provider value={state}>{children}</StateCtx.Provider>
    </DispatchCtx.Provider>
  )
}

export const useStore = () => {
  const state = useContext(StateCtx)
  const dispatch = useContext(DispatchCtx)
  return { state, dispatch }
}
```

```js
// store/reducer.ts
import { Types, ActionType } from './types'
import { Plans, PlanWithDetail, TaskWithDetail } from '../List/model'
import { getPlans, getTasks } from '../List/model'

export const initialState: State = {
  groupId: ''
}

interface State {
  groupId: string;
}

export const reducer = (state: State, { type, payload }: ActionType): State => {
  switch (type) {
    case Types.SetGroupId:
      return { ...state, groupId: payload.groupId }
    default:
      return state
  }
}
```

```js
// store/types.ts
export enum Types {
  SetGroupId,
}

export type ActionType = {
  type: Types
  payload: any
}
```

**使用**

```js
// index.tsx
import React from 'react'
import { Provider } from './store'
import StudyPlan from './StudyPlan'

const Container = () => {
  return (
    <Provider>
      <StudyPlan />
    </Provider>
  )
}
export default Container
```

```js
const StudyPlan: FC<RouteComponentProps<PathParamsType>> = props => {
  const { state, dispatch } = useStore()
  return (
    <div
      onClick={() => {
        dispatch({
          type: Types.SetGroupId,
          payload: { groupId: 1 }
        })
      }}
    >
      {state.groupId}
    </div>
  )
}
```


## 例子 二

```tsx
// store.tsx
import React, { useReducer, createContext, FC } from 'react'

export default function createStore<S, T>(initialState: S, reducer: (state: S, action: T) => S) {
  const StateCtx = createContext(initialState)
  const DispatchCtx = createContext((() => {}) as React.Dispatch<T>)

  const Provider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
      <DispatchCtx.Provider value={dispatch}>
        <StateCtx.Provider value={state}>{children}</StateCtx.Provider>
      </DispatchCtx.Provider>
    )
  }
  return { StateCtx, DispatchCtx, Provider }
}
```

```ts
// store.ts
import createStore from 'src/components/store'
import { useContext } from 'react'
import apis, { Status, Staff } from 'src/apis'

interface State {
  list: Staff[]
}
export const initialState: State = {
  list: [],
}

type Action = {
  type: 'list' | 'fetchList'
  payload: React.Dispatch<Action> | Staff[]
}

export const reducer: (s: State, a: Action) => State = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'list':
      return { list: <Staff[]>payload }
    case 'fetchList':
      apis.staff.list().then(res => {
        const dispatch = payload as React.Dispatch<Action>
        dispatch({ type: 'list', payload: res })
      })
    default:
      return state
  }
}

const { StateCtx, DispatchCtx, Provider } = createStore<State, Action>(initialState, reducer)

const useStore = () => {
  const state = useContext(StateCtx)
  const dispatch = useContext(DispatchCtx)
  return { state, dispatch }
}

export { Provider }
export default useStore
```

```tsx
const StaffMgrList: NavigationScreenComponent = props => {
  const {
    state: { list },
    dispatch,
  } = useStore()

  useEffect(() => {
    async function getStaffList() {
      const list = await apis.staff.list()
      dispatch({ type: 'list', payload: list })
    }
    getStaffList()
  }, [])

  return (
    <View></View>
  )
}


export default props => {
  return (
    <Provider>
      <StaffMgrList {...props} />
    </Provider>
  )
}
```
