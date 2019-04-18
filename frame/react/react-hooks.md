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
