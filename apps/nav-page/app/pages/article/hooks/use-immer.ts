import { produce, type Producer } from 'immer'
import { shallowRef, type ShallowRef } from 'vue'


export function useImmer<T> (baseState:T):[ShallowRef<T>, (updater: Producer<T>) => void] {
  const state = shallowRef(baseState)
  const update = (updater:Producer<T>) => {
    state.value = produce(state.value, updater)
  }

  return [state, update]
}
